import { renderHook, act } from '@testing-library/react';
import { useClock } from '../useClock';

describe('useClock', () => {
  beforeEach(() => {
    // Вмикаємо фейкові таймери перед кожним тестом
    jest.useFakeTimers();
    // Встановлюємо фіксовану системну дату для передбачуваності тесту
    jest.setSystemTime(new Date('2026-01-16T10:00:00Z'));
  });

  afterEach(() => {
    // Повертаємо реальні таймери після тесту
    jest.useRealTimers();
  });

  it('повинен ініціалізуватися з поточним часом', () => {
    const { result } = renderHook(() => useClock());
    
    expect(result.current).toBeInstanceOf(Date);
    expect(result.current.toISOString()).toBe('2026-01-16T10:00:00.000Z');
  });

  it('повинен оновлювати час кожну секунду', () => {
    const { result } = renderHook(() => useClock());

    // Перемотуємо час на 1 секунду вперед
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Перевіряємо, що час оновився (+1 секунда)
    expect(result.current.toISOString()).toBe('2026-01-16T10:00:01.000Z');

    // Перемотуємо ще на 2 секунди
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.toISOString()).toBe('2026-01-16T10:00:03.000Z');
  });

  it('повинен очищувати інтервал при розмонтуванні (unmount)', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { unmount } = renderHook(() => useClock());

    unmount();

    // Перевіряємо, чи був викликаний clearInterval
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});