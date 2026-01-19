import { formatDate, formatCurrency, formatOrderDate } from '../formatters';

/**
 * Допоміжна функція для заміни нерозривних пробілів (\u00a0)
 * на звичайні пробіли, щоб тести стабільно проходили в різних середовищах.
 */
const normalizeSpaces = (str: string) => str.replace(/\u00a0/g, ' ');

describe('formatters utils', () => {

  describe('formatDate', () => {
    it('має перетворювати YYYY-MM-DD у DD / MM / YYYY', () => {
      expect(formatDate('2026-01-16')).toBe('16 / 01 / 2026');
    });

    it('має ігнорувати частину з часом, якщо вона є', () => {
      expect(formatDate('2026-01-16 10:57:39')).toBe('16 / 01 / 2026');
    });

    it('має повертати порожній рядок, якщо дата не передана', () => {
      // @ts-ignore
      expect(formatDate(null)).toBe('');
      expect(formatDate('')).toBe('');
    });
  });

  describe('formatCurrency', () => {
    it('має форматувати число з пробілами як роздільниками (ru-RU)', () => {
      const result = formatCurrency(1000000);
      expect(normalizeSpaces(result)).toBe('1 000 000');
    });

    it('має коректно працювати з малими числами', () => {
      const result = formatCurrency(500);
      expect(normalizeSpaces(result)).toBe('500');
    });

    it('має прибирати коми або крапки, замінюючи їх на пробіли', () => {
      const result = formatCurrency(1234.56);
      expect(normalizeSpaces(result)).not.toContain(',');
    });
  });

  describe('formatOrderDate', () => {
    it('має повертати об’єкт із правильними форматами для верхнього та нижнього рядків', () => {
      const dateStr = '2026-01-16T10:00:00Z';
      const result = formatOrderDate(dateStr);

      // Очищуємо пробіли в обох результатах
      const cleanTopRow = normalizeSpaces(result.topRow);
      const cleanBottomRow = normalizeSpaces(result.bottomRow);

      // Перевірка topRow: має бути DD / MM
      expect(cleanTopRow).toBe('16 / 01');

      // Перевірка bottomRow: має бути DD / Місяць_з_великої / YYYY
      // В ru-RU локалі січень -> янв/января (залежить від версії Node.js)
      expect(cleanBottomRow).toMatch(/16 \/ Янв.* \/ 2026/);
    });

    it('має коректно капіталізувати назву місяця', () => {
      const result = formatOrderDate('2026-05-20');
      const cleanBottomRow = normalizeSpaces(result.bottomRow);
      
      // травень (май) -> Май
      expect(cleanBottomRow).toContain('Май');
    });
  });
});