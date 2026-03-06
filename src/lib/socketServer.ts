// Socket.io server setup for Next.js API (basic example)
import { Server as IOServer } from 'socket.io';
import { NextApiResponse } from 'next';

let io: IOServer | null = null;

export default function handler(req: any, res: NextApiResponse) {
  const resSocket = res.socket as any;
  if (!resSocket.server.io) {
    io = new IOServer(resSocket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });
    resSocket.server.io = io;

    io.on('connection', (socket) => {
      // Clipboard sync
      socket.on('join_clipboard', ({ userId }) => {
        socket.join(`clipboard:${userId}`);
      });
      socket.on('clipboard_update', ({ userId, text }) => {
        socket.to(`clipboard:${userId}`).emit('clipboard_update', { text });
      });
      // Notes sync
      socket.on('join_notes', ({ userId }) => {
        socket.join(`notes:${userId}`);
      });
      socket.on('notes_update', ({ userId, notes }) => {
        socket.to(`notes:${userId}`).emit('notes_update', { notes });
      });
    });
  }
  res.end();
}
