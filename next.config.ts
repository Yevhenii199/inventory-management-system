import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Инициализируем плагин. 
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // 1. Включаем статический экспорт для GitHub Pages
output: 'standalone',

  // 2. Указываем путь к вашему репозиторию (обязательно с косой чертой в начале)
  // basePath: '/inventory-management-system',

  reactCompiler: true,

  images: {
    // 3. Отключаем оптимизацию изображений (не поддерживается на GH Pages)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);