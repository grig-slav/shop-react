import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './HeaderPage.module.css';
import OrderModal from '../OrderModal/OrderModal';
function HeaderPage() {
<<<<<<< HEAD
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
=======
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const user = JSON.parse(localStorage.getItem('user'));

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
<<<<<<< HEAD
  const [menuOpen, setMenuOpen] = useState(false);
=======
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
<<<<<<< HEAD
      console.warn(`Элемент с id="${id}" не найден.`);
    }
    setMenuOpen(false);
=======
      console.warn(`Элемент с id="\${id}" не найден.`);
    }
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
<<<<<<< HEAD
  }, [prevScrollPos]);
=======
  }, [prevScrollPos]); 
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

<<<<<<< HEAD
  const navItems = [
    { id: 'calendar', label: 'Календарь путешествий' },
    { id: 'rent', label: 'Аренда техники' },
    { id: 'team', label: 'Команда' },
    { id: 'certificates', label: 'Сертификаты' },
  ];

  return (
    <>
      <header className={`${styles.header} ${!visible ? styles.headerHidden : ''}`}>
        <Link to="/" className={styles.logoContainer}>
          <img src="/images/logo.png" alt="F7 Travel" className={styles.logoImage} />
        </Link>

        <nav className={styles.mainNav}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.rightBlock} onClick={openModal}>
          <a className={styles.actionBtn}>
            Выбрать маршрут
          </a>

          <a
=======
  return (
    <header className={`${styles.header} ${!visible ? styles.headerHidden : ''}`}>
      <Link to="/" className={styles.logoContainer}>
        <img src="/images/logo.png" alt="F7 Travel" className={styles.logoImage} />
      </Link>

      <div className={styles.menuWrapper}>
        <nav className={styles.mainNav}>
          <a
            href="#calendar"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('calendar');
            }}
          >
            Календарь путешествий
          </a>

          <a
            href="#rent"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('rent');
            }}
          >
            Аренда техники
          </a>

          <a
            href="#team"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('team');
            }}
          >
            Команда
          </a>

          <a
            href="#certificates"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              handleScroll('certificates');
            }}
          >
            Сертификаты
          </a>
        </nav>

        <Link to="/catalog" className={styles.actionBtn}>
          Выбрать маршрут
        </Link>

        <div className={styles.rightBlock}>
          <a
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
            href="https://vk.com/f7travel"
            className={styles.iconLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/max.png" alt="VK" className={styles.socialIcon} />
          </a>
<<<<<<< HEAD

=======
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
          <a
            href="https://t.me/f7travel"
            className={styles.iconLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/tg.png" alt="Telegram" className={styles.socialIcon1} />
          </a>

          <a href="tel:+79254277778" className={styles.phoneLink}>
            <span className={styles.phoneIcon}></span>
<<<<<<< HEAD
            <span className={styles.phoneText}>+7(925) 427-77-78</span>
          </a>

          

          <button
            className={`${styles.burgerBtn} ${menuOpen ? styles.burgerBtnActive : ''}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <nav className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={styles.mobileNavLink}
            onClick={(e) => {
              e.preventDefault();
              handleScroll(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
        <OrderModal isOpen={isModalOpen} onClose={closeModal} />
      {menuOpen && (
        <div className={styles.mobileNavOverlay} onClick={() => setMenuOpen(false)} />
      )}
    </>
=======
            <span>+7(925) 427-77-78</span>
          </a>
        </div>
      </div>
    </header>
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
  );
}

export default HeaderPage;