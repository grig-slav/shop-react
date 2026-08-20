import React, { useEffect, useRef, useState } from 'react';
import styles from './Bottom.module.css';

const Bottom = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  const [inviteActive, setInviteActive] = useState(false);
  const [inviteOpacity, setInviteOpacity] = useState(1);

  const inviteRef = useRef(null);
  const inviteStartScroll = useRef(0);

  const inviteIsActive = useRef(false);
  const animationFrame = useRef(null);

  const finalSectionRef = useRef(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);


  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Элемент с id="\${id}" не найден.`);
    }
  };


  useEffect(() => {
    const invite = inviteRef.current;

    if (!invite) return;

    const updateInvite = () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = requestAnimationFrame(() => {
      
        if (!inviteIsActive.current) {
          const rect = invite.getBoundingClientRect();

          const fullyVisible =
  rect.top >= 0 &&
  rect.bottom <= window.innerHeight;

if (fullyVisible) {
  if (!inviteIsActive.current) {
    if (!inviteStartScroll.current) {
      inviteStartScroll.current = window.scrollY;
    }

    const waitBeforeFixed = 100;

    const passed =
      window.scrollY -
      inviteStartScroll.current;

    if (passed >= waitBeforeFixed) {
      inviteIsActive.current = true;

      inviteStartScroll.current = window.scrollY;

      setInviteActive(true);
      setInviteOpacity(1);
    }
  }

  return;
}

          return;
        }

        const passed =
          window.scrollY -
          inviteStartScroll.current;
        const fadeDistance = 300;

        const progress = Math.min(
          Math.max(passed / fadeDistance, 0),
          1
        );

        setInviteOpacity(1 - progress);

        if (
          window.scrollY <
          inviteStartScroll.current - 20
        ) {
          inviteIsActive.current = false;

          setInviteActive(false);
          setInviteOpacity(1);
        }
      });
    };

    window.addEventListener('scroll', updateInvite, {
      passive: true,
    });

    window.addEventListener('resize', updateInvite);

    updateInvite();

    return () => {
      window.removeEventListener(
        'scroll',
        updateInvite
      );

      window.removeEventListener(
        'resize',
        updateInvite
      );

      if (animationFrame.current) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }
    };
  }, []);
  useEffect(() => {
    const section = finalSectionRef.current;

    if (!section) return;

    let revealTimer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimer = setTimeout(() => {
            setShowBorder(true);
          }, 5000);

          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(section);

    return () => {
      clearTimeout(revealTimer);
      observer.disconnect();
    };
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:3001/api/save',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsModalOpen(true);
      } else {
        alert('Ошибка сохранения');
      }
    } catch (error) {
      console.error('Ошибка:', error);

      alert(
        'Ошибка подключения к серверу'
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);

    setFormData({
      name: '',
      phone: '',
      email: '',
    });
  };

  return (
    <div className={styles.wrapper}>

      <section className={styles.landscapeSection1}>
        <img
          src="/images/212.jpg"
          className={styles.bgImage}
          alt=""
        />

        <div className={styles.heroOverlay}>

          

          <div className={styles.inviteHolder}>
            <p
              ref={inviteRef}
              className={`
                ${styles.invite}
                ${
                  inviteActive
                    ? styles.inviteFixed
                    : ''
                }
              `}
              style={{
                opacity: inviteOpacity,
              }}
            >
              ПУТЬ НАЧИНАЕТСЯ С РЕШЕНИЯ.
              <br />
              ВСЁ ОСТАЛЬНОЕ МЫ УЖЕ
              <br />
              ПРОДУМАЛИ
            </p>
          </div>

        </div>
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.container}>

          <div className={styles.mainGrid}>

            <div
              className={`
                ${styles.navBlock}
                ${styles.animateTop}
              `}
            >
              <h3>НАВИГАЦИЯ</h3>

              <ul>
                <li>
                  <a href="#calendar" onClick={(e) => {
              e.preventDefault();
              handleScroll('calendar');
            }}>
                    Календарь путешествий
                  </a>
                </li>

                <li>
                  <a href="#rent">
                    Аренда техники
                  </a>
                </li>

                <li>
                  <a href="#team">
                    Команда
                  </a>
                </li>

                <li>
                  <a href="#certificates">
                    Сертификаты
                  </a>
                </li>
              </ul>
            </div>

            <div
              className={`
                ${styles.formBlock}
                ${styles.animateTopDelay1}
              `}
            >
              <h2>
                МАРШРУТ ГОТОВ. А ВЫ?
              </h2>

              <form onSubmit={handleSubmit}>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <div
                    className={
                      styles.phoneInputWrapper
                    }
                  >
                    <span className={styles.flag}>
                      🇷🇺
                    </span>

                    <span
                      className={styles.prefix}
                    >
                      +7
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="(000) 000-00-00"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Почта"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <p className={styles.disclaimer}>
                  Нажимая "Отправить", Вы
                  подтверждаете, что принимаете
                  условия{' '}
                  <a href="#terms">
                    Пользовательского соглашения
                  </a>
                  , соглашаетесь на обработку
                  персональных данных и получение
                  уведомлений рекламного характера.
                </p>

                <button
                  type="submit"
                  className={styles.submitBtn}
                >
                  Отправить
                </button>

              </form>
            </div>

            <div
              className={`
                ${styles.contactsBlock}
                ${styles.animateTopDelay2}
              `}
            >
              <div className={styles.contactItem}>

                <h3>КОНТАКТЫ</h3>

                <p>
                  <a
                    href="https://t.me..."
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telegram
                  </a>
                </p>

                <p
                  className={
                    styles.nameLabel
                  }
                >
                  Max
                </p>

                <p>
                  <a
                    href="tel:+79254277778"
                    className={
                      styles.phoneLink
                    }
                  >
                    +7 (925) 427-77-78
                  </a>
                </p>

              </div>

              <div className={styles.socialItem}>

                <h3>СОЦ.СЕТИ</h3>

                <p>
                  <a
                    href="https://vk.com..."
                    target="_blank"
                    rel="noreferrer"
                  >
                    VK
                  </a>
                </p>

                <p>
                  <a
                    href="https://rutube.ru..."
                    target="_blank"
                    rel="noreferrer"
                  >
                    Rutube
                  </a>
                </p>

              </div>

            </div>

          </div>

          <div
            className={`
              ${styles.partnersBlock}
              ${styles.animateTopDelay3}
            `}
          >
            <h3>
              ПРИ ПАРТНЕРСТВЕ
            </h3>

            <div className={styles.logos}>

              <span className={styles.logoFormula}>
                FORMULA{' '}
                <span className={styles.redText}>
                  7
                </span>
              </span>

              <span className={styles.logoFinntrail}>
                FINNTRAIL
              </span>

            </div>
          </div>

        </div>
      </section>

      <section
        className={styles.landscapeSection}
        ref={finalSectionRef}
      >
        <img
          src="/images/bot.jpg"
          className={styles.bgImage}
          alt=""
        />

        <div className={styles.overlayContent}>

          <div className={styles.coordinatesWrapper}>

            <p className={styles.caption}>
              МЫ ВЫДВИГАЕМСЯ
            </p>

            <p className={styles.geo}>
              44°33'40" С. Ш. 38°04'37" В. Д.
            </p>

            <div
              className={`
                ${styles.targetZone}
                ${
                  showBorder
                    ? styles.activeZone
                    : ''
                }
              `}
            >

              <div
                className={`
                  ${styles.corner}
                  ${styles.topLeft}
                `}
              />

              <div
                className={`
                  ${styles.corner}
                  ${styles.topRight}
                `}
              />

              <div
                className={`
                  ${styles.corner}
                  ${styles.bottomLeft}
                `}
              />

              <div
                className={`
                  ${styles.corner}
                  ${styles.bottomRight}
                `}
              />

            </div>

          </div>

        </div>

        <footer className={styles.legalFooter}>

          <div className={styles.legalLeft}>

            <span className={styles.reestr}>
              РЕЕСТРОВЫЙ НОМЕР ТУРОПЕРАТОРА
              Р031-00161-00/03231208
            </span>

            <div
              className={styles.legalLinks}
            >
              <a href="#privacy">
                ПОЛИТИКА
                КОНФИДЕНЦИАЛЬНОСТИ
              </a>

              <a href="#personal-data">
                СОГЛАСИЕ НА ОБРАБОТКУ
                ПЕРСОНАЛЬНЫХ ДАННЫХ
              </a>

              <a href="#ads">
                СОГЛАСИЕ НА ПОЛУЧЕНИЕ
                УВЕДОМЛЕНИЙ РЕКЛАМНОГО
                ХАРАКТЕРА
              </a>
            </div>

          </div>

          <div className={styles.legalRight}>
            <span>
              © 2026 F7 TRAVEL.
              ВСЕ ПРАВА ЗАЩИЩЕНЫ
            </span>
          </div>

        </footer>

      </section>
      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={closeModal}
        >
          <div
            className={styles.modalContent}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h3>
              Успешно отправлено!
            </h3>

            <p>
              Данные маршрута успешно сохранены.
              Мы свяжемся с вами в ближайшее время.
            </p>

            <button
              onClick={closeModal}
              className={styles.closeBtn}
            >
              Отлично
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Bottom;