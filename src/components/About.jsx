export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text reveal">
            <p className="section-label">Who I Am</p>
            <h2 className="section-title">
              Crafting Digital
              <br />
              Experiences
            </h2>
            <p>
              I'm a Full Stack Developer with an MCA degree from Rathinam
              Technical Campus, Coimbatore. I specialize in building both the
              client-side and server-side of web applications — creating
              seamless, user-friendly experiences from database to browser.
            </p>
            <p>
              My development approach focuses on clean, maintainable code,
              responsive design, and performance optimization. I enjoy solving
              complex problems and continuously expanding my technical skill
              set.
            </p>
            <div className="about-highlights">
              <div className="highlight-card">
                <i className="fas fa-layer-group"></i>
                <h4>Full Stack</h4>
                <p>End-to-end web development from UI to database</p>
              </div>
              <div className="highlight-card">
                <i className="fas fa-mobile-alt"></i>
                <h4>Responsive</h4>
                <p>Mobile-first, pixel-perfect across all devices</p>
              </div>
              <div className="highlight-card">
                <i className="fas fa-bolt"></i>
                <h4>Performance</h4>
                <p>Optimized for speed and user experience</p>
              </div>
              <div className="highlight-card">
                <i className="fas fa-code-branch"></i>
                <h4>Clean Code</h4>
                <p>Readable, scalable, and maintainable codebase</p>
              </div>
            </div>
          </div>

          <div className="about-image-stack reveal">
            <img
              src="/assets/images/about-work.jpg"
              alt="No image found"
              className="about-img-placeholder"
            />
            <div className="about-accent-card">
              <div className="num">MCA</div>
              <div className="lbl">Master of Computer Applications · 2025</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
