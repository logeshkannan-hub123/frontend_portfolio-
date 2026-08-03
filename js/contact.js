/**
 * ═══════════════════════════════════════════════════════
 *  Contact Form Handler
 *  File : js/contact.js
 *  ─ Client-side validation
 *  ─ Async fetch submission (no page reload)
 *  ─ Loading / success / error states
 *  ─ Duplicate submission prevention
 * ═══════════════════════════════════════════════════════
 */

(function () {
  "use strict";

  // ── Config ────────────────────────────────────────────
  // TODO: replace with your real Render backend URL once it's deployed,
  // e.g. "https://logesh-portfolio-server.onrender.com/api/contact"
  const RENDER_API_URL = "https://YOUR-RENDER-SERVICE.onrender.com/api/contact";

  // Local dev (server.js serving frontend + API together) can keep using a
  // relative path. Any other host (Vercel, etc.) needs the absolute Render URL
  // since the frontend and API are on different origins.
  const isLocalhost = ["localhost", "127.0.0.1"].includes(
    window.location.hostname,
  );
  const API_URL = isLocalhost ? "/api/contact" : RENDER_API_URL;

  // ── DOM refs ──────────────────────────────────────────
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("cf-submit");
  const feedback = document.getElementById("cf-feedback");

  if (!form || !submitBtn) return; // guard — no contact form on this page

  const fields = {
    name: document.getElementById("cf-name"),
    email: document.getElementById("cf-email"),
    phone: document.getElementById("cf-phone"),
    message: document.getElementById("cf-message"),
  };

  const errorEls = {
    name: document.getElementById("err-name"),
    email: document.getElementById("err-email"),
    phone: document.getElementById("err-phone"),
    message: document.getElementById("err-message"),
  };

  // ── Validation helpers ────────────────────────────────
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^[\d\s\+\-\(\)]{7,20}$/;

  /**
   * Validate all fields client-side.
   * Returns true when valid, false otherwise.
   */
  function validate() {
    let valid = true;

    const rules = [
      {
        key: "name",
        value: fields.name.value.trim(),
        checks: [
          [(v) => v.length === 0, "Full name is required."],
          [(v) => v.length < 2, "Name must be at least 2 characters."],
          [(v) => v.length > 100, "Name must not exceed 100 characters."],
          [
            (v) => !/^[a-zA-Z\s\-'.]+$/.test(v),
            "Name contains invalid characters.",
          ],
        ],
      },
      {
        key: "email",
        value: fields.email.value.trim(),
        checks: [
          [(v) => v.length === 0, "Email address is required."],
          [(v) => !EMAIL_RE.test(v), "Please enter a valid email address."],
        ],
      },
      {
        key: "phone",
        value: fields.phone.value.trim(),
        checks: [
          [(v) => v.length === 0, "Phone number is required."],
          [(v) => !PHONE_RE.test(v), "Please enter a valid phone number."],
          [
            (v) => v.replace(/\D/g, "").length < 10,
            "Phone number must have at least 10 digits.",
          ],
        ],
      },
      {
        key: "message",
        value: fields.message.value.trim(),
        checks: [
          [(v) => v.length === 0, "Message is required."],
          [(v) => v.length < 10, "Message must be at least 10 characters."],
          [(v) => v.length > 2000, "Message must not exceed 2000 characters."],
        ],
      },
    ];

    // Clear previous errors
    clearErrors();

    rules.forEach(({ key, value, checks }) => {
      for (const [test, msg] of checks) {
        if (test(value)) {
          setFieldError(key, msg);
          valid = false;
          break; // show only first error per field
        }
      }
    });

    return valid;
  }

  // ── Error display helpers ──────────────────────────────
  function setFieldError(key, msg) {
    errorEls[key].textContent = msg;
    errorEls[key].style.display = "block";
    fields[key].classList.add("input-error");
    fields[key].setAttribute("aria-invalid", "true");
  }

  function clearFieldError(key) {
    errorEls[key].textContent = "";
    errorEls[key].style.display = "none";
    fields[key].classList.remove("input-error");
    fields[key].removeAttribute("aria-invalid");
  }

  function clearErrors() {
    Object.keys(errorEls).forEach(clearFieldError);
    hideFeedback();
  }

  // ── Server field errors (from 422 response) ───────────
  function applyServerErrors(errors) {
    Object.entries(errors).forEach(([key, msg]) => {
      if (errorEls[key]) setFieldError(key, msg);
    });
  }

  // ── Form-level feedback banner ─────────────────────────
  function showFeedback(type, msg) {
    feedback.textContent = msg;
    feedback.className = `cf-feedback cf-feedback--${type}`;
    feedback.style.display = "block";
    // Scroll to feedback so mobile users see it
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideFeedback() {
    feedback.style.display = "none";
    feedback.className = "cf-feedback";
    feedback.textContent = "";
  }

  // ── Button state helpers ───────────────────────────────
  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.querySelector(".btn-text").style.display = isLoading
      ? "none"
      : "flex";
    submitBtn.querySelector(".btn-loading").style.display = isLoading
      ? "flex"
      : "none";
  }

  // ── Inline live-validation on blur ─────────────────────
  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("blur", () => {
      // Re-run full validate but only reveal error for this field
      const snapshot = {};
      Object.keys(errorEls).forEach((k) => {
        snapshot[k] = errorEls[k].textContent;
      });
      validate();
      // Restore other fields
      Object.keys(errorEls).forEach((k) => {
        if (k !== key) {
          if (!snapshot[k]) clearFieldError(k);
          else {
            errorEls[k].textContent = snapshot[k];
            errorEls[k].style.display = "block";
            fields[k].classList.add("input-error");
          }
        }
      });
    });

    // Remove error styling when user starts typing
    fields[key].addEventListener("input", () => clearFieldError(key));
  });

  // ── Submit handler ─────────────────────────────────────
  submitBtn.addEventListener("click", async () => {
    // 1. Client-side validation
    if (!validate()) return;

    // 2. Prevent duplicate submissions
    if (submitBtn.disabled) return;

    // 3. Set loading state
    setLoading(true);
    hideFeedback();

    // 4. Build payload
    const payload = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      message: fields.message.value.trim(),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ── Success ──
        showFeedback("success", "✅ " + data.message);
        // Reset form
        Object.values(fields).forEach((f) => {
          f.value = "";
        });
        clearErrors();
      } else if (res.status === 422 && data.errors) {
        // ── Validation errors from server ──
        applyServerErrors(data.errors);
        showFeedback("error", "⚠️ " + data.message);
      } else {
        // ── Server / network error ──
        showFeedback(
          "error",
          "❌ " + (data.message || "Something went wrong. Please try again."),
        );
      }
    } catch (err) {
      console.error("[Contact]", err);
      showFeedback(
        "error",
        "❌ Network error. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  });
})();
