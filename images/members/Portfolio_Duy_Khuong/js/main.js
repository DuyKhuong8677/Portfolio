// Portfolio interactions: mobile menu, dark mode, reveal, project filter, modal and form validation.
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks?.classList.toggle("open", !isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Mở menu" : "Đóng menu");
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Mở menu");
    });
  });

  // Dark mode toggle
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") body.classList.add("dark-theme");
  updateThemeIcon();

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    localStorage.setItem("portfolio-theme", body.classList.contains("dark-theme") ? "dark" : "light");
    updateThemeIcon();
  });

  function updateThemeIcon() {
    if (!themeToggle) return;
    const dark = body.classList.contains("dark-theme");
    themeToggle.textContent = dark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", dark ? "Bật giao diện sáng" : "Bật giao diện tối");
  }

  // Reveal elements as they enter the viewport
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Highlight the active navigation item while scrolling
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Back-to-top button
  window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // Project details modal
  const projectDetails = {
    portfolio: {
      title: "Personal Portfolio",
      description: "Website cá nhân giới thiệu bản thân, kỹ năng, hành trình học tập và dự án. Có menu responsive, chế độ sáng/tối, hiệu ứng xuất hiện khi cuộn và form kiểm tra dữ liệu.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive"]
    },
    game: {
      title: "Mini Game / Cờ Caro",
      description: "Ý tưởng ứng dụng mini game để thực hành thao tác DOM, xử lý sự kiện và logic thắng/thua. Khi hoàn thiện dự án, hãy bổ sung ảnh chụp màn hình và đường dẫn source code thật.",
      tech: ["JavaScript", "CSS Grid", "DOM Events"]
    },
    dashboard: {
      title: "Dashboard quản lý",
      description: "Concept giao diện dashboard gồm các thẻ thống kê và vùng biểu đồ minh họa. Đây là bản thiết kế giao diện mẫu, cần thay bằng dự án thực tế nếu bạn chưa triển khai chức năng.",
      tech: ["HTML", "CSS", "UI Design"]
    }
  };
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTech = document.getElementById("modalTech");
  document.querySelectorAll(".project-detail").forEach((button) => {
    button.addEventListener("click", () => {
      const data = projectDetails[button.dataset.project];
      if (!data || !modal) return;
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modalTech.replaceChildren(...data.tech.map((tech) => {
        const tag = document.createElement("span");
        tag.textContent = tech;
        return tag;
      }));
      if (typeof modal.showModal === "function") modal.showModal();
      else alert(`${data.title}\n\n${data.description}`);
    });
  });
  document.getElementById("modalClose")?.addEventListener("click", () => modal?.close());
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  // Contact form validation. This front-end demo validates locally; it does not send email to a server.
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");
  const fields = {
    fullName: { input: document.getElementById("fullName"), error: document.getElementById("nameError"), message: "Vui lòng nhập họ tên (ít nhất 2 ký tự)." },
    email: { input: document.getElementById("email"), error: document.getElementById("emailError"), message: "Vui lòng nhập địa chỉ email hợp lệ." },
    message: { input: document.getElementById("message"), error: document.getElementById("messageError"), message: "Lời nhắn cần có ít nhất 10 ký tự." }
  };

  function validateField(key) {
    const field = fields[key];
    if (!field?.input) return true;
    const value = field.input.value.trim();
    let valid = true;
    if (key === "fullName") valid = value.length >= 2;
    if (key === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    if (key === "message") valid = value.length >= 10;
    field.input.setAttribute("aria-invalid", String(!valid));
    field.error.textContent = valid ? "" : field.message;
    return valid;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].input?.addEventListener("input", () => {
      validateField(key);
      if (feedback) {
        feedback.textContent = "";
        feedback.classList.remove("error");
      }
    });
    fields[key].input?.addEventListener("blur", () => validateField(key));
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = Object.keys(fields).map(validateField).every(Boolean);
    if (!feedback) return;
    feedback.classList.toggle("error", !valid);
    if (!valid) {
      feedback.textContent = "Bạn hãy kiểm tra lại các trường được đánh dấu.";
      return;
    }
    feedback.textContent = "Thông tin hợp lệ! Đây là bản demo: form chưa gửi dữ liệu đến email hoặc máy chủ.";
    form.reset();
    Object.values(fields).forEach(({ input }) => input?.setAttribute("aria-invalid", "false"));
  });
});
