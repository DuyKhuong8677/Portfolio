// Đánh dấu mục menu tương ứng với phần đang hiển thị
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const navContainer = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  },
  { rootMargin: "-35% 0px -55% 0px" },
);

sections.forEach((section) => sectionObserver.observe(section));

// Mở/đóng menu trên điện thoại
menuToggle.addEventListener("click", () => {
  const isOpen = navContainer.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navContainer.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Hiệu ứng xuất hiện khi cuộn đến nội dung
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

// Nút quay lại đầu trang
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 350);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Tự động cập nhật năm ở chân trang
document.getElementById("year").textContent = new Date().getFullYear();

// Form liên hệ
const contactForm = document.getElementById("contactForm");
const contactEmail = "donhuthuy17092021@gmail.com";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(
    `Tin nhắn từ portfolio - ${formData.get("name")}`,
  );
  const body = encodeURIComponent(
    `Họ tên: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\nNội dung:\n${formData.get("message")}`,
  );

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});
