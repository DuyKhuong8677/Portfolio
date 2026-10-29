// Năm hiện tại ở footer
document.querySelector("#year").textContent = new Date().getFullYear();

// Chuyển giao diện sáng / tối, ghi nhớ lựa chọn
const root = document.documentElement;
document.querySelector(".theme-toggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("codecrew-theme", next); } catch (e) {}
});

// Header đổ bóng khi cuộn
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Đặt độ trễ lần lượt cho các thẻ, phần mở đầu và các mục "Về nhóm"
document.querySelectorAll(".coupons li").forEach((li, i) => li.style.setProperty("--delay", `${i * 0.1}s`));
document.querySelectorAll(".terms > *").forEach((el, i) => el.style.setProperty("--delay", `${i * 0.09}s`));
document.querySelectorAll(".intro .reveal").forEach((el, i) => el.style.setProperty("--delay", `${i * 0.1}s`));

// Ánh sáng lướt theo con trỏ trên thẻ lên tàu
document.querySelectorAll("a.coupon").forEach((coupon) => {
  coupon.addEventListener("pointermove", (e) => {
    const r = coupon.getBoundingClientRect();
    coupon.style.setProperty("--mx", `${e.clientX - r.left}px`);
    coupon.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
});

// Hiện phần tử khi cuộn tới
const revealTargets = document.querySelectorAll(".reveal, .reveal-group, .wallet");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => revealObserver.observe(el));

  // Tô sáng mục menu theo phần đang xem
  const navLinks = document.querySelectorAll(".nav-links a:not(.theme-toggle)");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));
} else {
  revealTargets.forEach((el) => el.classList.add("in"));
}

// Gạch chân nổi bật sau khi trang tải
requestAnimationFrame(() => document.querySelector(".mark")?.classList.add("on"));

// Máy bay đứng yên khi người dùng tắt chuyển động
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const sky = document.querySelector(".sky");
  sky.pauseAnimations();
  sky.setCurrentTime(8);
}
