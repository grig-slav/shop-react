import React, { useState, useEffect, useRef } from 'react';
import styles from './TechCatalog.module.css';
import OrderModal from '../OrderModal/OrderModal'
import { getProducts } from '../../api/bot';

const TechCatalog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  const [techList, setTechList] = useState([]);
  const [botList, setBotList] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headersRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false });

  const handleHeadersPointerDown = (e) => {
    const el = headersRef.current;
    if (!el) return;
    dragState.current.isDown = true;
    dragState.current.moved = false;
    dragState.current.startX = e.clientX;
    dragState.current.startScroll = el.scrollLeft;
    el.classList.add(styles.dragging);
  };

  const handleHeadersPointerMove = (e) => {
    const el = headersRef.current;
    if (!el || !dragState.current.isDown) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - delta;
  };

  const endHeadersDrag = () => {
    const el = headersRef.current;
    if (el) el.classList.remove(styles.dragging);
    dragState.current.isDown = false;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const [techRes, botData] = await Promise.all([
          fetch('http://localhost:3001/technik'),
          getProducts()
        ]);

        if (!techRes.ok) throw new Error('Не удалось загрузить технику');

        const techData = await techRes.json();

        setTechList(techData);
        setBotList(botData || []);


        if (Array.isArray(techData) && techData.length > 0) {
          setSelectedTech(techData[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (techItem) => {
    setSelectedTech(techItem);
    setPreviewImage(null);
  };


  const handleThumbSelect = (imgUrl) => {
    setPreviewImage(imgUrl);
  };

  const renderFeatureText = (text) => {
    if (!text || typeof text !== 'string') return text;
    const separator = text.includes('—') ? '—' : text.includes('-') ? '-' : null;
    if (!separator) return text;
    const parts = text.split(separator);
    const boldPart = parts[0].trim();
    const normalPart = parts.slice(1).join(separator).trim();
    return (
      <>
        <strong>{boldPart}</strong> — {normalPart}
      </>
    );
  };

  if (loading) return <div className={styles.loading}>Загрузка техники...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;
  if (!selectedTech) return <div>Нет данных о технике</div>;

  const activeImage = previewImage || selectedTech.photoUrl;


  const currentBotFeatures = botList.find(botItem => Number(botItem.id) === Number(selectedTech.id));

  return (
    <div className={styles.techCatalogWrapper} id='rent'>
<<<<<<< HEAD
      <div
        className={styles.techHeaders}
        ref={headersRef}
        onPointerDown={handleHeadersPointerDown}
        onPointerMove={handleHeadersPointerMove}
        onPointerUp={endHeadersDrag}
        onPointerLeave={endHeadersDrag}
        onPointerCancel={endHeadersDrag}
      >
=======
      <div className={styles.techHeaders}>
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
        {techList.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (dragState.current.moved) return;
              handleSelect(item);
            }}
            className={`${styles.techHeaderItem} ${Number(selectedTech.id) === Number(item.id) ? styles.activeHeader : ''}`}
          >
            <p className={styles.zag}>{item.titl}</p>
            <span>{item.tech}</span>
          </div>
        ))}
      </div>
      <div className={styles.catalogGrid}>
        <div className={styles.leftColumn}>
          <p className={styles.descriptionText}>{selectedTech.description}</p>
          <div className={styles.specsAndThumbsRow}>
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>МОЩНОСТЬ, Л.С.</span>
                <strong className={styles.specValue}>{selectedTech.power}</strong>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>ОБЪЕМ ДВИГАТЕЛЯ, СМ³</span>
                <strong className={styles.specValue}>{selectedTech.volume}</strong>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>ВЕС, КГ</span>
                <strong className={styles.specValue}>{selectedTech.weight}</strong>
              </div>
              <button className={styles.contactBtn} onClick={openModal} aria-label="Обсудить технику с менеджером">
                <span className={styles.btnLabel}>Обсудить технику с менеджером</span>
                <svg className={styles.btnIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M9 11.5V6.5C9 5.67 9.67 5 10.5 5C11.33 5 12 5.67 12 6.5V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 11V4.5C12 3.67 12.67 3 13.5 3C14.33 3 15 3.67 15 4.5V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 11V6C15 5.17 15.67 4.5 16.5 4.5C17.33 4.5 18 5.17 18 6V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 13V9.5C6 8.67 6.67 8 7.5 8C8.33 8 9 8.67 9 9.5V13.5L7.2 12C6.6 11.5 5.7 11.7 5.4 12.4C5.15 12.97 5.32 13.63 5.8 14.02L9.3 16.9C10.2 17.64 11.34 18 12.5 18H14C16.76 18 19 15.76 19 13V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={styles.watermarkText}>{selectedTech.titl1}</div>
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.thumbnailsColumn}>
            <div
              className={`${styles.thumb} ${activeImage === selectedTech.photoUrl ? styles.activeThumb : ''}`}
              onMouseEnter={() => setPreviewImage(selectedTech.photoUrl)}
              onMouseLeave={() => setPreviewImage(null)}
              onClick={() => handleThumbSelect(selectedTech.photoUrl)}
            >
              <img src={selectedTech.photoUrl} alt={selectedTech.titl} />
            </div>
            {(selectedTech.photo || []).map((imgUrl, idx) => (
              <div
                key={idx}
                className={`${styles.thumb} ${activeImage === imgUrl ? styles.activeThumb : ''}`}
                onMouseEnter={() => setPreviewImage(imgUrl)}
                onMouseLeave={() => setPreviewImage(null)}
                onClick={() => handleThumbSelect(imgUrl)}
              >
                <img src={imgUrl} alt={`Detail ${idx}`} />
              </div>
            ))}
          </div>
          <div className={styles.contentSection}>
            <div className={styles.mainImageWrapper}>
              <img src={activeImage} alt={selectedTech.titl} className={styles.mainImage} />
            </div>


            <div className={styles.featuresList}>
              {currentBotFeatures?.first && (
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>◯</div>
                  <div className={styles.featureText}>
                    {renderFeatureText(currentBotFeatures.first)}
                  </div>
                </div>
              )}
              {currentBotFeatures?.second && (
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>✥</div>
                  <div className={styles.featureText}>
                    {renderFeatureText(currentBotFeatures.second)}
                  </div>
                </div>
              )}
              {currentBotFeatures?.third && (
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>⚲</div>
                  <div className={styles.featureText}>
                    {renderFeatureText(currentBotFeatures.third)}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <OrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>

  );
};

export default TechCatalog;