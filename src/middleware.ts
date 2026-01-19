import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Список підтримуваних мов
  locales: ['ru', 'en'],
  // Мова за замовчуванням
  defaultLocale: 'ru',
  // Автоматичне визначення мови браузера (увімкнено за замовчуванням)
  localeDetection: true
});

export const config = {
  matcher: ['/', '/(ru|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
