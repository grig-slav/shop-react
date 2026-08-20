import { ChevronRight } from "lucide-react";
import "../styles/generalInfo.css";

export default function GeneralInfo({ data }) {
  return (
    <section className="section general-info">
      <div className="section-inner">
        <div className="eyebrow-row">
          <p className="eyebrow">
            {data.eyebrowTop}
            <br />
            {data.eyebrowBottom}
          </p>
          <p className="eyebrow eyebrow--right">{data.tagline}</p>
        </div>

        <p className="general-info__description">{data.description}</p>

        <dl className="general-info__stats">
          {data.stats.map((stat) => (
            <div className="general-info__stat-row" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="general-info__badge-row">
          <span className="general-info__rule" aria-hidden="true" />
          <span className="general-info__badge">
            {data.distanceBadge}
            <ChevronRight size={15} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </section>
  );
}
