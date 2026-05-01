"use client";

import { useState } from "react";
import { LessonStep } from "@/lib/lessons";

function CopyBlock({
  label,
  value,
  type,
}: {
  label: string;
  value: string;
  type: "prompt" | "command";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-lg overflow-hidden border ${
        type === "command"
          ? "border-yellow-500/30 bg-yellow-500/5"
          : "border-accent/30 bg-accent/5"
      }`}
    >
      <div
        className={`flex items-center justify-between px-3 py-1.5 text-xs font-semibold ${
          type === "command"
            ? "text-yellow-400 bg-yellow-500/10"
            : "text-accent bg-accent/10"
        }`}
      >
        <span>{label}</span>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
            copied
              ? "text-success"
              : "hover:bg-white/10"
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              コピー済み
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              コピー
            </>
          )}
        </button>
      </div>
      <div className="px-4 py-3">
        <pre className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">
          {value}
        </pre>
      </div>
    </div>
  );
}

export default function StepPanel({
  step,
  stepIndex,
  totalSteps,
  isCompleted,
  onVerify,
  verifyFailed,
}: {
  step: LessonStep;
  stepIndex: number;
  totalSteps: number;
  isCompleted: boolean;
  onVerify: () => void;
  verifyFailed: boolean;
}) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="space-y-4">
      {/* Step header */}
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
            isCompleted
              ? "bg-success text-white"
              : "bg-accent text-white pulse-glow"
          }`}
        >
          {isCompleted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            stepIndex + 1
          )}
        </div>
        <div>
          <h3 className="font-semibold">{step.title}</h3>
          <p className="text-xs text-text-secondary">
            ステップ {stepIndex + 1} / {totalSteps}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="text-sm leading-relaxed whitespace-pre-wrap text-text-secondary">
        {step.description}
      </div>

      {/* Copyable prompt or command */}
      {step.command && (
        <CopyBlock
          label="Claude Codeで入力"
          value={step.command}
          type="command"
        />
      )}
      {step.prompt && (
        <CopyBlock
          label="Claude Codeに貼り付け"
          value={step.prompt}
          type="prompt"
        />
      )}

      {/* After note - shown after completion */}
      {isCompleted && step.afterNote && (
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <p className="text-xs font-semibold text-success mb-2 uppercase tracking-wider">
            何が起きたか
          </p>
          <div className="text-sm leading-relaxed whitespace-pre-wrap text-text-secondary">
            {step.afterNote}
          </div>
        </div>
      )}

      {/* Why this matters */}
      <div className="bg-bg-card border border-border-main rounded-lg p-4">
        <p className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wider">
          学びのポイント
        </p>
        <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
          {step.why}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 items-center">
        <button
          onClick={onVerify}
          disabled={isCompleted}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isCompleted
              ? "bg-success/20 text-success cursor-default"
              : "bg-accent hover:bg-accent-hover text-white"
          }`}
        >
          {isCompleted ? "クリア!" : "できたか確認する"}
        </button>

        {!isCompleted && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-border-main hover:bg-white/5 transition-colors"
          >
            {showHint ? "ヒントを隠す" : "ヒントを見る"}
          </button>
        )}

        {verifyFailed && !isCompleted && (
          <span className="text-sm text-error">
            まだ完了していません。もう一度やってみましょう!
          </span>
        )}
      </div>

      {/* Hint */}
      {showHint && !isCompleted && (
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 text-sm">
          <p className="text-warning font-medium mb-1">ヒント:</p>
          <code className="text-text-primary">{step.hint}</code>
        </div>
      )}
    </div>
  );
}
