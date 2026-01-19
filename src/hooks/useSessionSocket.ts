//hooks/useSessionSocket.ts
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const useSessionSocket = () => {
  const [activeSessions, setActiveSessions] = useState<number>(0);

  useEffect(() => {
    const socket: Socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
    });

    socket.on('sessionCount', (count: number) => {
      setActiveSessions(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return activeSessions;
};