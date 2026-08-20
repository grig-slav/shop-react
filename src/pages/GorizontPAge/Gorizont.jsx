import { useEffect, useRef } from 'react';
import styles from './Gorizont.module.css';

function Gorizont() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mq = window.matchMedia('(min-width: 1025px)');
    let animationFrame;

    function resetMobileStyles() {
      section.style.height = '';
      track.style.transform = '';
    }

    function handleScroll() {
      if (!mq.matches) return;

      const maxTranslate = track.scrollWidth - window.innerWidth;

      section.style.height = `${window.innerHeight + Math.max(0, maxTranslate)}px`;

      const rect = section.getBoundingClientRect();
      let translate = -rect.top;

      if (translate < 0) translate = 0;
      if (translate > maxTranslate) translate = maxTranslate;

      animationFrame = requestAnimationFrame(() => {
        track.style.transform = `translateX(-${translate}px)`;
      });
    }

    function handleMqChange() {
      if (!mq.matches) {
        resetMobileStyles();
      }
      handleScroll();
    }

    handleMqChange();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handleMqChange);
      } else {
        mq.removeListener(handleMqChange);
      }
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

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
  }, []);

  return (
    <section className={styles.horizontal} ref={sectionRef}>
      <div className={styles.sticky}>
        <div className={styles.track} ref={trackRef}>

          <div className={styles.card1}>
            <img src="/images/fon1.jpg" alt="Waterfall Background" className={styles.bgImage} />

            <div className={styles.contentGrid}>
              <div className={styles.topTxt}>
                <h2 className={styles.mainTitle}>
                  А ЕЩЕ МЫ ПОМОГАЕМ<br />С ЭКИПИРОВКОЙ
                </h2>
              </div>
              <div className={styles.rightBlock}>
                <div className={`${styles.avatarWrapper} ${styles.animate}`}>
                  <img src="/images/smallphoto1.webp" alt="Rider Close Up" className={styles.avatar} />
                </div>
                <p className={styles.description}>
                  ПОДРОБНО РАССКАЖЕМ, ЧТО ПОНАДОБИТСЯ В ПОЕЗДКЕ.
                  СОСТАВ ЭКИПИРОВКИ ЗАВИСИТ ОТ РЕГИОНА, СЕЗОНА И ФОРМАТА МАРШРУТА
                </p>
              </div>
            </div>
          </div>

          <div className={styles.card2}>
            <div className={styles.mediaGrid}>

              <div className={styles.screenOne}>
                <div className={styles.columnLeft}>
                  <div className={`${styles.gridItem} ${styles.quadTop} ${styles.animate}`}>
                    <video src="/videos/small-gorizont.mp4" autoPlay loop muted playsInline className={styles.mediaContent} />
                  </div>
                  <div className={`${styles.gridItem} ${styles.videoBlock} ${styles.animate}`}>
                    <img src="/images/first.jpg" alt="Quad" className={styles.mediaContent} />
                  </div>
                </div>

                <div className={styles.columnCenter}>
                  <div className={`${styles.gridItem} ${styles.riderTall} ${styles.animate}`}>
                    <img src="/images/fon2.jpg" alt="Rider" className={styles.mediaContent} />
                  </div>
                </div>

                <div className={styles.columnRight}>
                  <div className={`${styles.gridItem} ${styles.snowmobilesTop} ${styles.animate}`}>
                    <img src="/images/smallphoto3.webp" alt="Snowmobiles" className={styles.mediaContent} />
                  </div>
                  <div className={`${styles.gridItem} ${styles.buggyMountains} ${styles.animate}`}>
                    <img src="/images/fird.jpeg" alt="Buggy" className={styles.mediaContent} />
                  </div>
                  <p className={`${styles.quote} ${styles.animate}`}>
                    «Всей команде отдельное спасибо за сплоченность и готовность прийти на выручку»
                  </p>
                </div>

                <div className={styles.hugeBackgroundText}>
                  ЧТОБЫ ВАШИ ПУТЕШЕСТВИЯ<br />ВЫГЛЯДЕЛИ ТАК
                </div>
                <div className={`${styles.gridItem} ${styles.borderPhoto} ${styles.animate}`}>
                  <img src="/images/smallphoto1.webp" alt="Next" className={styles.mediaContent} />
                </div>
              </div>

              <div className={styles.screenTwo}>
                <div className={styles.columnPrav}>
                  <p className={`${styles.quote1} ${styles.animate}`}>
                    «Настоящий драйв, красивая дикая природа и продуманный маршрут — всё
                    прошло на высшем уровне. Лесные дороги, броды, водопады и скалы —
                    эмоции просто зашкаливают!»
                  </p>
                  <div className={`${styles.atvBeachLine} ${styles.animate}`}>
                    <img src="/images/chet.jpg" alt="ATV на берегу" className={styles.mediaContent} />
                  </div>
                  <div className={`${styles.buggyYellow} ${styles.animate}`}>
                    <img src="/images/pyat.jpg" alt="Жёлтый багги" className={styles.mediaContent} />
                  </div>
                  <p className={`${styles.quote2} ${styles.animate}`}>
                    «Огромное спасибо всей команде, организовавшей нам такой классный
                    тур!!! Все прошло на высшем уровне сервиса и комфорта, на всем пути
                    путешествия нас сопровождали отличные организаторы, ну и конечно же
                    Ольга, которая просто не выпускала камеру из рук.»
                  </p>
                </div>

                <div className={styles.columnRightPrav}>
                  <div className={`${styles.atvSmallTop} ${styles.animate}`}>
                    <video src="/videos/small-vert.mp4" autoPlay loop muted playsInline className={styles.mediaContent} />
                  </div>
                  <div className={`${styles.atvPathBig} ${styles.animate}`}>
                    <img src="/images/shest.jpg" alt="" className={styles.mediaContent} />
                  </div>
                  <div className={`${styles.lakeSunset} ${styles.animate}`}>
                    <img src="/images/vosem.jpg" alt="У озера" className={styles.mediaContent} />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className={styles.card}>
            <img src="/images/fons.jpg" className={styles.back} alt="Фон" />
            <video
              src="/videos/big.mp4"
              autoPlay
              loop
              muted
              playsInline
              className={styles.bigVideo1}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Gorizont;