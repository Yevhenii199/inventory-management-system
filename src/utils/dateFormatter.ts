/**
 * Форматирует дату в текстовый вид: "12 MAR, 2017" или "12 МАР, 2017"
 * Убирает точки после месяцев и не добавляет "г."
 */
export const formatDateText = (date: Date, locale: string): string => {
  const IntlLocale = locale === 'ru' ? 'ru-RU' : 'en-GB';
  
  const day = date.toLocaleString(IntlLocale, { day: '2-digit' });
  
  // Получаем месяц, убираем точку (актуально для RU) и в верхний регистр
  const month = date.toLocaleString(IntlLocale, { month: 'short' })
    .replace('.', '')
    .toUpperCase();
    
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

/**
 * Форматирует время: "09:38"
 */
export const formatTimeText = (date: Date): string => {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

/**
 * Полный формат: "12 / MARCH / 2017"
 */
export const formatFullDate = (date: Date, locale: string): string => {
  const IntlLocale = locale === 'ru' ? 'ru-RU' : 'en-GB';
  
  const day = date.getDate();
  const month = date.toLocaleDateString(IntlLocale, { month: 'long' }).toUpperCase();
  const year = date.getFullYear();
  
  return `${day} / ${month} / ${year}`;
};