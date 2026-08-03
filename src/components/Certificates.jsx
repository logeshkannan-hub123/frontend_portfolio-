import { useEffect, useState } from "react";
import { certificates } from "../data";

function handleImgError(e) {
  e.target.style.display = "none";
  e.target.nextElementSibling.style.display = "flex";
}

export default function Certificates() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e) {
      if (e.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  return (
    <section id="certificates">
      <div className="container">
        <div style={{ marginBottom: "3rem" }} className="reveal">
          <p className="section-label">Achievements</p>
          <h2 className="section-title">Certificates</h2>
        </div>
        <div className="cert-grid reveal">
          {certificates.map((cert) => (
            <div
              className="cert-card"
              key={cert.title}
              onClick={() => setActive(cert)}
            >
              <div className="cert-img-wrap">
                <img src={cert.img} alt={cert.alt} onError={handleImgError} />
                <div className="cert-img-placeholder" style={{ display: "none" }}>
                  <i className={cert.icon}></i>
                </div>
                <div className="cert-overlay">
                  <span>
                    <i className="fas fa-expand-alt"></i> View Certificate
                  </span>
                </div>
              </div>
              <div className="cert-body">
                <div className="cert-title">{cert.title}</div>
                <div className="cert-issuer">{cert.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`cert-modal-backdrop${active ? " active" : ""}`}
        onClick={() => setActive(null)}
      >
        {active && (
          <div className="cert-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="cert-modal-close"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>
            <img src={active.img} alt={active.title} className="cert-modal-img" />
            <div className="cert-modal-info">
              <div className="cert-modal-title">{active.title}</div>
              <div className="cert-modal-issuer">{active.issuer}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
