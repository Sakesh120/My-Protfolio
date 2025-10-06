// Navbar toggle for mobile
const navToggle = document.getElementById("nav-toggle");
const navRight = document.getElementById("nav-right");

navToggle.addEventListener("click", () => {
  navRight.classList.toggle("active");
  navToggle.setAttribute(
    "aria-expanded",
    navRight.classList.contains("active")
  );
});

// Optional: Button hover effect for dynamic background
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.backgroundPosition = `${x}px ${y}px`;
  });
});
