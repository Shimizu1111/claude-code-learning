"use client";

import { Course } from "@/lib/lessons";

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
  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-6">
      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-1">Claude Code Learning</h1>
      <p className="text-text-secondary text-sm mb-8">
        あなたに合ったコースを選んで、手を動かしながら学びましょう
      </p>

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
