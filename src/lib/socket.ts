// Socket.io client setup (placeholder)
import { io, Socket } from 'socket.io-client';

const URL = typeof window !== 'undefined' ? '/api/socketio' : '';
export const socket: Socket = io(URL, { autoConnect: false, path: '/api/socketio' });
