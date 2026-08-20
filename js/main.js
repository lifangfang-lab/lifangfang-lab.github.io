/* ============================================================
   Fangfang Li — Homepage interactions
   - mobile nav toggle
   - sticky header shadow on scroll
   - scrollspy: highlight the nav link of the section in view
   - auto-update footer year
   ============================================================ */

(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var yearEl = document.getElementById("year");

  /* ---- mobile nav toggle ---- */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close the menu after clicking a link (mobile)
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- header shadow on scroll ---- */
  function onScroll() {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- scrollspy ---- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  function spy() {
    var pos = window.scrollY + 90; // offset for sticky header
    var currentId = sections.length ? sections[0].id : null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) {
        currentId = sec.id;
      }
    });
    navAnchors.forEach(function (a) {
      var isActive = a.getAttribute("href") === "#" + currentId;
      a.classList.toggle("active", isActive);
    });
  }
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  /* ---- footer year ---- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
