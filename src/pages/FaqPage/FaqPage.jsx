import React, { useEffect, useState } from "react";
import styles from "./FaqPage.module.css";

function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await fetch("/db.json");

        if (!response.ok) {
          throw new Error(`Ошибка HTTP: \${response.status}`);
        }

        const data = await response.json();
<<<<<<< HEAD

        const normalizedFaqs = (data.faqs || []).map((faq) => ({
          ...faq,
          isExpanded: false,
=======
        

        const normalizedFaqs = (data.faqs || []).map(faq => ({
          ...faq,
          isExpanded: false 
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
        }));

        setFaqs(normalizedFaqs);
      } catch (err) {
        console.error("Ошибка загрузки FAQ:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
  }, [faqs]);

  const toggleFaq = (id) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id
          ? { ...faq, isExpanded: !faq.isExpanded }
          : faq
      )
    );
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        Загрузка вопросов...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        Ошибка: {error}
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <section className={styles.faq}>
        <div className={styles.main}>
<<<<<<< HEAD

          <header className={`${styles.tx} ${styles.animate}`}>
            <div className={styles.top}>
              <p className={styles.smart}>
                F7TRAVEL | АКТИВНЫЕ ПУТЕШЕСТВИЯ
              </p>

              <p className={styles.smart1}>
                КАЧЕСТВО, ОПЕРЕЖАЮЩЕЕ ОЖИДАНИЯ.
              </p>
            </div>

            <p className={styles.smart12}>
              007 ОТВЕТЫ НА ВОПРОСЫ
            </p>
          </header>

          <div className={`${styles.titletxt} ${styles.animate}`}>
            <h1 className={styles.title}>
              ЧАСТО ЗАДАВАЕМЫЕ
              <br />
              ВОПРОСЫ
            </h1>
          </div>

          <div className={styles.accordion}>
            {faqs.length === 0 ? (
              <p className={styles.noData}>
                Нет данных FAQ
              </p>
            ) : (
              faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`${styles.accordionItem} ${styles.animate}`}
                  style={{
                    "--delay": `${index * 0.08}s`,
                  }}
                >
                  <button
                    type="button"
                    className={`${styles.accordionHeader} ${
                      faq.isExpanded ? styles.active : ""
                    }`}
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={faq.isExpanded}
                    aria-controls={`content-${faq.id}`}
                  >
                    <span className={styles.question}>
                      {faq.question}
                    </span>

                    <span className={styles.icon}>
                      {faq.isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  {faq.isExpanded && (
                    <div
                      id={`content-${faq.id}`}
                      className={styles.accordionContent}
                      role="region"
                      aria-hidden={!faq.isExpanded}
                    >
=======
          <div className={styles.tx}>
            <div className={styles.top}>
              <p className={styles.smart}>F7TRAVEL | АКТИВНЫЕ ПУТЕШЕСТВИЯ</p>
              
              <p className={styles.smart1}>КАЧЕСТВО, ОПЕРЕЖАЮЩЕЕ ОЖИДАНИЯ.</p>
            </div>
            <p className={styles.smart12}>007 ОТВЕТЫ НА ВОПРОСЫ</p>
          </div>
          
          <div className={styles.titletxt}>
            <p className={styles.title}>ЧАСТО ЗАДАВАЕМЫЕ<br /> ВОПРОСЫ</p>
          </div>

          <div className={styles.accordion}>
            {faqs.length === 0 ? (
              <p className={styles.noData}>Нет данных FAQ</p>
            ) : (
              faqs.map((faq) => (
                <div key={faq.id} className={styles.accordionItem}>
                  <button
                    className={`${styles.accordionHeader} ${faq.isExpanded ? styles.active : ""}`}
                    onClick={() => toggleFaq(faq.id)}
                    type="button"
                    aria-expanded={faq.isExpanded}
                    aria-controls={`content-\${faq.id}`}
                  >
                    <span>{faq.question}</span>
                    <span className={styles.icon}>{faq.isExpanded ? "−" : "+"}</span>
                  </button>

                  {faq.isExpanded && (
                    <div id={`content-\${faq.id}`} className={styles.accordionContent} role="region" aria-hidden={!faq.isExpanded}>
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
<<<<<<< HEAD

        </div>
      </section>
    </main>
=======
        </div>
      </div>
    </div>
>>>>>>> f893ec0e893b99bc3009e442f30b7c6b9e0df77f
  );
}

export default FaqPage;
