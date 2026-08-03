import { technicalSkills, softSkills } from "../data";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }} className="reveal">
          <p className="section-label">What I Work With</p>
          <h2 className="section-title">Skills &amp; Expertise</h2>
        </div>
        <div className="skills-layout">
          <div className="reveal">
            <p className="skill-group-title">
              <i className="fas fa-laptop-code" style={{ color: "var(--amber)" }}></i>
              Technical Skills
            </p>
            <div className="skill-chip-grid">
              {technicalSkills.map((skill) => (
                <div className="skill-chip" key={skill.label}>
                  <i className={skill.icon}></i> {skill.label}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <p className="skill-group-title">
              <i className="fas fa-users" style={{ color: "var(--amber)" }}></i>
              Professional Skills
            </p>
            {softSkills.map((skill) => (
              <div className="soft-skill-item" key={skill.label}>
                <i className={skill.icon}></i>
                <span>{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
