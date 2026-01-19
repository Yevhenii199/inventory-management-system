export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = dateStr.split(' ')[0];
  return date.split('-').reverse().join(' / ');
};

export const formatCurrency = (value: number) => {
  return value.toLocaleString('ru-RU', { minimumFractionDigits: 0 }).replace(/,/g, ' ');
};

export const formatOrderDate = (dateString: string) => {
  const date = new Date(dateString);
  const topRow = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }).replace('.', ' / ');
  
  const day = date.toLocaleDateString('ru-RU', { day: '2-digit' });
  const monthShort = date.toLocaleDateString('ru-RU', { month: 'short' }).replace('.', '');
  const year = date.getFullYear();
  
  const capitalizedMonth = monthShort.charAt(0).toUpperCase() + monthShort.slice(1);
  
  return {
    topRow,
    bottomRow: `${day} / ${capitalizedMonth} / ${year}`
  };
};