import { education } from "../data";

export default function Education() {
  return (
    <section id="education">
      <div className="container">
        <div style={{ marginBottom: "3.5rem" }} className="reveal">
          <p className="section-label">Academic Background</p>
          <h2 className="section-title">Education</h2>
        </div>
        <div className="timeline reveal">
          {education.map((item) => (
            <div className="timeline-item" key={item.degree}>
              <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <div className="timeline-degree">{item.degree}</div>
                <div className="timeline-school">{item.school}</div>
                <div className="timeline-grade">{item.grade}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
