import { useRef, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[\d\s+\-()]{7,20}$/;

// Vite env var (set VITE_API_URL in .env.production / Vercel project settings).
// Falls back to localhost for local dev against the combined server, and to a
// placeholder otherwise — replace with your real Render URL once deployed.
const API_URL =
  import.meta.env.VITE_API_URL ||
  (["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? "http://localhost:5000/api/contact"
    : "https://YOUR-RENDER-SERVICE.onrender.com/api/contact");

function validate(fields) {
  const errors = {};

  const name = fields.name.trim();
  if (!name) errors.name = "Full name is required.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 100) errors.name = "Name must not exceed 100 characters.";
  else if (!/^[a-zA-Z\s\-'.]+$/.test(name)) errors.name = "Name contains invalid characters.";

  const email = fields.email.trim();
  if (!email) errors.email = "Email address is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";

  const phone = fields.phone.trim();
  if (!phone) errors.phone = "Phone number is required.";
  else if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  else if (phone.replace(/\D/g, "").length < 10)
    errors.phone = "Phone number must have at least 10 digits.";

  const message = fields.message.trim();
  if (!message) errors.message = "Message is required.";
  else if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  else if (message.length > 2000) errors.message = "Message must not exceed 2000 characters.";

  return errors;
}

const emptyFields = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [fields, setFields] = useState(emptyFields);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type, msg }
  const feedbackRef = useRef(null);

  function updateField(key, value) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function handleBlur(key) {
    const fieldErrors = validate(fields);
    setErrors((e) => ({ ...e, [key]: fieldErrors[key] }));
  }

  async function handleSubmit() {
    const fieldErrors = validate(fields);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    if (loading) return;

    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({ type: "success", msg: "✅ " + data.message });
        setFields(emptyFields);
        setErrors({});
      } else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setFeedback({ type: "error", msg: "⚠️ " + data.message });
      } else {
        setFeedback({
          type: "error",
          msg: "❌ " + (data.message || "Something went wrong. Please try again."),
        });
      }
    } catch (err) {
      console.error("[Contact]", err);
      setFeedback({
        type: "error",
        msg: "❌ Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="reveal">
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title">
              Let's Work
              <br />
              Together
            </h2>
            <p>
              I'm currently open to full-time roles, freelance projects, and
              internship opportunities. If you have something exciting in
              mind, I'd love to hear about it.
            </p>
            <div className="contact-item">
              <div className="contact-item-icon">
                <i className="fas fa-user"></i>
              </div>
              <div className="contact-item-text">
                <strong>Name</strong>
                <span>Logesh Kannan</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-item-text">
                <strong>Phone</strong>
                <a href="tel:6385841491">+91 63858 41491</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-item-text">
                <strong>Email</strong>
                <a href="mailto:kannanlogeshkannan29@gmail.com">
                  kannanlogeshkannan29@gmail.com
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-item-text">
                <strong>Location</strong>
                <span>Rajapalayam, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cf-name">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="cf-name"
                    autoComplete="name"
                    maxLength={100}
                    placeholder="Logesh Kannan"
                    value={fields.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={errors.name ? "input-error" : ""}
                    aria-invalid={errors.name ? "true" : undefined}
                  />
                  <span className="field-error" style={{ display: errors.name ? "block" : "none" }}>
                    {errors.name}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="cf-email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    id="cf-email"
                    autoComplete="email"
                    maxLength={254}
                    placeholder="you@example.com"
                    value={fields.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={errors.email ? "input-error" : ""}
                    aria-invalid={errors.email ? "true" : undefined}
                  />
                  <span className="field-error" style={{ display: errors.email ? "block" : "none" }}>
                    {errors.email}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cf-phone">
                  Phone Number <span className="req">*</span>
                </label>
                <input
                  type="tel"
                  id="cf-phone"
                  autoComplete="tel"
                  maxLength={20}
                  placeholder="+91 63858 41491"
                  value={fields.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={errors.phone ? "input-error" : ""}
                  aria-invalid={errors.phone ? "true" : undefined}
                />
                <span className="field-error" style={{ display: errors.phone ? "block" : "none" }}>
                  {errors.phone}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="cf-message">
                  Message <span className="req">*</span>
                </label>
                <textarea
                  id="cf-message"
                  maxLength={2000}
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={fields.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={errors.message ? "input-error" : ""}
                  aria-invalid={errors.message ? "true" : undefined}
                ></textarea>
                <span className="field-error" style={{ display: errors.message ? "block" : "none" }}>
                  {errors.message}
                </span>
              </div>

              <button
                className="btn-submit"
                type="button"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="cf-spinner"></span> Sending…
                  </span>
                ) : (
                  <span className="btn-text">
                    <i className="fas fa-paper-plane"></i> Send Message
                  </span>
                )}
              </button>

              {feedback && (
                <div
                  ref={feedbackRef}
                  className={`cf-feedback cf-feedback--${feedback.type}`}
                  role="alert"
                  aria-live="polite"
                  style={{ display: "block" }}
                >
                  {feedback.msg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
