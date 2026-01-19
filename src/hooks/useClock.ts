import { useState, useEffect } from 'react';

export const useClock = () => {
  // Початковий стан null для безпечної гідрації в Next.js
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Встановлюємо час відразу при монтуванні в браузері
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
};