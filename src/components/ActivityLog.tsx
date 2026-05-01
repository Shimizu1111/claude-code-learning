"use client";

interface FileChangeEvent {
  type: string;
  event: string;
  path: string;
  timestamp: string;
}

const eventLabels: Record<string, { label: string; color: string }> = {
  add: { label: "作成", color: "text-green-400" },
  addDir: { label: "フォルダ作成", color: "text-green-400" },
  change: { label: "変更", color: "text-yellow-400" },
  unlink: { label: "削除", color: "text-red-400" },
  unlinkDir: { label: "フォルダ削除", color: "text-red-400" },
};

export default function ActivityLog({ events }: { events: FileChangeEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="text-text-secondary text-sm text-center py-4">
        ファイルの変更を待機中...
      </div>
    );
  }

  return (
    <div className="space-y-1 max-h-[200px] overflow-y-auto">
      {events.map((event, i) => {
        const config = eventLabels[event.event] || {
          label: event.event,
          color: "text-gray-400",
        };
        const time = new Date(event.timestamp).toLocaleTimeString("ja-JP");

        return (
          <div
            key={`${event.timestamp}-${i}`}
            className={`flex items-center gap-2 text-xs py-1 px-2 rounded hover:bg-white/5 ${
              i === 0 ? "file-new" : ""
            }`}
          >
            <span className="text-text-secondary w-16 shrink-0">{time}</span>
            <span className={`w-20 shrink-0 ${config.color}`}>
              {config.label}
            </span>
            <span className="font-mono truncate">{event.path}</span>
          </div>
        );
      })}
    </div>
  );
}
