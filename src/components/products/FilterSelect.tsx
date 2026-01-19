'use client';
import React from 'react';
import styles from './Products.module.css';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[]; // Для поддержки объектов {value, label}
  onChange: (val: string) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange }) => (
  <div className="d-flex align-items-center gap-2">
    <span className="text-secondary small">{label}</span>
    <select 
      className={styles.formSelectUnderline} 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);