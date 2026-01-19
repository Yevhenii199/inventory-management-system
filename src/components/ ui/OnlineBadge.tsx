'use client';
import { useTranslations } from 'next-intl';

interface OnlineBadgeProps {
  count: number;
}

export const OnlineBadge = ({ count }: OnlineBadgeProps) => {
  const t = useTranslations('Common');

  return (
    <div
      className="d-flex align-items-center gap-3 px-3 py-1 border rounded-pill ms-2"
      style={{ backgroundColor: '#F8F9FA', borderColor: '#CFD8DC', marginBottom: '-2px' }}
    >
      <div className="position-relative d-flex" style={{ height: '10px', width: '10px' }}>
        <span className="status-ping"></span>
        <span className="position-relative rounded-circle bg-success" style={{ height: '10px', width: '10px' }}></span>
      </div>
      <div className="d-flex flex-column" style={{ lineHeight: '1' }}>
        <span className="text-uppercase fw-bold" style={{ fontSize: '9px', color: '#78909C' }}>
          {/* Используем перевод вместо статического текста */}
          {t('online')}
        </span>
        <span className="fw-bolder" style={{ fontSize: '14px', color: '#263238' }}>{count}</span>
      </div>

      <style jsx>{`
        .status-ping {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #82B941;
          opacity: 0.75;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};