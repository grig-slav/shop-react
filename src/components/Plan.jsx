import PlanDay from "./PlanDay.jsx";
import "../styles/plan.css";

export default function Plan({ data }) {
  return (
    <section className="section plan">
      <div
        className="plan__banner"
        style={{ backgroundImage: `url(${data.bannerImage})` }}
      >
        <div className="plan__banner-scrim" aria-hidden="true" />
        <p className="plan__banner-quote">{data.bannerQuote}</p>
      </div>

      <div className="section-inner plan__content">
        <div className="eyebrow-row">
          <p className="eyebrow">
            {data.eyebrowTop}
            <br />
            {data.eyebrowBottom}
          </p>
          <p className="eyebrow eyebrow--right">{data.tagline}</p>
        </div>

        <h2 className="plan__title display-title">{data.title}</h2>

        <div className="plan__days">
          {data.days.map((day) => (
            <PlanDay day={day} key={day.day} />
          ))}
        </div>
      </div>
    </section>
  );
}
