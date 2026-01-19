'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
// Імпорт констант та інтерфейсів
import { products as initialProducts, orders as initialOrders, Order } from '@/data/app.data';
import { OrderCard } from '@/components/orders/OrderCard';
import { OrderDetails } from '@/components/orders/OrderDetails';
import styles from '@/components/orders/Orders.module.css';

export default function OrdersPage() {
  const t = useTranslations('Orders');
  
  // Виправляємо Error #418: ініціалізуємо стан константою, яка однакова для SSR та Client
  const [localOrders, setLocalOrders] = useState<Order[]>(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Зчитуємо localStorage тільки після монтажу компонента на клієнті
    const saved = localStorage.getItem('inventory_orders');
    if (saved) {
      try {
        setLocalOrders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse orders from local storage", e);
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Виправляємо розбіжність ключів: використовуємо 'inventory_orders' замість 'orders'
    if (isMounted) {
      localStorage.setItem('inventory_orders', JSON.stringify(localOrders));
    }
  }, [localOrders, isMounted]);

  // Розрахунок статистики на основі масиву цін
  const stats = useMemo(() => {
    return localOrders.reduce((acc, order) => {
      const orderProds = initialProducts.filter(p => p.order === order.id);
      acc[order.id] = {
        count: orderProds.length,
        // Пошук значень у масиві price
        usd: orderProds.reduce((sum, p) => sum + (p.price.find(pr => pr.symbol === 'USD')?.value || 0), 0),
        uah: orderProds.reduce((sum, p) => sum + (p.price.find(pr => pr.symbol === 'UAH')?.value || 0), 0)
      };
      return acc;
    }, {} as Record<number, { count: number, usd: number, uah: number }>);
  }, [localOrders]);

  const confirmDelete = () => {
    if (orderToDelete) {
      setLocalOrders(prev => prev.filter(o => o.id !== orderToDelete.id));
      if (selectedOrderId === orderToDelete.id) setSelectedOrderId(null);
      setOrderToDelete(null);
    }
  };

  // Запобігаємо рендерингу до монтажу, щоб уникнути помилок гідрації
  if (!isMounted) return null;

  return (
    <div className={`container-fluid py-5 min-vh-100 ${styles.ordersPage}`}>
      
      <div className="d-flex align-items-center gap-3 mb-5 px-lg-4">
        {/* Виправлення Accessibility: додаємо aria-label для кнопки без тексту */}
        <button 
          className="btn rounded-circle d-flex align-items-center justify-content-center text-white shadow-sm"
          style={{ width: '40px', height: '40px', backgroundColor: '#8bc342', border: 'none', fontSize: '24px' }}
          aria-label={t('addProduct')} 
        >
          +
        </button>
        <h1 className="h4 fw-bold mb-0 text-dark">
          {t('title', { count: localOrders.length })}
        </h1>
      </div>

      <div className="d-flex gap-4 align-items-start mx-lg-4" style={{ maxWidth: '1400px' }}>
        <div className="d-flex flex-column gap-3 transition-all" style={{ width: selectedOrderId ? '35%' : '100%' }}>
          {localOrders.map((order) => (
            <OrderCard 
              key={order.id}
              order={order}
              productCount={stats[order.id]?.count || 0}
              totalUah={stats[order.id]?.uah || 0}
              totalUsd={stats[order.id]?.usd || 0}
              isSelected={selectedOrderId === order.id}
              isAnySelected={!!selectedOrderId}
              onSelect={setSelectedOrderId}
              onDelete={setOrderToDelete}
            />
          ))}
        </div>

        {selectedOrderId && (
          <OrderDetails 
            order={localOrders.find(o => o.id === selectedOrderId)}
            products={initialProducts.filter(p => p.order === selectedOrderId)}
            onClose={() => setSelectedOrderId(null)}
          />
        )}
      </div>

      {orderToDelete && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContent} shadow-lg`}>
            <div className="p-4">
              <h5 className="fw-bold mb-4">{t('deleteConfirmation')}</h5>
              <div className="d-flex align-items-center gap-3 border-top pt-3">
                <div className="rounded-circle bg-success" style={{ width: '10px', height: '10px' }} />
                <span className="text-decoration-underline fw-medium">{orderToDelete.title}</span>
              </div>
            </div>
            <div className={`${styles.modalFooter} d-flex justify-content-end gap-4 px-4 py-3`}>
              <button className="btn btn-link text-white fw-bold text-decoration-none" onClick={() => setOrderToDelete(null)}>
                {t('cancel')}
              </button>
              <button className="btn bg-white text-danger fw-bold rounded-pill px-4 shadow-sm border-0" onClick={confirmDelete}>
                {t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}