import "../styles/pricing.css";

export default function Pricing({ data }) {
  return (
    <section className="section pricing">
      <div className="section-inner">
        <div className="eyebrow-row">
          <p className="eyebrow">
            {data.eyebrowTop}
            <br />
            {data.eyebrowBottom}
          </p>
        </div>

        <h2 className="pricing__title display-title">{data.title}</h2>

        <div className="pricing__rates">
          <div className="pricing__rate-row">
            <span className="pricing__rate-label display-title">{data.driverLabel}</span>
            <span className="pricing__rate-value display-title">{data.driverPrice}</span>
          </div>
          <div className="pricing__rate-row">
            <span className="pricing__rate-label display-title">{data.passengerLabel}</span>
            <span className="pricing__rate-value display-title">{data.passengerPrice}</span>
          </div>
        </div>

        <div className="pricing__divider-image">
          <img src={data.images.primary} alt="" loading="lazy" />
        </div>

        <div className="pricing__block">
          <div className="pricing__image">
            <img src={data.images.secondary} alt="" loading="lazy" />
          </div>
          <div className="pricing__list-col">
            <h3 className="pricing__list-title display-title">{data.includedTitle}</h3>
            <ul className="pricing__list">
              {data.included.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pricing__block pricing__block--reverse">
          <div className="pricing__list-col">
            <h3 className="pricing__list-title display-title">{data.excludedTitle}</h3>
            <ul className="pricing__list">
              {data.excluded.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="pricing__image">
            <img src={data.images.tertiary} alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
