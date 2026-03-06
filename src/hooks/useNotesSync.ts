// Hook for real-time notes sync using Socket.io
import { useEffect } from 'react';
import { socket } from '../lib/socket';
import { useUserStore } from '../store/useUserStore';

export function useNotesSync(onNotesUpdate: (notes: any[]) => void) {
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) return;
    socket.connect();
    socket.emit('join_notes', { userId: user.id });
    socket.on('notes_update', (data: { notes: any[] }) => {
      onNotesUpdate(data.notes);
    });
    return () => {
      socket.off('notes_update');
      socket.disconnect();
    };
  }, [user, onNotesUpdate]);
}
