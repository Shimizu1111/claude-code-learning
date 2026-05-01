"use client";

import { useState, useEffect, useCallback } from "react";
import { courses, Lesson } from "@/lib/lessons";
import { useWebSocket } from "@/hooks/useWebSocket";
import CourseSelect from "@/components/CourseSelect";
import LessonCard from "@/components/LessonCard";
import StepPanel from "@/components/StepPanel";
import FileTree from "@/components/FileTree";
import ActivityLog from "@/components/ActivityLog";
import FilePreview from "@/components/FilePreview";

interface FileTreeNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileTreeNode[];
  size?: number;
  modified?: string;
}

export default function Home() {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<
    Record<string, Set<string>>
  >({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [fileTree, setFileTree] = useState<FileTreeNode[]>([]);
  const [newFiles, setNewFiles] = useState<Set<string>>(new Set());
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [verifyFailed, setVerifyFailed] = useState(false);
  const [resetting, setResetting] = useState(false);
  const { isConnected, events, addListener } = useWebSocket();

  const activeCourse = courses.find((c) => c.id === activeCourseId);
  const activeLesson = activeCourse?.lessons.find(
    (l) => l.id === activeLessonId
  );

  const fetchFileTree = useCallback(async () => {
    if (!activeLesson) return;
    try {
      const res = await fetch(
        `/api/filetree?lessonId=${encodeURIComponent(activeLesson.id)}`
      );
      const data = await res.json();
      setFileTree(data.tree || []);
    } catch {
      // ignore
    }
  }, [activeLesson]);

  // Refresh file tree on file changes
  useEffect(() => {
    if (!activeLesson) return;
    const remove = addListener(() => {
      fetchFileTree();
    });
    return remove;
  }, [activeLesson, addListener, fetchFileTree]);

  // Start lesson: copy template -> workspace
  useEffect(() => {
    if (!activeLesson) return;
    fetch("/api/lesson/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: activeLesson.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFileTree(data.tree || []);
      });
  }, [activeLessonId, activeLesson]);

  // Track new files for animation
  useEffect(() => {
    if (!activeLesson) return;
    const remove = addListener((event) => {
      if (event.event === "add" || event.event === "addDir") {
        if (event.path.startsWith(activeLesson.id + "/")) {
          const relativePath = event.path.slice(activeLesson.id.length + 1);
          setNewFiles((prev) => new Set(prev).add(relativePath));
          setTimeout(() => {
            setNewFiles((prev) => {
              const next = new Set(prev);
              next.delete(relativePath);
              return next;
            });
          }, 2000);
        }
      }
    });
    return remove;
  }, [activeLesson, addListener]);

  const handleSelectCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setActiveLessonId(null);
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentStepIndex(0);
    setPreviewFile(null);
    setFileTree([]);
    setVerifyFailed(false);
  };

  const handleBack = () => {
    if (activeLessonId) {
      setActiveLessonId(null);
      setPreviewFile(null);
      setFileTree([]);
    } else {
      setActiveCourseId(null);
    }
  };

  const handleReset = async () => {
    if (!activeLesson) return;
    setResetting(true);
    try {
      const res = await fetch("/api/lesson/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: activeLesson.id }),
      });
      const data = await res.json();
      setFileTree(data.tree || []);
      setCompletedSteps((prev) => {
        const next = { ...prev };
        delete next[activeLesson.id];
        return next;
      });
      setCurrentStepIndex(0);
      setPreviewFile(null);
      setVerifyFailed(false);
    } finally {
      setResetting(false);
    }
  };

  const handleVerify = async () => {
    if (!activeLesson) return;
    const step = activeLesson.steps[currentStepIndex];

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lessonId: activeLesson.id,
        verification: step.verification,
      }),
    });
    const data = await res.json();

    if (data.passed) {
      setVerifyFailed(false);
      setCompletedSteps((prev) => {
        const lessonSteps = new Set(prev[activeLesson.id] || []);
        lessonSteps.add(step.id);
        return { ...prev, [activeLesson.id]: lessonSteps };
      });
      if (currentStepIndex < activeLesson.steps.length - 1) {
        setTimeout(() => setCurrentStepIndex(currentStepIndex + 1), 500);
      }
      fetchFileTree();
    } else {
      setVerifyFailed(true);
    }
  };

  const getCompletedCount = (lessonId: string) => {
    return completedSteps[lessonId]?.size || 0;
  };

  const isStepCompleted = (lessonId: string, stepId: string) => {
    return completedSteps[lessonId]?.has(stepId) || false;
  };

  // Compute course-level completion counts
  const courseCompletedCounts: Record<
    string,
    { done: number; total: number }
  > = {};
  for (const course of courses) {
    let done = 0;
    let total = 0;
    for (const lesson of course.lessons) {
      total += lesson.steps.length;
      done += completedSteps[lesson.id]?.size || 0;
    }
    courseCompletedCounts[course.id] = { done, total };
  }

  const totalSteps = Object.values(courseCompletedCounts).reduce(
    (acc, c) => acc + c.total,
    0
  );
  const totalCompleted = Object.values(courseCompletedCounts).reduce(
    (acc, c) => acc + c.done,
    0
  );

  const isLessonCompleted =
    activeLesson &&
    getCompletedCount(activeLesson.id) === activeLesson.steps.length;

  // ========== Course selection screen ==========
  if (!activeCourseId) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <CourseSelect
          courses={courses}
          onSelect={handleSelectCourse}
          completedCounts={courseCompletedCounts}
        />
      </div>
    );
  }

  // ========== Lesson dashboard ==========
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-border-main bg-bg-secondary px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="w-8 h-8 rounded-lg bg-bg-primary flex items-center justify-center hover:bg-white/5 transition-colors"
              title={activeLessonId ? "レッスン一覧に戻る" : "コース選択に戻る"}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold">
                {activeCourse?.title}
                {activeLesson && (
                  <span className="text-text-secondary font-normal">
                    {" "}
                    / {activeLesson.title}
                  </span>
                )}
              </h1>
              <p className="text-xs text-text-secondary">
                {activeCourse?.subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-text-secondary">
              進捗: {totalCompleted}/{totalSteps}
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-success" : "bg-error"
                }`}
              />
              <span className="text-xs text-text-secondary">
                {isConnected ? "接続中" : "切断"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 border-r border-border-main bg-bg-secondary overflow-y-auto p-4 shrink-0">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
            レッスン一覧
          </h2>
          <div className="space-y-2">
            {activeCourse?.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completedSteps={getCompletedCount(lesson.id)}
                isActive={activeLessonId === lesson.id}
                onClick={() => handleSelectLesson(lesson.id)}
              />
            ))}
          </div>
        </aside>

        {/* Center */}
        <main className="flex-1 overflow-y-auto p-6">
          {!activeLesson ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-xl font-bold mb-2">
                レッスンを選んで始めましょう
              </h2>
              <p className="text-text-secondary text-sm max-w-md mb-6">
                左のレッスン一覧から選択すると、テンプレートが自動で用意されます。
                ターミナルでClaude
                Codeを使って実際に手を動かしながら学びます。
                何度でもリセットしてやり直せます。
              </p>
              <div className="grid grid-cols-3 gap-4 text-center max-w-lg">
                <div className="p-3 bg-bg-card border border-border-main rounded-lg">
                  <div className="text-2xl mb-1">1</div>
                  <p className="text-xs text-text-secondary">レッスンを選ぶ</p>
                </div>
                <div className="p-3 bg-bg-card border border-border-main rounded-lg">
                  <div className="text-2xl mb-1">2</div>
                  <p className="text-xs text-text-secondary">
                    ターミナルで実行
                  </p>
                </div>
                <div className="p-3 bg-bg-card border border-border-main rounded-lg">
                  <div className="text-2xl mb-1">3</div>
                  <p className="text-xs text-text-secondary">結果を確認</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl">
              {/* Lesson header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">
                    {activeLesson.title}
                  </h2>
                  <p className="text-sm text-text-secondary">
                    {activeLesson.description}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    約 {activeLesson.estimatedMinutes} 分
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  disabled={resetting}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border border-border-main hover:bg-error/10 hover:border-error/50 hover:text-error transition-colors"
                >
                  {resetting ? "リセット中..." : "最初からやり直す"}
                </button>
              </div>

              {/* Terminal instruction */}
              <div className="mb-6 p-3 bg-bg-card border border-border-main rounded-lg">
                <p className="text-xs text-text-secondary mb-1">
                  まず別のターミナルで以下に移動してください
                </p>
                <code className="text-sm text-accent font-mono">
                  cd workspace/{activeLesson.id}
                </code>
              </div>

              {/* Step navigation */}
              <div className="flex gap-2 mb-6">
                {activeLesson.steps.map((step, i) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setCurrentStepIndex(i);
                      setVerifyFailed(false);
                    }}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                      isStepCompleted(activeLesson.id, step.id)
                        ? "bg-success text-white"
                        : i === currentStepIndex
                          ? "bg-accent text-white"
                          : "bg-bg-card border border-border-main text-text-secondary"
                    }`}
                  >
                    {isStepCompleted(activeLesson.id, step.id) ? (
                      <svg
                        className="w-4 h-4 mx-auto"
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
                    ) : (
                      i + 1
                    )}
                  </button>
                ))}
              </div>

              {/* Current step */}
              <StepPanel
                step={activeLesson.steps[currentStepIndex]}
                stepIndex={currentStepIndex}
                totalSteps={activeLesson.steps.length}
                isCompleted={isStepCompleted(
                  activeLesson.id,
                  activeLesson.steps[currentStepIndex].id
                )}
                onVerify={handleVerify}
                verifyFailed={verifyFailed}
              />

              {/* Lesson complete */}
              {isLessonCompleted && (
                <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded-lg text-center">
                  <p className="text-success font-bold text-lg mb-1">
                    レッスン完了!
                  </p>
                  <p className="text-sm text-text-secondary mb-3">
                    「最初からやり直す」で何度でも復習できます。
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-accent hover:bg-accent-hover text-white transition-colors"
                  >
                    もう一度やる
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Right Panel */}
        {activeLesson && (
          <aside className="w-80 border-l border-border-main bg-bg-secondary overflow-y-auto shrink-0">
            <div className="p-4 border-b border-border-main">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                  ファイルツリー
                </h3>
                <button
                  onClick={fetchFileTree}
                  className="text-xs text-text-secondary hover:text-text-primary"
                  title="更新"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
              <FileTree
                tree={fileTree}
                newFiles={newFiles}
                onFileClick={(p) => setPreviewFile(p)}
              />
            </div>

            {previewFile && (
              <div className="p-4 border-b border-border-main">
                <FilePreview
                  filePath={previewFile}
                  lessonId={activeLesson.id}
                  onClose={() => setPreviewFile(null)}
                />
              </div>
            )}

            <div className="p-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
                アクティビティ
              </h3>
              <ActivityLog events={events} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
