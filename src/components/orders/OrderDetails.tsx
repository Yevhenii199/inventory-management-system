'use client';

import React from 'react';
import { Order, Product } from '@/types/inventory';
import styles from './Orders.module.css';

interface OrderDetailsProps {
  order?: Order;
  products: Product[];
  onClose: () => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order, products, onClose }) => {
  if (!order) return null;

  return (
    <div className={`flex-grow-1 border rounded shadow-sm ${styles.detailsPanel}`}>
      {/* Кнопка закрытия (X) */}
      <button 
        onClick={onClose}
        className="position-absolute translate-middle top-0 start-100 btn btn-white border rounded-circle shadow-sm d-flex align-items-center justify-content-center"
        style={{ width: '32px', height: '32px', zIndex: 20, backgroundColor: 'white' }}
      >
        <span style={{ fontSize: '12px', color: '#6c757d' }}>✕</span>
      </button>

      <div className="p-4">
        {/* Заголовок заказа */}
        <h2 className="h5 fw-bold mb-4 text-dark pe-4">{order.title}</h2>
        
        {/* Кнопка добавления продукта */}
        <button className="btn btn-link text-success fw-bold text-decoration-none d-flex align-items-center gap-2 p-0 mb-4 shadow-none">
          <span 
            className="rounded-circle border border-success border-2 d-flex align-items-center justify-content-center" 
            style={{ width: '20px', height: '20px', fontSize: '12px' }}
          >
            +
          </span>
          Добавить продукт
        </button>

        {/* Список продуктов */}
        <div className="d-flex flex-column">
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product.id} 
                className="d-flex align-items-center justify-content-between py-3 border-bottom border-light"
              >
                {/* Инфо о продукте */}
                <div className="d-flex align-items-center gap-3 flex-grow-1 text-truncate">
                  <div className="rounded-circle bg-success flex-shrink-0" style={{ width: '8px', height: '8px' }} />
                  
                  <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '40px' }}>
                    <img 
                      src={product.photo} 
                      alt={product.title} 
                      className="img-fluid h-100 object-fit-contain" 
                      style={{ mixBlendMode: 'multiply' }} 
                    />
                  </div>

                  <div className="text-truncate">
                    <div 
                      className="fw-medium text-dark text-decoration-underline small cursor-pointer" 
                      style={{ textUnderlineOffset: '4px', textDecorationColor: '#cbd5e1' }}
                    >
                      {product.title}
                    </div>
                    <div className="text-uppercase text-muted" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>
                      SN-{product.serialNumber}
                    </div>
                  </div>
                </div>

                {/* Статус и Удаление */}
                <div className="d-flex align-items-center gap-3">
                  <span className="text-success fw-bold" style={{ fontSize: '13px' }}>
                    Свободен
                  </span>
                  
                <button 
                     className={`btn btn-link p-0 shadow-none ${styles.deleteBtn}`}
                      aria-label="Удалить продукт" 
                    >
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted small">В этом приходе еще нет продуктов</div>
          )}
        </div>
      </div>
    </div>
  );
};