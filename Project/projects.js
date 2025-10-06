// Navbar toggle (defensive)
const navToggle = document.getElementById("nav-toggle");
const navRight = document.getElementById("nav-right");

if (navToggle && navRight) {
  navToggle.addEventListener("click", () => {
    const isActive = navRight.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", String(isActive));
  });
}

// Project Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active from all buttons
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
