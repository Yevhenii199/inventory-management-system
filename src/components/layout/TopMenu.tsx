'use client';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Logo } from '../ ui/Logo';
import { ClockIcon } from '../ ui/ClockIcon';
import { OnlineBadge } from '../ ui/OnlineBadge';
import { useClock } from '../../hooks/useClock';
import { useSessionSocket } from '../../hooks/useSessionSocket';
import { formatDateText, formatTimeText } from '../../utils/dateFormatter';

export default function TopMenu() {
  const t = useTranslations('TopMenu');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const currentTime = useClock();
  const activeSessions = useSessionSocket();

  const handleLanguageChange = () => {
    const nextLocale = locale === 'ru' ? 'en' : 'ru';
    router.replace(pathname, { locale: nextLocale });
  };

  // Безпечне форматування: якщо час ще не визначено (на сервері), 
  // повертаємо пустий рядок або заглушку "--"
  const dateDisplay = currentTime ? formatDateText(currentTime, locale) : '';
  const timeDisplay = currentTime ? formatTimeText(currentTime) : '';

  return (
    <header className="navbar bg-white shadow-sm px-4 py-2 w-100 position-relative border-bottom" style={{ minHeight: '75px' }}>
      <div className="container-fluid d-flex align-items-center px-lg-5">
        
        <div className="flex-grow-1" style={{ maxWidth: '12%' }}></div>

        {/* Logo Section */}
        <div className="d-flex align-items-center gap-3">
          <Logo />
          <span className="fw-bold text-uppercase" style={{ color: '#82B941', letterSpacing: '0.2em', fontSize: '18px' }}>
            {t('logoTitle')}
          </span>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-4 ms-auto pb-1">
          
          {/* Language Switcher */}
          <button 
            onClick={handleLanguageChange}
            className="btn btn-sm btn-outline-success rounded-pill fw-bold text-uppercase px-3"
            style={{ fontSize: '12px' }}
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </button>

          <div className="d-flex flex-column text-end" style={{ lineHeight: '1.1' }}>
            <span className="text-muted text-uppercase fw-semibold" style={{ fontSize: '12px' }}>
              {t('today')}
            </span>
   
            <span className="fw-bold" style={{ fontSize: '15px' }}>
              {dateDisplay}
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <ClockIcon />
            <span className="fw-bold" style={{ fontSize: '16px' }}>
              {timeDisplay}
            </span>
          </div>

          <OnlineBadge count={activeSessions} />
        </div>
      </div>
    </header>
  );
}