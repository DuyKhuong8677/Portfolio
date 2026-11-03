const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const themeToggle = document.querySelector("#theme-toggle");

function closeMenu() {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("is-open");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const savedTheme = localStorage.getItem("hiep-portfolio-theme");
const initialTheme = savedTheme === "light" || savedTheme === "dark"
  ? savedTheme
  : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    themeToggle.textContent = theme === "light" ? "☾ Giao diện" : "☼ Giao diện";
  }
}

setTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("hiep-portfolio-theme", nextTheme);
  setTheme(nextTheme);
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const revealElements = document.querySelectorAll(".reveal");
document.documentElement.classList.add("js-enabled");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const validationMessages = {
  name: "Vui lòng nhập họ tên (ít nhất 2 ký tự).",
  email: "Vui lòng nhập địa chỉ email hợp lệ.",
  subject: "Chủ đề cần có ít nhất 3 ký tự.",
  message: "Nội dung cần có ít nhất 10 ký tự."
};

function validateField(field) {
  const error = contactForm?.querySelector(`[data-error="${field.name}"]`);
  const isValid = field.validity.valid;

  field.setAttribute("aria-invalid", String(!isValid));
  if (error) error.textContent = isValid ? "" : validationMessages[field.name];
  return isValid;
}

if (contactForm && formStatus) {
  contactForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      validateField(field);
      formStatus.textContent = "";
      delete formStatus.dataset.state;
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...contactForm.querySelectorAll("input, textarea")];
    const isValid = fields.map(validateField).every(Boolean);

    if (!isValid) {
      formStatus.textContent = "Vui lòng kiểm tra lại các thông tin chưa hợp lệ.";
      formStatus.dataset.state = "error";
      fields.find((field) => !field.validity.valid)?.focus();
      return;
    }

    formStatus.textContent = "Thông tin hợp lệ. Đây là form mẫu nên chưa gửi email.";
    delete formStatus.dataset.state;
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());