'use client';
import React from 'react';
import { Product, Order } from '@/types/inventory';
import { formatDate, formatCurrency } from '@/utils/formatters';
import styles from './Products.module.css';

interface ProductRowProps {
  product: Product;
  parentOrder?: Order;
  onDelete: (id: number, title: string, photo: string) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, parentOrder, onDelete }) => {
  const usdPrice = product.price.find(p => p.symbol === 'USD');
  const uahPrice = product.price.find(p => p.symbol === 'UAH');

  return (
    <div className={`px-4 py-2 rounded border d-flex align-items-center justify-content-between gap-3 ${styles.productRow}`}>
      {/* Статус-точка */}
      <div className="flex-shrink-0" style={{ width: '12px' }}>
        <div className={`${styles.statusDot} ${product.isNew === 1 ? 'bg-success' : 'bg-dark'}`} />
      </div>
      
      {/* Фото */}
      <div className="flex-shrink-0 d-flex align-items-center justify-content-center overflow-hidden" style={{ width: '56px', height: '40px' }}>
        <img 
          src={product.photo} 
          alt={product.title} 
          className={`img-fluid h-100 ${styles.objectFitContain}`} 
          style={{ mixBlendMode: 'multiply' }} 
        />
      </div>
      
      {/* Название */}
      <div style={{ width: '250px' }} className="flex-shrink-0">
        <div className="text-dark border-bottom border-secondary-subtle d-inline-block text-truncate mw-100 cursor-pointer">
          {product.title}
        </div>
        <div className={`text-uppercase text-muted ${styles.smallText}`}>SN-{product.serialNumber}</div>
      </div>

      {/* Статус использования */}
      <div style={{ width: '90px' }} className={`text-center fw-medium ${product.isNew === 1 ? 'text-success' : 'text-dark'}`}>
        {product.isNew === 1 ? 'свободен' : 'в ремонте'}
      </div>

      {/* Гарантия */}
      <div className="text-center" style={{ width: '120px' }}>
        <div className={`text-muted ${styles.smallText}`}>с {formatDate(product.guarantee.start)}</div>
        <div className="text-dark fw-medium">по {formatDate(product.guarantee.end)}</div>
      </div>

      {/* Состояние */}
      <div className="text-center fw-medium text-dark" style={{ width: '60px' }}>
        {product.isNew === 1 ? 'новый' : 'Б / У'}
      </div>

      {/* Цена */}
      <div style={{ width: '120px' }}>
        <div className={`text-muted ${styles.smallText}`}>{usdPrice?.value} $</div>
        <div className="fw-bold text-dark">
          {formatCurrency(uahPrice?.value || 0)} <span className="small fw-normal text-muted text-uppercase">uah</span>
        </div>
      </div>

      {/* Приход (Order) */}
      <div className="text-muted text-truncate border-bottom border-secondary-subtle cursor-pointer" style={{ width: '220px', fontSize: '13px' }}>
        {parentOrder?.title || '—'}
      </div>

      {/* Ответственный */}
      <div className="flex-grow-1 text-center text-dark text-truncate px-2" style={{ minWidth: '120px' }}>
        {product.responsiblePerson || '—'}
      </div>

      {/* Дата */}
      <div className="text-center" style={{ width: '100px' }}>
        <div className="text-muted" style={{ fontSize: '10px' }}>06 / 12</div>
        <div className="text-dark">{formatDate(product.date)}</div>
      </div>

      {/* Кнопка удаления */}
      <button 
        className={`btn btn-link p-2 shadow-none ${styles.deleteBtn}`} 
        onClick={() => onDelete(product.id, product.title, product.photo)}
        aria-label="Удалить продукт"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};