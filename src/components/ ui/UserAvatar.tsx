'use client';
import { useState, useEffect } from 'react';

export default function UserAvatar() {
  const [image, setImage] = useState('/default-avatar.jpg');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userAvatarUrl');
    if (saved) setImage(saved);
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        setImage(data.url);
        localStorage.setItem('userAvatarUrl', data.url);
        // Можна замінити alert на Toast, як у вашому NavigationMenu
      }
    } catch (error) {
      console.error("Помилка завантаження:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-relative d-inline-block">
      {/* Контейнер аватара */}
      <div 
        className={`rounded-circle overflow-hidden border border-2 shadow-sm d-flex align-items-center justify-content-center bg-light ${loading ? 'opacity-50' : ''}`} 
        style={{ width: '96px', height: '96px' }}
      >
        {loading ? (
          <div className="spinner-border text-success spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <img 
            src={image} 
            alt="Avatar" 
            className="w-100 h-100" 
            style={{ objectFit: 'cover' }} 
          />
        )}
      </div>

      {/* Прихований інпут */}
      <input 
        type="file" 
        onChange={handleImageChange} 
        className="d-none" 
        id="avatar-input" 
        accept="image/*"
        disabled={loading}
      />

      {/* Кнопка редагування */}
      <label 
        htmlFor="avatar-input" 
        className="position-absolute bottom-0 end-0 bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center border"
        style={{ 
          width: '32px', 
          height: '32px', 
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <span style={{ fontSize: '14px' }}>⚙️</span>
      </label>

      <style jsx>{`
        label:hover {
          background-color: #f8f9fa !important;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}