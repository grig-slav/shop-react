import { useEffect, useState } from 'react';
import styles from './Team.module.css';

const TRANSITION_MS = 300;

function Team() {
  const [team, setTeam] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetch('/db.json')
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.person;

        if (!Array.isArray(list)) {
          console.error(
            'db.json должен быть массивом людей, получено:',
            data
          );
          return;
        }

        setTeam(list);
      })
      .catch((err) =>
        console.error('Не удалось загрузить db.json', err)
      );
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
  }, [team]);

  const goTo = (newIndex, dir) => {
    if (isAnimating) return;
    if (newIndex < 0 || newIndex >= team.length) return;

    setDirection(dir);
    setIsAnimating(true);

    setTimeout(() => {
      setIndex(newIndex);

      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
    }, TRANSITION_MS);
  };

  const handlePrev = () => goTo(index - 1, 'prev');
  const handleNext = () => goTo(index + 1, 'next');

  if (!Array.isArray(team) || team.length === 0 || !team[index]) {
    return (
      <section className={styles.team}>
        <p className={styles.loading}>Загрузка...</p>
      </section>
    );
  }

  const person = team[index];
  const isFirst = index === 0;
  const isLast = index === team.length - 1;

  const personBlockClass = [
    styles.personBlock,
    isAnimating
      ? styles[`out-${direction}`]
      : styles[`in-${direction}`],
  ].join(' ');

  return (
<<<<<<< HEAD
    <section className={styles.team} id="team">
=======
    <section className={styles.team} id='team'>
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
      <div className={styles.topBar}>
        <div className={`${styles.top} ${styles.animate}`}>
          <p className={styles.smart}>
            F7TRAVEL | АКТИВНЫЕ ПУТЕШЕСТВИЯ
          </p>

          <div className={styles.smart1}>
            ЛЮДИ, КОТОРЫМ МЫ ДОВЕРЯЕМ
            <br />
            КАЖДЫЙ КИЛОМЕТР ВАШЕГО ЗАЕЗДА
          </div>
        </div>

        <p className={`${styles.smart12} ${styles.animate}`}>
          005 КОМАНДА
        </p>
      </div>

<<<<<<< HEAD
      <p className={`${styles.title} ${styles.animate}`}>
=======
      <p className={styles.title}>
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
        ЗА КАЧЕСТВО ОТВЕЧАЕТ
        <br />
        КОМАНДА F7 TRAVEL
      </p>

      <p className={`${styles.intro} ${styles.animate}`}>
        Опытные проводники и механики помогут, подскажут,
        зададут хорошее настроение и не оставят наедине с
        возникающими вопросами.
      </p>

      <div className={personBlockClass}>
        <div className={styles.photoCol}>
          <h2 className={styles.name}>{person.name}</h2>

          <div className={styles.photoWrapper}>
            <div className={styles.dashedRing} />

            <img
              src={person.photo}
              alt={person.name}
              className={styles.photo}
            />
          </div>
        </div>

        <div className={styles.infoCol}>
          <p className={styles.specialization}>
            {person.specialization}
          </p>

          {person.info && person.info.length > 0 && (
            <ul className={styles.infoList}>
              {person.info.map((line, i) => (
                <li key={i} className={styles.infoItem}>
                  {line}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.nav}>
        <button
          type="button"
          className={`${styles.navBtn} ${
            isFirst ? styles.navBtnDisabled : ''
          }`}
          onClick={handlePrev}
          disabled={isFirst}
          aria-label="Предыдущий участник"
        >
          ←
        </button>

        <span className={styles.counter}>
          {String(index + 1).padStart(2, '0')}
          <span className={styles.counterTotal}>
            /{String(team.length).padStart(2, '0')}
          </span>
        </span>

        <button
          type="button"
          className={`${styles.navBtn} ${
            isLast ? styles.navBtnDisabled : ''
          }`}
          onClick={handleNext}
          disabled={isLast}
          aria-label="Следующий участник"
        >
          →
        </button>
      </div>
    </section>
  );
}

export default Team;