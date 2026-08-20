import React, { useEffect, useState, useRef } from 'react';
import styles from './HomePage.module.css';
import TechCatalog from '../TechCatalog/TechCatalog';
import OrderModal from '../OrderModal/OrderModal';
import Gorizont from '../GorizontPAge/Gorizont'
import Bottom from '../BottomPage/Bottom';
import Team from '../TeamPage/Team';
import Sert from '../SertPage/Sert';
import FaqPage from '../FaqPage/FaqPage';

function HomePage() {
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [selectedFilters, setSelectedFilters] = useState({
    napr: [],
    tech: [],
    season: [],
    late: [],
    lvl: []
  });

  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  
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
  }, [features, products, filterOptions,selectedFilters]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const [featuresRes, productsRes, filtersRes] = await Promise.all([
        fetch('http://localhost:3001/travelFeatures'),
        fetch('http://localhost:3001/products'),
        fetch('http://localhost:3001/filters')
      ]);

      if (!featuresRes.ok || !productsRes.ok || !filtersRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const featuresData = await featuresRes.json();
      const productsData = await productsRes.json();
      const filtersData = await filtersRes.json();

      setFeatures(featuresData);
      setProducts(productsData);
      setFilterOptions(filtersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

const handleFilterChange = (category, value) => {
  setSelectedFilters((prev) => {
    const currentCategoryValues = prev[category];
    const updatedValues = currentCategoryValues.includes(value)
      ? currentCategoryValues.filter((item) => item !== value)
      : [...currentCategoryValues, value];

    return { ...prev, [category]: updatedValues };
  });
};

const filteredProducts = products.filter((prod) => {
  return Object.keys(selectedFilters).every((category) => {
    const activeFilters = selectedFilters[category];
    if (activeFilters.length === 0) return true;

    const productValue = prod[category];

    if (Array.isArray(productValue)) {
      return productValue.some((val) => activeFilters.includes(val));
    }

    return activeFilters.includes(productValue);
  });
});


  return (
    <div className={styles.container} >
      <div className={styles.videoBackground}>
        <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/videos/menu.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>

      <div className={styles.content}>
        <div className={styles.mid}>
          <div className={`${styles.title} ${styles.animate}`}>
            Откройте Россию<br />по-настоящему
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={`${styles.left} ${styles.animate}`}>
            <div className={styles.vert}>44°33′40″ с. ш.</div>
            <h3 className={styles.zag}>АВТОРСКИЕ ТУРЫ НА КВАДРОЦИКЛАХ И СНЕГОХОДАХ</h3>
            <p className={styles.txt}>Безупречный уровень сервиса, продуманная логистика, внимание к деталям. Высокий уровень организации на каждом этапе</p>
            <p className={styles.txt}>F7 Travel — создаем впечатления по-новому</p>
            <div className={styles.vert}>38°04′37″ в. д.</div>
          </div>
          <div className={styles.middle}>
            <a href="#kalendar">
              <button className={styles.cent}>К турам →</button>
            </a>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>

      <div className={styles.all}>
        <div className={styles.adventures}>
          <div className={styles.circle}>
            <div className={`${styles.tx} ${styles.animate}`}>
              <div className={styles.top}>
                <p className={styles.smart}>F7TRAVEL | АКТИВНЫЕ ПУТЕШЕСТВИЯ</p>
                <p className={styles.smart1}>КАЧЕСТВО, ОПЕРЕЖАЮЩЕЕ ОЖИДАНИЯ.</p>
              </div>
              <p className={styles.smart12}>001 О НАШЕМ ПОДХОДЕ</p>
            </div>

            <div className={`${styles.invite} ${styles.animate}`}>
              <p>ПРИГЛАШАЕМ<br />В ПРИКЛЮЧЕНИЕ</p>
            </div>

            <div className={styles.mp}>
              <div className={`${styles.videoBackground1} ${styles.animate}`}>
                <video autoPlay loop muted playsInline className={styles.video}>
                  <source src="/videos/2.mp4" type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              </div>
            </div>
          </div>

          <div className={styles.sectionWrapper}>
            <div className={styles.bigtxt}>
              <span className={styles.txtfon}>F7 TRAVEL</span>
            </div>
            <div className={styles.contentText}>
              <p className={`${styles.description} ${styles.animate}`}>
                F7 Travel — это клуб активных путешествий для людей, которым интересны сильные маршруты, техника и настоящая география России. Мы организуем экспедиции на квадроциклах, багги и снегоходах: от коротких выездов выходного дня до многодневных путешествий по Кавказу, северу и удалённым регионам страны.
              </p>
              <p className={`${styles.desc} ${styles.animate}`}>МЫ УЖЕ ВСЕ ПОДГОТОВИЛИ ДЛЯ ВАС</p>
            </div>
          </div>

          <div className={styles.circlesContainer}>
            {features.map((item, i) => (
              <div
                key={item.id}
                className={`${styles.circleItem} ${styles.animate}`}
                style={{ '--delay': `${(i % 3) * 0.15}s` }}
              >
                <div className={styles.innerContent}>
                  <div className={styles.videoWrapper}>
                    <video
                      src={item.videoUrl}
                      className={styles.featureVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  <p className={styles.featureTitle}>{item.title}</p>
                  <p className={styles.featureText}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

<<<<<<< HEAD
        <div className={styles.productall} id="calendar">
          <div className={`${styles.tx} ${styles.animate}`}>
=======
        <div className={styles.productall} id='calendar'>
          <div className={styles.tx}>
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
            <div className={styles.top}>
              <p className={styles.smart}>F7TRAVEL | АКТИВНЫЕ ПУТЕШЕСТВИЯ</p>
              <p className={styles.smart1}>
                ЭТИ НАПРАВЛЕНИЯ МЫ ПРОВЕРИЛИ<br />ЛИЧНО — И УВЕРЕННО РЕКОМЕНДУЕМ
              </p>
            </div>
            <p className={styles.smart12}>003 РАСПИСАНИЕ</p>
          </div>

          <div className={`${styles.invite} ${styles.animate}`}>
            <p>КАЛЕНДАРЬ ПУТЕШЕСТВИЙ</p>
          </div>

          <div className={styles.days} id="kalendar"></div>

          <div className={styles.catalogLayout}>
            <aside className={`${styles.sidebar} ${styles.animate}`}>
              {filterOptions && (
                <>
                  <div className={styles.filterGroupScroll}>
                    {filterOptions.napr.map((item) => (
                      <label key={item} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.napr.includes(item)}
                          onChange={() => handleFilterChange('napr', item)}
                          className={styles.checkbox}
                        />
                        {item}
                      </label>
                    ))}
                  </div>

                  <div className={styles.filterGroup}>
                    <h4>Техника</h4>
                    {filterOptions.tech.map((item) => (
                      <label key={item} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.tech.includes(item)}
                          onChange={() => handleFilterChange('tech', item)}
                          className={styles.checkbox}
                        />
                        {item}
                      </label>
                    ))}
                  </div>

                  <div className={styles.filterGroup}>
                    <h4>Сезон</h4>
                    {filterOptions.season.map((item) => (
                      <label key={item} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.season.includes(item)}
                          onChange={() => handleFilterChange('season', item)}
                          className={styles.checkbox}
                        />
                        {item}
                      </label>
                    ))}
                  </div>

                  <div className={styles.filterGroup}>
                    <h4>Продолжительность</h4>
                    {filterOptions.late.map((item) => (
                      <label key={item} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.late.includes(item)}
                          onChange={() => handleFilterChange('late', item)}
                          className={styles.checkbox}
                        />
                        {item}
                      </label>
                    ))}
                  </div>

                  <div className={styles.filterGroup}>
                    <h4>Сложность</h4>
                    {filterOptions.lvl.map((item) => (
                      <label key={item} className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.lvl.includes(item)}
                          onChange={() => handleFilterChange('lvl', item)}
                          className={styles.checkbox}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </aside>

            <div className={styles.prodContainer}>
              {filteredProducts.length === 0 ? (
                <p className={styles.noResults}>По выбранным фильтрам ничего не найдено</p>
              ) : (
                filteredProducts.map((prod, i) => (
                  <div
                    key={prod.id}
                    className={`${styles.prodItem} ${styles.animate}`}
                    style={{ '--delay': `${(i % 3) * 0.15}s` }}
                  >
                    <div className={styles.prodWrapper}>
                      <img src={prod.photoUrl} alt={prod.title} className={styles.prodPhoto} />
                    </div>
                    <div className={styles.prodContent}>
                      <h3 className={styles.prodTitle}>{prod.title}</h3>
                      <p className={styles.prodText}>{prod.text}</p>
                      <div className={styles.prodButtons}>
                        <button className={styles.btnWant} onClick={openModal}>Хочу поехать</button>
                        
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={styles.vid}>
          <div className={`${styles.tx} ${styles.animate}`}>
            <div className={styles.top}>
              <p className={styles.smart}>F7TRAVEL | АКТИВНЫЕ ПУТЕШЕСТВИЯ</p>
              <p className={styles.smart1}>
                ВСЯ ТЕХНИКА ПРОХОДИТ ЕЖЕДНЕВНУЮ<br />ПРОВЕРКУ И ОБСЛУЖИВАНИЕ
              </p>
            </div>
            <p className={styles.smart12}>004 НАША ТЕХНИКА</p>
          </div>
          <div className={`${styles.invite} ${styles.animate}`}>
            <p>НА ЧЕМ МОЖНО<br />ОТПРАВИТЬСЯ В ПУТЬ</p>
          </div>
        </div>

        <TechCatalog />

        <Gorizont />
        <Team />
        <Sert />
        <FaqPage />

        <Bottom />
      </div>

      <OrderModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default HomePage;