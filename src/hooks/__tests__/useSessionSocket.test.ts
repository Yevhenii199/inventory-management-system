import { renderHook, act } from '@testing-library/react';
import { io } from 'socket.io-client';
import { useSessionSocket } from '../useSessionSocket';

// 1. Мокаємо бібліотеку socket.io-client
jest.mock('socket.io-client');

describe('useSessionSocket', () => {
  let mockSocket: any;

  beforeEach(() => {
    // Очищуємо всі моки перед кожним тестом
    jest.clearAllMocks();

    // Створюємо структуру мока сокета
    mockSocket = {
      on: jest.fn(),
      disconnect: jest.fn(),
    };

    // Примушуємо io() повертати наш mockSocket
    (io as jest.Mock).mockReturnValue(mockSocket);
  });

  it('повинен ініціалізувати сокет із правильним URL', () => {
    renderHook(() => useSessionSocket());

    // Перевіряємо, чи викликався io з нашим URL (локалхост за замовчуванням)
    expect(io).toHaveBeenCalledWith('http://localhost:3001', expect.any(Object));
  });

  it('початкове значення activeSessions має бути 0', () => {
    const { result } = renderHook(() => useSessionSocket());
    expect(result.current).toBe(0);
  });

  it('має оновлювати стан при отриманні події sessionCount', () => {
    // 1. Знаходимо функцію-обробник, яку хук передав у socket.on
    let emitEvent: any;
    mockSocket.on.mockImplementation((event: string, callback: any) => {
      if (event === 'sessionCount') {
        emitEvent = callback;
      }
    });

    const { result } = renderHook(() => useSessionSocket());

    // 2. Викликаємо цей обробник (імітуємо сигнал від сервера)
    act(() => {
      emitEvent(10);
    });

    // 3. Перевіряємо результат
    expect(result.current).toBe(10);
  });

  it('має викликати disconnect при розмонтуванні хука', () => {
    const { unmount } = renderHook(() => useSessionSocket());
    
    unmount();

    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
});