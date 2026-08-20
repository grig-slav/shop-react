import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import "../styles/scrollTop.css";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`scroll-top ${visible ? "scroll-top--visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх страницы"
    >
      <ChevronUp size={20} strokeWidth={2.25} />
    </button>
  );
}
