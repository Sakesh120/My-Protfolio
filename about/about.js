const navToggle = document.getElementById("nav-toggle");
const navRight = document.getElementById("nav-right");

if (navToggle && navRight) {
  navToggle.addEventListener("click", () => {
    const isActive = navRight.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", String(isActive));
  });
}

document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navRight.contains(e.target)) {
    navRight.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.backgroundPosition = `${x}px ${y}px`;
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-card, .timeline-item").forEach((el) => {
  observer.observe(el);
});
