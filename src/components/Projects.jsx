import { projects } from "../data";

function handleImgError(e) {
  e.target.style.display = "none";
  e.target.nextElementSibling.style.display = "flex";
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="reveal">
          <p className="section-label">My Work</p>
          <h2 className="section-title">Projects</h2>
          <p className="projects-intro">
            A selection of web projects showcasing frontend design, responsive
            layouts, and full-stack development skills.
          </p>
        </div>

        <div className="project-grid reveal">
          {projects.map((project) => (
            <div className="project-card" key={project.name}>
              <div className="project-img-wrap">
                <img
                  src={project.img}
                  alt={project.alt}
                  onError={handleImgError}
                />
                <div className="project-img-placeholder" style={{ display: "none" }}>
                  {project.emoji}
                </div>
                <div className="project-overlay">
                  <a
                    href={project.link}
                    target={project.external ? "_blank" : undefined}
                    rel={project.external ? "noopener noreferrer" : undefined}
                  >
                    <i className="fas fa-external-link-alt"></i>{" "}
                    {project.external ? "View Live" : "View Project"}
                  </a>
                </div>
              </div>
              <div className="project-body">
                <p className="project-tag">{project.tag}</p>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-techs">
                  {project.techs.map((tech) => (
                    <span className="tech-pill" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
