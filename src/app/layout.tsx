// Этот файл нужен только для того, чтобы Next.js не ругался при сборке.
// Основная логика теперь живет в [locale]/layout.tsx
export default function RootLayout({children}: {children: React.ReactNode}) {
  return children;
}