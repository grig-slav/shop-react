import { ArrowRight } from "lucide-react";
import Header from "./Header.jsx";
import "../styles/hero.css";

export default function Hero({ site, tour }) {
  const { hero, region, dates } = tour;

  return (
    <section className="hero" style={{ backgroundImage: `url(${hero.image})` }}>
      <div className="hero__scrim" aria-hidden="true" />
      <Header site={site} transparent />

      <div className="hero__watermark" aria-hidden="true">
        <span className="hero__region">{region}</span>
        <span className="hero__dates">{dates}</span>
      </div>

      <div className="hero__content">
        <h1 className="hero__title display-title">
          <span>{hero.titleLine1}</span>
          <span>{hero.titleLine2}</span>
        </h1>

        <a href="#booking" className="hero__cta">
          {hero.ctaLabel}
          <ArrowRight size={16} strokeWidth={2.25} />
        </a>
      </div>
    </section>
  );
}
