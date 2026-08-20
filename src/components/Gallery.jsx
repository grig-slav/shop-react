import "../styles/gallery.css";

/**
 * This is the single section in the design where the background image
 * uses `background-attachment: fixed` (a classic parallax effect: the
 * image stays put while the section's content scrolls over it).
 * Fixed backgrounds are intentionally used sparingly — just here —
 * both for performance and so the effect keeps its impact.
 */
export default function Gallery({ data }) {
  return (
    <section
      className="gallery-fixed"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      <div className="gallery-fixed__scrim" aria-hidden="true" />
      <figure className="gallery-fixed__card">
        <img src={data.featuredImage} alt={data.featuredCaption || "Карелия"} />
        {data.featuredCaption && (
          <figcaption className="visually-hidden">{data.featuredCaption}</figcaption>
        )}
      </figure>
    </section>
  );
}
