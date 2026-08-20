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

  /* ---- gallery lightbox ---- */
  var galleryItems = document.querySelectorAll(".gallery-item img");
  if (galleryItems.length) {
    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-label", "Photo viewer");
    lightbox.innerHTML =
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<img alt="">' +
      '<div class="lightbox-caption"></div>';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector(".lightbox-caption");
    var lbClose = lightbox.querySelector(".lightbox-close");

    function openLightbox(src, caption) {
      lbImg.src = src;
      lbCaption.textContent = caption || "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }

    galleryItems.forEach(function (img) {
      img.addEventListener("click", function () {
        var fig = img.closest(".gallery-item");
        var cap = fig ? fig.querySelector("figcaption") : null;
        openLightbox(img.src, cap ? cap.textContent : "");
      });
    });
    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }
})();
