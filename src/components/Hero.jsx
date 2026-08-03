export default function Hero() {
  return (
    <section id="home">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content reveal">
            <div className="hero-eyebrow">Available for opportunities</div>
            <h1 className="hero-name">
              Logesh
              <br />
              <span>Kannan</span>
            </h1>
            <p className="hero-title">Full Stack Developer · MCA Graduate</p>
            <p className="hero-bio">
              I build responsive, scalable web applications — from clean
              frontends to robust backends. Passionate about modern UI/UX,
              performance, and delivering real-world impact through code.
            </p>
            <div className="hero-ctas">
              <a href="#projects" className="btn-primary-cta">
                <i className="fas fa-code"></i> View Projects
              </a>
              <a href="#contact" className="btn-secondary-cta">
                <i className="fas fa-envelope"></i> Get in Touch
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-num">7+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div>
                <div className="stat-num">10+</div>
                <div className="stat-label">Technologies</div>
              </div>
              <div>
                <div className="stat-num">6+</div>
                <div className="stat-label">Certificates</div>
              </div>
            </div>
          </div>

          <div className="hero-image-wrap reveal">
            <div className="hero-ring">
              <div className="hero-ring-inner">
                <img
                  src="/assets/images/My-image.png"
                  alt="Logesh Kannan"
                  className="hero-avatar-placeholder"
                />
              </div>
            </div>
            <div className="hero-badge">
              <span className="hero-badge-icon">🎓</span>
              <div>
                <strong>MCA Graduate</strong>
                <span>Rathinam Technical Campus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
