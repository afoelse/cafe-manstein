/* =========================================================
   MANSTEIN — interactions
   ========================================================= */
(function () {
  "use strict";

  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navMobile = document.getElementById("nav-mobile");

  /* ---------- Header state: top (over hero) vs scrolled ---------- */
  const setHeaderState = () => {
    const scrolled = window.scrollY > window.innerHeight * 0.7 - 80;
    header.dataset.state = scrolled ? "scrolled" : "top";
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const closeMenu = () => {
    header.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Menü öffnen");
    navMobile.hidden = true;
  };
  const openMenu = () => {
    header.classList.add("menu-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Menü schließen");
    navMobile.hidden = false;
  };
  navToggle.addEventListener("click", () => {
    navMobile.hidden ? openMenu() : closeMenu();
  });
  navMobile.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", closeMenu)
  );

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));

    /* Stagger siblings within a grid for a refined cascade */
    document
      .querySelectorAll(".kitchen-grid, .menu-cols, .welcome-points")
      .forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          if (child.hasAttribute("data-reveal")) {
            child.style.transitionDelay = `${Math.min(i * 80, 360)}ms`;
          }
        });
      });
  } else {
    reveals.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = ["willkommen", "kueche", "karte", "galerie", "besuch"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = new Map();
  document.querySelectorAll(".nav-desktop a").forEach((a) => {
    const id = a.getAttribute("href").replace("#", "");
    navLinks.set(id, a);
  });

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((a) => a.classList.remove("active"));
            const active = navLinks.get(entry.target.id);
            if (active) active.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCaption = document.getElementById("lightbox-caption");
  let lastFocused = null;

  const openLightbox = (src, caption) => {
    lastFocused = document.activeElement;
    lbImg.setAttribute("src", src);
    lbImg.setAttribute("alt", caption || "");
    lbCaption.textContent = caption || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  };
  const closeLightbox = () => {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lbImg.setAttribute("src", "");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll("[data-lightbox-src]").forEach((el) => {
    el.addEventListener("click", () =>
      openLightbox(
        el.getAttribute("data-lightbox-src"),
        el.getAttribute("data-lightbox-caption")
      )
    );
  });
  lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) =>
    el.addEventListener("click", closeLightbox)
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Cookie consent ---------- */
  const CONSENT_KEY = "manstein_consent";
  const cookieBanner = document.getElementById("cookie-banner");
  const mapFrame = document.getElementById("map-frame");

  const loadMap = () => {
    if (mapFrame && mapFrame.dataset.src) {
      mapFrame.src = mapFrame.dataset.src;
    }
  };

  const blockMap = () => {
    if (!mapFrame) return;
    const wrap = mapFrame.closest(".visit-map");
    mapFrame.remove();
    if (!wrap) return;
    const ph = document.createElement("div");
    ph.className = "map-placeholder";
    ph.innerHTML =
      '<p>Kartenansicht deaktiviert.<br>' +
      '<a href="https://www.google.com/maps?q=Witzlebenstra%C3%9Fe+32%2C+14057+Berlin" ' +
      'target="_blank" rel="noopener noreferrer">Auf Google Maps öffnen ↗</a></p>';
    wrap.appendChild(ph);
  };

  const hideBanner = () => {
    if (!cookieBanner) return;
    cookieBanner.classList.remove("visible");
    cookieBanner.addEventListener("transitionend", () => {
      cookieBanner.hidden = true;
    }, { once: true });
  };

  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "all") {
    loadMap();
  } else if (stored === "necessary") {
    blockMap();
  } else {
    blockMap();
    setTimeout(() => {
      if (!cookieBanner) return;
      cookieBanner.hidden = false;
      requestAnimationFrame(() => cookieBanner.classList.add("visible"));
    }, 900);
  }

  document.getElementById("cookie-accept")?.addEventListener("click", () => {
    localStorage.setItem(CONSENT_KEY, "all");
    hideBanner();
    loadMap();
  });
  document.getElementById("cookie-decline")?.addEventListener("click", () => {
    localStorage.setItem(CONSENT_KEY, "necessary");
    hideBanner();
  });
})();
