"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface FileChangeEvent {
  type: "file-change";
  event: string;
  path: string;
  timestamp: string;
}

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<FileChangeEvent[]>([]);
  const listenersRef = useRef<Set<(event: FileChangeEvent) => void>>(new Set());

  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout>;
    let disposed = false;

    function connect() {
      if (disposed) return;

      // Connect to WS on port 3001 (separate from Next.js HMR)
      const wsPort = parseInt(window.location.port || "3000", 10) + 1;
      const ws = new WebSocket(`ws://${window.location.hostname}:${wsPort}`);
      wsRef.current = ws;

      ws.onopen = () => setIsConnected(true);

      ws.onclose = () => {
        setIsConnected(false);
        if (!disposed) {
          reconnectTimer = setTimeout(connect, 2000);
        }
      };

      ws.onerror = () => {
        ws.close();
      };

      ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data) as FileChangeEvent;
        setEvents((prev) => [data, ...prev].slice(0, 50));
        for (const listener of listenersRef.current) {
          listener(data);
        }
      };
    }

    connect();

    return () => {
      disposed = true;
      clearTimeout(reconnectTimer);
      wsRef.current?.close();
    };
  }, []);

  const addListener = useCallback(
    (listener: (event: FileChangeEvent) => void) => {
      listenersRef.current.add(listener);
      return () => listenersRef.current.delete(listener);
    },
    []
  );

  return { isConnected, events, addListener };
}
