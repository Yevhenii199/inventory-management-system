// hooks/useSessionSocket.ts
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const useSessionSocket = () => {
  const [activeSessions, setActiveSessions] = useState<number>(0);

  useEffect(() => {
    // Створюємо екземпляр сокета
    const socket: Socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
    });

    // Слухаємо оновлення лічильника від сервера
    socket.on('sessionCount', (count: number) => {
      console.log('Active sessions updated:', count);
      setActiveSessions(count);
    });

    // Додаткова перевірка: якщо сервер не прислав дані при підключенні,
    // можна додати запит на отримання початкового стану (опціонально)
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    // Очищення при розмонтуванні компонента
    return () => {
      socket.off('sessionCount');
      socket.disconnect();
    };
  }, []);

  return activeSessions;
};