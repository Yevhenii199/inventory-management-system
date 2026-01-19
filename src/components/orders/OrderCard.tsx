'use client';

import React from 'react';
import { Order } from '@/types/inventory';
import { formatOrderDate, formatCurrency } from '@/utils/formatters';
import styles from './Orders.module.css';

interface OrderCardProps {
  order: Order;
  productCount: number;
  totalUah: number;
  totalUsd: number;
  isSelected: boolean;
  isAnySelected: boolean;
  onSelect: (id: number) => void;
  onDelete: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ 
  order, productCount, totalUah, totalUsd, isSelected, isAnySelected, onSelect, onDelete 
}) => {
  const { topRow, bottomRow } = formatOrderDate(order.date || '2017-10-06');

  return (
    <div 
      onClick={() => onSelect(order.id)}
      className={`rounded border shadow-sm d-flex align-items-center position-relative ${styles.orderCard} ${isSelected ? styles.selectedCard : ''}`}
    >
      {!isAnySelected && (
        <div className="flex-grow-1 text-truncate pe-4" style={{ flexBasis: '40%' }}>
          <span className="text-decoration-underline text-secondary-emphasis" style={{ textUnderlineOffset: '8px', textDecorationColor: '#cbd5e1' }}>
            {order.title}
          </span>
        </div>
      )}
      
      <div className="d-flex align-items-center gap-3" style={{ minWidth: '130px', flex: isAnySelected ? '1' : '0 0 auto' }}>
        <div className="p-2 border rounded-circle text-secondary opacity-50 d-flex align-items-center justify-content-center">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <div>
          <div className="h4 mb-0 fw-normal text-dark opacity-75">{productCount}</div>
          {/* Заменено на "Продукты" */}
          <div className="small text-uppercase text-muted" style={{ fontSize: '11px' }}>Продукты</div>
        </div>
      </div>

      <div className="text-center" style={{ minWidth: '140px', flex: '1' }}>
        <div className="text-muted small">{topRow}</div>
        <div className="fw-medium text-dark" style={{ fontSize: '14px' }}>{bottomRow}</div>
      </div>

      {!isAnySelected && (
        <div className="text-center pe-5" style={{ minWidth: '180px', flex: '1' }}>
          <div className="text-muted small">{totalUsd.toLocaleString()} $</div>
          <div className="h6 mb-0 fw-bold text-dark">
            {formatCurrency(totalUah)} 
            <span className="small text-uppercase text-muted ms-1 fw-normal" style={{ fontSize: '10px' }}>uah</span>
          </div>
        </div>
      )}

      {!isAnySelected && (
        <button      
          className={`btn btn-link p-0 shadow-none ms-auto ${styles.deleteBtn}`}
          onClick={(e) => { e.stopPropagation(); onDelete(order); }}
          
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}

      {isSelected && (
        <div className={`position-absolute h-100 end-0 d-flex align-items-center justify-content-center ${styles.selectionIndicator}`}>
          <svg width="24" height="24" className="text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
};