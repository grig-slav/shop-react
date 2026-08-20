import React, { useState } from 'react';

import styles from './OrderModal.module.css'; 

const OrderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Date.now().toString(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert('Данные успешно сохранены');
        setFormData({ name: '', phone: '', email: '' });
        onClose();
      } else {
        console.error('Ошибка при сохранении данных');
      }
    } catch (error) {
      console.error('Не удалось связаться с сервером:', error);
    }
  };

  return (
    <div className={styles.modaloverlay} onClick={onClose}>
      <div className={styles.modalcontainer} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalclosebtn} onClick={onClose}>×</button>
        <p className={styles.modaltitle}>МАРШРУТ ГОТОВ. А ВЫ?</p>
        
        <form onSubmit={handleSubmit} className={styles.modalform}>
          <div className={styles.inputgroup}>
            <input 
              type="text" 
              name="name" 
              placeholder="Ваше имя" 
              value={formData.name} 
              onChange={handleChange}
              required 
            />
          </div>
          <div className={styles.inputgroup}>
            <input 
              type="tel" 
              name="phone" 
              placeholder="+7 (000) 000-00-00" 
              value={formData.phone} 
              onChange={handleChange}
              required 
            />
          </div>
          <div className={styles.inputgroup}>
            <input 
              type="email" 
              name="email" 
              placeholder="Почта" 
              value={formData.email} 
              onChange={handleChange}
              required 
            />
          </div>
          <p className={styles.modaldisclaimer}>
            Нажимая "Отправить", вы подтверждаете, что принимаете условия Пользовательского соглашения и обработку персональных данных.
          </p>
         
          <button type="submit" className={styles['modalsubmit-btn']}>Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
