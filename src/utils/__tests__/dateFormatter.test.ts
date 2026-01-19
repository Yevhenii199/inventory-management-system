import { formatDateText, formatTimeText } from '../dateFormatter';

describe('dateFormatter utils', () => {
  
  describe('formatDateText', () => {
    it('має форматувати дату у формат "DD MMM, YYYY" з великими літерами', () => {
      const date = new Date('2026-01-16T10:00:00');
      // Очікуємо: "16 JAN, 2026"
      expect(formatDateText(date)).toBe('16 JAN, 2026');
    });

    it('має додавати нуль попереду для одноцифрових днів', () => {
      const date = new Date('2026-05-05T10:00:00');
      // Очікуємо: "05 MAY, 2026"
      expect(formatDateText(date)).toBe('05 MAY, 2026');
    });

    it('має коректно обробляти грудень', () => {
      const date = new Date('2025-12-31T23:59:59');
      expect(formatDateText(date)).toBe('31 DEC, 2025');
    });
  });

  describe('formatTimeText', () => {
    it('має форматувати час у 24-годинному форматі (HH:mm)', () => {
      const date = new Date('2026-01-16T14:05:00');
      expect(formatTimeText(date)).toBe('14:05');
    });

    it('має додавати нуль для годин менше 10', () => {
      const date = new Date('2026-01-16T08:30:00');
      expect(formatTimeText(date)).toBe('08:30');
    });

    it('має працювати для опівночі', () => {
      const date = new Date('2026-01-16T00:00:00');
      expect(formatTimeText(date)).toBe('00:00');
    });

    it('має працювати для кінця дня', () => {
      const date = new Date('2026-01-16T23:59:00');
      expect(formatTimeText(date)).toBe('23:59');
    });
  });
});