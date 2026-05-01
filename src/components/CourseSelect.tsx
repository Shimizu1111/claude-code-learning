"use client";

import { useState } from "react";
import { Course } from "@/lib/lessons";

function OnboardingGuide({ onClose }: { onClose: () => void }) {
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "Claude Code Learning へようこそ",
      content: (
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <p>
            このプラットフォームは、<strong className="text-text-primary">Claude Code の使い方を実際に手を動かしながら学ぶ</strong>ための学習ツールです。
          </p>
          <p>
            読むだけではなく、<strong className="text-text-primary">自分のターミナルで実際にClaude Codeを操作</strong>して、その結果がこのダッシュボードにリアルタイムで反映されるのを確認しながら進めます。
          </p>
          <div className="bg-bg-primary rounded-lg p-4 border border-border-main">
            <p className="text-xs font-semibold text-accent mb-2">必要なもの</p>
            <ul className="space-y-1 text-sm">
              <li>- Node.js 20.9 以上</li>
              <li>- Claude Code（<code className="text-accent">npm install -g @anthropic-ai/claude-code</code>）</li>
              <li>- ターミナル（コマンドを打つ画面）を2つ開けること</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "学習の進め方",
      content: (
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 text-sm font-bold">1</div>
              <div>
                <p className="font-semibold text-text-primary">コースを選ぶ</p>
                <p>自分のレベルや目的に合ったコースを選びます。初めての方は「初級」から。</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 text-sm font-bold">2</div>
              <div>
                <p className="font-semibold text-text-primary">ターミナルを用意する</p>
                <p>レッスンを選ぶと「作業ディレクトリ」が表示されます。<strong className="text-text-primary">別のターミナル</strong>でそのディレクトリに移動し、<code className="text-accent">claude</code> と入力してClaude Codeを起動します。</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 text-sm font-bold">3</div>
              <div>
                <p className="font-semibold text-text-primary">プロンプトをコピーして実行</p>
                <p>各ステップに表示される<strong className="text-accent">紫色のブロック</strong>（プロンプト）や<strong className="text-yellow-400">黄色のブロック</strong>（スラッシュコマンド）を、コピーボタンでコピーしてClaude Codeに貼り付けます。</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 text-sm font-bold">4</div>
              <div>
                <p className="font-semibold text-text-primary">結果を確認してクリア</p>
                <p>実行結果がダッシュボード右側のファイルツリーにリアルタイムで反映されます。「できたか確認する」ボタンを押すと自動判定されます。</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "画面の見方",
      content: (
        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <p>レッスン中の画面は3つのエリアに分かれています：</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-bg-primary rounded-lg p-3 border border-border-main">
              <p className="font-semibold text-text-primary text-xs mb-1">左：レッスン一覧</p>
              <p className="text-xs">コース内のレッスンが並んでいます。進捗バーで完了状況が分かります。</p>
            </div>
            <div className="bg-bg-primary rounded-lg p-3 border border-accent/30">
              <p className="font-semibold text-text-primary text-xs mb-1">中央：ステップの指示</p>
              <p className="text-xs">今やるべきことの説明、コピーするプロンプト、学びのポイントが表示されます。</p>
            </div>
            <div className="bg-bg-primary rounded-lg p-3 border border-border-main">
              <p className="font-semibold text-text-primary text-xs mb-1">右：ファイルツリー</p>
              <p className="text-xs">作業フォルダの変化がリアルタイムで表示。ファイルをクリックすると中身も見れます。</p>
            </div>
          </div>
          <div className="bg-bg-primary rounded-lg p-3 border border-border-main">
            <p className="font-semibold text-text-primary text-xs mb-2">コピーブロックの種類</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-accent shrink-0"></span>
                <span className="text-xs"><strong>紫ブロック</strong>：Claude Codeに貼り付けるプロンプト（自然言語の指示）</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-yellow-500 shrink-0"></span>
                <span className="text-xs"><strong>黄色ブロック</strong>：Claude Codeに直接入力するスラッシュコマンド（/init, /plan 等）</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "学習のコツ",
      content: (
        <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
          <div className="flex gap-3 items-start">
            <span className="text-lg shrink-0">1.</span>
            <div>
              <p className="font-semibold text-text-primary">まずはコピペでOK</p>
              <p>最初はプロンプトをそのままコピーして実行するだけで大丈夫。仕組みは後から理解できます。</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg shrink-0">2.</span>
            <div>
              <p className="font-semibold text-text-primary">ファイルツリーを必ず確認する</p>
              <p>実行後、右のファイルツリーでどんな変化が起きたか必ず見てください。ファイルをクリックすると中身も確認できます。</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg shrink-0">3.</span>
            <div>
              <p className="font-semibold text-text-primary">「何が起きたか」を読む</p>
              <p>ステップをクリアすると緑色の解説ブロックが表示されます。ここに裏側で何が実行されたかの詳しい説明があります。</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg shrink-0">4.</span>
            <div>
              <p className="font-semibold text-text-primary">何度でもリセットして復習</p>
              <p>「最初からやり直す」ボタンでテンプレートが再コピーされます。納得いくまで何度でも繰り返せます。</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-lg shrink-0">5.</span>
            <div>
              <p className="font-semibold text-text-primary">自分なりにアレンジしてみる</p>
              <p>慣れてきたらプロンプトを自分なりに変えてみましょう。「色を変えて」「機能を追加して」など。正解は一つではありません。</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-2xl w-full mx-auto mb-10">
      <div className="bg-bg-card border border-border-main rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{pages[page].title}</h2>
            <span className="text-xs text-text-secondary">
              {page + 1} / {pages.length}
            </span>
          </div>
          {pages[page].content}
        </div>

        {/* Navigation */}
        <div className="px-6 py-4 border-t border-border-main flex items-center justify-between">
          <div className="flex gap-1.5">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === page ? "bg-accent" : "bg-border-main"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {page > 0 && (
              <button
                onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border-main hover:bg-white/5 transition-colors"
              >
                戻る
              </button>
            )}
            {page < pages.length - 1 ? (
              <button
                onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent hover:bg-accent-hover text-white transition-colors"
              >
                次へ
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-accent hover:bg-accent-hover text-white transition-colors"
              >
                学習を始める
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const iconMap: Record<string, JSX.Element> = {
  seedling: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19V6m0 0c-2-3-6-4-9-3 3-1 7 0 9 3zm0 0c2-3 6-4 9-3-3-1-7 0-9 3z" />
    </svg>
  ),
  rocket: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a6 6 0 01-7.38-5.84h4.8" />
    </svg>
  ),
  fire: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  zap: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const colorMap: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  green: {
    bg: "hover:bg-green-500/5",
    border: "border-green-500/30 hover:border-green-500/60",
    text: "text-green-400",
    iconBg: "bg-green-500/10",
  },
  yellow: {
    bg: "hover:bg-yellow-500/5",
    border: "border-yellow-500/30 hover:border-yellow-500/60",
    text: "text-yellow-400",
    iconBg: "bg-yellow-500/10",
  },
  red: {
    bg: "hover:bg-red-500/5",
    border: "border-red-500/30 hover:border-red-500/60",
    text: "text-red-400",
    iconBg: "bg-red-500/10",
  },
  purple: {
    bg: "hover:bg-purple-500/5",
    border: "border-purple-500/30 hover:border-purple-500/60",
    text: "text-purple-400",
    iconBg: "bg-purple-500/10",
  },
};

export default function CourseSelect({
  courses,
  onSelect,
  completedCounts,
}: {
  courses: Course[];
  onSelect: (courseId: string) => void;
  completedCounts: Record<string, { done: number; total: number }>;
}) {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-6">
      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-1">Claude Code Learning</h1>
      <p className="text-text-secondary text-sm mb-8">
        手を動かしながらClaude Codeの使い方を学びましょう
      </p>

      {/* Onboarding guide */}
      {showGuide ? (
        <OnboardingGuide onClose={() => setShowGuide(false)} />
      ) : (
        <button
          onClick={() => setShowGuide(true)}
          className="mb-6 px-3 py-1.5 rounded-lg text-xs font-medium border border-border-main hover:bg-white/5 transition-colors text-text-secondary"
        >
          使い方ガイドを見る
        </button>
      )}

      {/* Course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
        {courses.map((course) => {
          const colors = colorMap[course.color] || colorMap.green;
          const counts = completedCounts[course.id] || { done: 0, total: 0 };
          const totalLessons = course.lessons.length;
          const totalMinutes = course.lessons.reduce(
            (acc, l) => acc + l.estimatedMinutes,
            0
          );

          return (
            <button
              key={course.id}
              onClick={() => onSelect(course.id)}
              className={`text-left p-6 rounded-xl border transition-all ${colors.border} ${colors.bg} bg-bg-card`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0 ${colors.text}`}>
                  {iconMap[course.icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold">{course.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.iconBg} ${colors.text}`}>
                      {course.subtitle}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span>{totalLessons} レッスン</span>
                    <span>約 {totalMinutes} 分</span>
                    {counts.total > 0 && (
                      <span className={colors.text}>
                        {counts.done}/{counts.total} ステップ完了
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
