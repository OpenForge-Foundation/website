/* global document, window, localStorage */
// Theme toggle + mobile nav. The initial theme is applied by an inline
// snippet in <head> to avoid a flash of the wrong theme.
(function () {
  const root = document.documentElement;

  function currentTheme() {
    const set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage unavailable — theme just won't persist */
      }
    });
  }

  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
