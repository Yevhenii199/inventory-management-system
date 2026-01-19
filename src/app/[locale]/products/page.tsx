'use client';
import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl'; 
import { products as initialProducts, orders } from '@/data/app.data';
import { ProductRow } from '@/components/products/ProductRow';
import { FilterSelect } from '@/components/products/FilterSelect';
import styles from '@/components/products/Products.module.css';

export default function ProductsPage() {
  const t = useTranslations('Products'); 
  
  const [products] = useState(initialProducts);
  const [filterType, setFilterType] = useState('All');
  const [filterSpec, setFilterSpec] = useState('All');

  // Формируем список типов
  const types = useMemo(() => {
    const unique = Array.from(new Set(initialProducts.map(p => p.type)));
    return ['All', ...unique];
  }, []);

  const specifications = useMemo(() => 
    ['All', ...Array.from(new Set(initialProducts.map(p => p.specification)))], 
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesType = filterType === 'All' || p.type === filterType;
      const matchesSpec = filterSpec === 'All' || p.specification === filterSpec;
      return matchesType && matchesSpec;
    });
  }, [products, filterType, filterSpec]);

  const handleDelete = (id: number, title: string, photo: string) => {
    console.log('Deleting:', id);
  };

  return (
    <div className={`container-fluid py-5 min-vh-100 ${styles.productsPage}`}>
      
      {/* HEADER & FILTERS */}
      <div className="d-flex align-items-center mb-4 flex-wrap gap-4">
        <h1 className="h4 fw-bold mb-0 text-dark">
          {t('title', { count: filteredProducts.length })}
        </h1>
        
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <FilterSelect 
            label={t('typeLabel')} 
            value={filterType} 
            options={types.map(opt => ({
              value: opt,
              label: opt === 'All' ? t('all') : opt 
            }))} 
            onChange={setFilterType} 
          />
          
          <FilterSelect 
            label={t('specLabel')} 
            value={filterSpec} 
            options={specifications.map(opt => ({
              value: opt,
              label: opt === 'All' ? t('all') : opt
            }))} 
            onChange={setFilterSpec} 
          />
        </div>
      </div>

      {/* LIST */}
      <div className="d-flex flex-column gap-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductRow 
              key={product.id} 
              product={product} 
              parentOrder={orders.find(o => o.id === product.order)}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-5 text-muted">
            {t('notFound')}
          </div>
        )}
      </div>
    </div>
  );
}