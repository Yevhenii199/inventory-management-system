'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing'; 
import UserAvatar from '../ ui/UserAvatar';

export default function NavigationMenu() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const navItems = [
    { key: 'order', path: '/orders', enabled: true },
    { key: 'groups', path: '/groups', enabled: false },
    { key: 'products', path: '/products', enabled: true },
    { key: 'users', path: '/users', enabled: false },
    { key: 'settings', path: '/settings', enabled: false },
  ];

  return (
    <aside className="bg-light border-end vh-100 d-flex flex-column align-items-center py-4 shadow-sm" style={{ width: '250px' }}>
      <div className="mb-5">
        <UserAvatar />
      </div>

      <nav className="w-100 mt-2">
        <ul className="nav flex-column text-center">
          {navItems.map((item) => {
            // pathname из routing возвращает путь относительно текущего языка
            const isActive = pathname === item.path;
            
            return (
              <li key={item.key} className="nav-item mb-2">
                <Link 
                  href={item.enabled ? item.path : '#'}
                  className={`nav-link text-uppercase fw-bold px-0 py-2 position-relative ${
                    isActive ? 'text-dark' : 'text-secondary'
                  } ${!item.enabled ? 'disabled opacity-50' : ''}`}
                  style={{ fontSize: '14px', cursor: item.enabled ? 'pointer' : 'not-allowed' }}
                  title={!item.enabled ? t('comingSoon') : ""}
                >
 
                  {t(item.key)}
                  
                  {isActive && (
                    <div className="position-absolute bottom-0 start-50 translate-middle-x" 
                         style={{ height: '3px', width: '80px', backgroundColor: '#7cb342' }} />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}