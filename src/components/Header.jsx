import { MessageCircle, Send, Phone } from "lucide-react";
import "../styles/header.css";

/**
 * @param {object} site - site.* slice of db.json
 * @param {boolean} transparent - true when laid over a hero image
 */
export default function Header({ site, transparent = false }) {
  return (
    <header className={`site-header ${transparent ? "site-header--transparent" : ""}`}>
      <div className="site-header__inner">
        <a href="/" className="site-header__logo" aria-label="F7 Travel — на главную">
          <span className="site-header__logo-mark">F7</span>
          <span className="site-header__logo-word">{site.logo.long}</span>
        </a>

        <nav className="site-header__nav" aria-label="Основная навигация">
          <ul>
            {site.nav.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a href={site.ctaNav.href} className="site-header__cta">
            {site.ctaNav.label}
          </a>
        </nav>

        <div className="site-header__contacts">
          <a
            href={site.socials.chat}
            className="site-header__icon-btn"
            aria-label="Написать в WhatsApp"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} strokeWidth={2} />
          </a>
          <a
            href={site.socials.telegram}
            className="site-header__icon-btn"
            aria-label="Написать в Telegram"
            target="_blank"
            rel="noreferrer"
          >
            <Send size={17} strokeWidth={2} />
          </a>
          <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="site-header__phone">
            <Phone size={15} strokeWidth={2} />
            {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
