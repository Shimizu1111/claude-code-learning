"use client";

import { useState, useEffect } from "react";

export default function FilePreview({
  filePath,
  lessonId,
  onClose,
}: {
  filePath: string;
  lessonId: string;
  onClose: () => void;
}) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/file?lessonId=${encodeURIComponent(lessonId)}&path=${encodeURIComponent(filePath)}`
    )
      .then((res) => res.json())
      .then((data) => {
        setContent(data.content || "");
        setLoading(false);
      })
      .catch(() => {
        setContent("ファイルを読み込めませんでした");
        setLoading(false);
      });
  }, [filePath, lessonId]);

  return (
    <div className="border border-border-main rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-bg-primary border-b border-border-main">
        <span className="text-xs font-mono text-text-secondary truncate">
          {filePath}
        </span>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary ml-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-3 max-h-[300px] overflow-auto">
        {loading ? (
          <div className="text-text-secondary text-sm">読み込み中...</div>
        ) : (
          <pre className="text-xs font-mono whitespace-pre-wrap break-all leading-relaxed">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}
