<<<<<<< HEAD
import styles from "./Sert.module.css";
import OrderModal from "../OrderModal/OrderModal";
import { useState ,useEffect} from "react";

function Sert() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const elements = document.querySelectorAll(`.${styles.animate}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [Sert]);
  return (
    <section className={styles.osnov} id="certificates">
      <div className={styles.top}>
        <p className={styles.smart}>
          F7TRAVEL | АКТИВНЫЕ ПУТЕШЕСТВИЯ
        </p>

        <p className={styles.smart1}>
          Подходит к любому празднику,
          <br />
          который хочется сделать особенным
        </p>
      </div>

      <p className={styles.smart12}>006 сертификаты</p>

      <div className={`${styles.bgContainer} ${styles.animate}`} >
        <img
          src="/images/serta.png"
          alt="Подарочные сертификаты F7 TRAVEL"
          className={styles.bgImage}
        />

        <div className={styles.contentLayer}>
          <p className={styles.zag}>
            Подарочные
            <br />
            сертификаты
          </p>

          <p className={styles.zag1}>
            Лучший подарок тем, кто ценит
            <br />
            опыт и эмоции
          </p>

          <p className={styles.def}>
            Мы берём на себя организацию
            <br />
            и подготовку — получателю остаётся
            <br />
            только выбрать направление.
          </p>

          <button
            className={styles.btn}
            onClick={() => setIsModalOpen(true)}
          >
            Заказать →
          </button>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
=======
import styles from './Sert.module.css';
import OrderModal from '../OrderModal/OrderModal';
import { useState } from 'react';

function Sert() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.osnov} id="certificates">
      <div className={styles.top}>
        <p className={styles.smart}>F7TRAVEL | АКТИВНЫЕ ПУТЕШЕСТВИЯ</p>
        <p className={styles.smart1}>Подходит к любому празднику,<br /> который хочется сделать особенным</p>
      </div>

      <div className={styles.smart12}>006 сертификаты</div>

      <div className={styles.full}>
        <section className={styles.niz}>
          
          <div className={styles.bgContainer}>
            <img 
              src="/images/serta.png" 
              alt="Подарочные сертификаты F7 TRAVEL" 
              className={styles.bgImage} 
            />

            <div className={styles.contentLayer}>
              <p className={styles.zag}>Подарочные<br></br> сертификаты</p>
              <p className={styles.zag1}>Лучший подарок тем, кто ценит<br></br> опыт и эмоции</p>
              <p className={styles.def}>Мы берём на себя организацию<br></br> и подготовку — получателю остаётся<br></br> только выбрать направление.</p>
              <button onClick={openModal} className={styles.btn}>Заказать →</button>
            </div>
          </div>
        </section>
      </div>

      <OrderModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
  );
}

export default Sert;
