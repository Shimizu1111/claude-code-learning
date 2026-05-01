"use client";

import { Lesson } from "@/lib/lessons";

export default function LessonCard({
  lesson,
  completedSteps,
  isActive,
  onClick,
}: {
  lesson: Lesson;
  completedSteps: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const progress = Math.round((completedSteps / lesson.steps.length) * 100);
  const isCompleted = completedSteps === lesson.steps.length;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        isActive
          ? "border-accent bg-accent/10"
          : "border-border-main bg-bg-card hover:border-accent/50"
      } ${isCompleted ? "opacity-80" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-text-secondary">
              {lesson.category}
            </span>
            <span className="text-xs text-text-secondary">
              ~{lesson.estimatedMinutes}分
            </span>
          </div>
          <h3 className="font-semibold text-sm mb-1 truncate">
            {lesson.title}
          </h3>
          <p className="text-xs text-text-secondary line-clamp-2">
            {lesson.description}
          </p>
          {lesson.prerequisite && (
            <p className="text-xs text-text-secondary mt-1 opacity-60">
              前提: {lesson.prerequisite}
            </p>
          )}
        </div>
        <div className="shrink-0">
          {isCompleted ? (
            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center check-animate">
              <svg
                className="w-5 h-5 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center">
              <span className="text-xs text-text-secondary">
                {completedSteps}/{lesson.steps.length}
              </span>
            </div>
          )}
        </div>
      </div>
      {!isCompleted && (
        <div className="mt-3">
          <div className="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </button>
  );
}
