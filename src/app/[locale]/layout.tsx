import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; 
import Header from '@/components/layout/TopMenu';
import NavigationMenu from '@/components/layout/NavigationMenu';
import PageTransition from '@/components/layout/PageTransition';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className="vh-100 d-flex flex-column overflow-hidden"
        style={{ backgroundColor: '#f0f3f5', color: '#2c3e50' }}
      >
        <NextIntlClientProvider messages={messages}>
          <header className="w-100">
            <Header />
          </header>

          <div className="d-flex flex-grow-1 overflow-hidden">
            <aside className="h-100 flex-shrink-0">
              <NavigationMenu />
            </aside>

            <main className="flex-grow-1 overflow-auto p-5 position-relative">
              {/* Анимация контента при переходе */}
              <PageTransition>
                {children}
              </PageTransition>
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}