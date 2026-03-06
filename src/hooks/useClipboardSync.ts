"use client";
// Hook for real-time clipboard sync using Socket.io
import { useEffect } from 'react';
import { socket } from '../lib/socket';
import { useUserStore } from '../store/useUserStore';

export function useClipboardSync(onClipboardUpdate: (text: string) => void) {
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) return;
    socket.connect();
    socket.emit('join_clipboard', { userId: user.id });

    socket.on('clipboard_update', (data: { text: string }) => {
      onClipboardUpdate(data.text);
    });

    return () => {
      socket.off('clipboard_update');
      socket.disconnect();
    };
  }, [user, onClipboardUpdate]);

  const emitClipboardUpdate = (text: string) => {
    if (user) {
      socket.emit('clipboard_update', { userId: user.id, text });
    }
  };

  return { emitClipboardUpdate };
}
