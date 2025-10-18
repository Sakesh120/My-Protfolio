document.addEventListener("DOMContentLoaded", function () {
  // Navbar toggle (defensive)
  const navToggle = document.getElementById("nav-toggle");
  const navRight = document.getElementById("nav-right");

  if (navToggle && navRight) {
    navToggle.addEventListener("click", () => {
      const isActive = navRight.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", String(isActive));
    });
  }

  if (window.Typed) {
    new Typed("#element", {
      strings: [
        "FrontEnd developer",
        "UI/UX designer",
        "Figma Design to code convertor",
      ],
      typeSpeed: 50,
      backSpeed: 40,
      loop: true,
    });
  }

  // Init AOS
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty("--mouse-x", x + "px");
      btn.style.setProperty("--mouse-y", y + "px");
    });
  });

  // removed 3D tilt interactions
});
