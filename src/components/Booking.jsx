import { useState } from "react";
import "../styles/booking.css";

function formatRuPhone(raw) {
  const digits = raw.replace(/\D/g, "").replace(/^7|^8/, "").slice(0, 10);
  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 8);
  const p4 = digits.slice(8, 10);
  let out = "";
  if (p1) out += `(${p1}`;
  if (p1.length === 3) out += ") ";
  if (p2) out += p2;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}

export default function Booking({ data }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState("idle"); // idle | sent

  function handlePhoneChange(e) {
    setForm((f) => ({ ...f, phone: formatRuPhone(e.target.value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || form.phone.replace(/\D/g, "").length < 10) return;
    // NOTE: wire this up to your booking/CRM endpoint.
    setStatus("sent");
  }

  return (
    <section
      id="booking"
      className="booking"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      <div className="booking__scrim" aria-hidden="true" />
      <div className="booking__card">
        {status === "sent" ? (
          <div className="booking__success">
            <h2 className="display-title booking__title">Заявка отправлена</h2>
            <p className="booking__subtitle">
              Спасибо! Менеджер F7 Travel свяжется с вами в ближайшее время.
            </p>
          </div>
        ) : (
          <>
            <h2 className="display-title booking__title">{data.title}</h2>
            <p className="booking__subtitle">{data.subtitle}</p>

            <form className="booking__form" onSubmit={handleSubmit} noValidate>
              <label className="booking__field">
                <span className="visually-hidden">Ваше имя</span>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </label>

              <label className="booking__field booking__field--phone">
                <span className="booking__flag" aria-hidden="true">
                  🇷🇺
                </span>
                <span className="booking__phone-prefix">+7</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="(000) 000-00-00"
                  autoComplete="tel-national"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  required
                />
              </label>

              <label className="booking__field">
                <span className="visually-hidden">Почта</span>
                <input
                  type="email"
                  placeholder="Почта"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </label>

              <p className="booking__consent">{data.consent}</p>

              <button type="submit" className="booking__submit">
                {data.submitLabel}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
