const navToggle = document.getElementById("nav-toggle");
const navRight = document.getElementById("nav-right");

if (navToggle && navRight) {
  navToggle.addEventListener("click", () => {
    const isActive = navRight.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", String(isActive));
  });
}

document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navRight.contains(e.target)) {
    navRight.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    projects.forEach((project) => {
      if (
        category === "all" ||
        project.getAttribute("data-category") === category
      ) {
        project.style.display = "block";
        project.classList.add("aos-animate");
      } else {
        project.style.display = "none";
      }
    });
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(el => {
  observer.observe(el);
});