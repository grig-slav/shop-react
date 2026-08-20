export default function PlanDay({ day }) {
  const hasImages = day.images && day.images.length > 0;

  return (
    <article className={`plan-day ${day.isDeparture ? "plan-day--departure" : ""}`}>
      <div className="plan-day__body">
        <h3 className="plan-day__label display-title">
          ДЕНЬ {day.day}
        </h3>

        {day.distance && (
          <p className="plan-day__distance">
            Общая протяжённость ходового дня: <span>{day.distance}</span>
          </p>
        )}

        {day.text && <p className="plan-day__text">{day.text}</p>}

        {day.bullets.length > 0 && (
          <>
            <p className="plan-day__program-label">Программа дня:</p>
            <ul className="plan-day__bullets">
              {day.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </>
        )}

      </div>

      {hasImages && (
        <div className={`plan-day__media plan-day__media--count-${day.images.length}`}>
          {day.images.map((src, i) => (
            <img key={i} src={src} alt={`Карелия, день ${day.day}`} loading="lazy" />
          ))}
          {day.note && <p className="plan-day__note">{day.note}</p>}
          {day.quote && <p className="plan-day__quote">«{day.quote}»</p>}
        </div>
      )}
    </article>
  );
}
