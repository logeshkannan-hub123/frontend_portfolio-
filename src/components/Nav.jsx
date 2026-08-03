import { useEffect, useState } from "react";
import { navLinks } from "../data";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    function onScroll() {
      let current = "";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.getAttribute("id");
        }
      });
      setActive(current);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <nav>
      <div className="nav-inner">
        <a href="#home" className="nav-logo">
          LK
        </a>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{ color: active === link.href.slice(1) ? "var(--amber)" : "" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMobileMenu}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
