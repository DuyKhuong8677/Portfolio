// Năm hiện tại ở footer
document.querySelector("#year").textContent = new Date().getFullYear();

const root = document.documentElement;
const header = document.querySelector(".header");
const toTop = document.querySelector("#to-top");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Chuyển giao diện sáng / tối, ghi nhớ lựa chọn
document.querySelector(".theme-toggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("khuong-theme", next); } catch (e) {}
});

// Menu di động
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
}
menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Cuộn trang: đổ bóng header, máy bay chạy theo tiến trình, hiện nút lên đầu trang
function onScroll() {
  const max = root.scrollHeight - innerHeight;
  header.classList.toggle("scrolled", scrollY > 8);
  header.style.setProperty("--p", max > 0 ? Math.min(scrollY / max, 1) : 0);
  toTop.classList.toggle("visible", scrollY > 500);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

// Độ trễ lần lượt cho các thẻ cùng nhóm
document.querySelectorAll(".skills, .facts, .projects, .route-steps").forEach((group) => {
  group.querySelectorAll(".reveal").forEach((el, i) => el.style.setProperty("--delay", `${i * 0.09}s`));
});
document.querySelectorAll(".hero-copy .reveal").forEach((el, i) => el.style.setProperty("--delay", `${i * 0.1}s`));

// Hiện phần tử khi cuộn tới, tô sáng mục menu theo phần đang xem
const revealTargets = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => revealObserver.observe(el));

  const links = document.querySelectorAll(".nav-links a");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));
} else {
  revealTargets.forEach((el) => el.classList.add("in"));
}

// Chân dung nghiêng nhẹ theo con trỏ
const portrait = document.querySelector(".portrait-wrap");
if (!reduceMotion) {
  portrait.addEventListener("pointermove", (e) => {
    const r = portrait.getBoundingClientRect();
    portrait.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
    portrait.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`);
  });
  portrait.addEventListener("pointerleave", () => {
    portrait.style.removeProperty("--rx");
    portrait.style.removeProperty("--ry");
  });
}

// Lọc dự án
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");
filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((b) => {
      b.classList.toggle("is-active", b === button);
      b.setAttribute("aria-pressed", String(b === button));
    });
    projects.forEach((card) => {
      card.classList.toggle("is-hidden", button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter);
    });
  });
});

// Cửa sổ mô tả dự án
const projectInfo = {
  banhcuon: {
    title: "Shop bánh cuốn",
    text: "Website bán bánh cuốn Quỳnh Chi - Bánh cuốn Tây Sơn với banner giới thiệu, mục sản phẩm nổi bật (bánh cuốn Tây Sơn, bánh cuốn đặc biệt, bún thịt nướng) và giỏ hàng. Viết bằng HTML, CSS và JavaScript, đăng tải trên Netlify.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  portfolio: {
    title: "Portfolio cá nhân",
    text: "Trang giới thiệu bản thân gồm banner, mục tiêu, kỹ năng, học vấn, dự án và form liên hệ. Có menu di động, chế độ sáng/tối, lọc dự án, cửa sổ mô tả, nút lên đầu trang và kiểm tra form bằng JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  group: {
    title: "Trang chủ Nhóm 4",
    text: "Trang giới thiệu nhóm và danh sách sáu thành viên; mỗi thẻ dẫn đến trang cá nhân. Có chế độ sáng/tối, hiệu ứng hover và bố cục responsive, viết bằng HTML, CSS và JavaScript thuần.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  caro: {
    title: "Game cờ Caro",
    text: "Game cờ Caro nhiều người chơi trên máy tính: kết nối tới máy chủ qua TCP, đăng nhập, xem danh sách người chơi online, mời đấu, xem trận, tính điểm và có khung trò chuyện/nhật ký.",
    tags: ["C#", "WinForms", "TCP"]
  }
};
const modal = document.querySelector("#project-modal");
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const info = projectInfo[button.dataset.project];
    document.querySelector("#modal-title").textContent = info.title;
    document.querySelector("#modal-text").textContent = info.text;
    document.querySelector("#modal-tags").replaceChildren(...info.tags.map((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      return li;
    }));
    modal.showModal();
  });
});
document.querySelector("#modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

// Form liên hệ: kiểm tra dữ liệu bằng JavaScript (chưa gửi đi đâu)
const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const rules = {
  name: { ok: (v) => v.length >= 2, msg: "Vui lòng nhập họ tên (ít nhất 2 ký tự)." },
  email: { ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), msg: "Vui lòng nhập email hợp lệ, ví dụ ten@example.com." },
  subject: { ok: (v) => v.length >= 3, msg: "Chủ đề cần có ít nhất 3 ký tự." },
  message: { ok: (v) => v.length >= 10, msg: "Nội dung cần có ít nhất 10 ký tự." }
};

function validate(name) {
  const input = form.elements[name];
  const valid = rules[name].ok(input.value.trim());
  input.setAttribute("aria-invalid", String(!valid));
  form.querySelector(`[data-for="${name}"]`).textContent = valid ? "" : rules[name].msg;
  return valid;
}

Object.keys(rules).forEach((name) => {
  form.elements[name].addEventListener("blur", () => validate(name));
  form.elements[name].addEventListener("input", () => {
    if (form.elements[name].getAttribute("aria-invalid") === "true") validate(name);
    status.textContent = "";
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allValid = Object.keys(rules).map(validate).every(Boolean);
  status.classList.toggle("is-error", !allValid);
  if (!allValid) {
    status.textContent = "Bạn hãy kiểm tra lại các trường được đánh dấu.";
    return;
  }
  status.textContent = "Thông tin hợp lệ. Đây là bản demo nên lời nhắn chưa được gửi đi.";
  form.reset();
});

// Lá rơi ở banner (tạo bằng JS, bỏ qua khi người dùng tắt chuyển động)
const leaves = document.querySelector(".leaves");
if (leaves && !reduceMotion) {
  const rand = (min, max) => min + Math.random() * (max - min);
  const height = leaves.offsetHeight + 80;
  for (let i = 0; i < 9; i++) {
    const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    leaf.setAttribute("class", "fall");
    leaf.innerHTML = '<use href="#leaf"/>';
    const vars = {
      "--x": `${rand(2, 96)}%`,
      "--size": `${rand(14, 30)}px`,
      "--dur": `${rand(11, 19)}s`,
      "--delay": `${-rand(0, 18)}s`,
      "--drift": `${rand(-60, 90)}px`,
      "--spin": `${rand(200, 520) * (i % 2 ? 1 : -1)}deg`,
      "--h": `${height}px`
    };
    Object.entries(vars).forEach(([k, v]) => leaf.style.setProperty(k, v));
    if (i % 3 === 0) leaf.style.setProperty("--c", "var(--accent)");
    leaves.append(leaf);
  }
}

// Phong cảnh nhiều lớp: lớp gần trôi nhanh hơn lớp xa khi cuộn
const scene = document.querySelector(".scene");
if (!reduceMotion) {
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      scene.style.setProperty("--shift", Math.min(scrollY * 0.06, 110));
      ticking = false;
    });
  }, { passive: true });
}

// Mục tiêu: đường bay vẽ dần khi cuộn tới
const routeSteps = document.querySelector(".route-steps");
if ("IntersectionObserver" in window) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("grow");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 }).observe(routeSteps);
} else {
  routeSteps.classList.add("grow");
}

// Chữ gõ tự chạy ở dòng định hướng
const typed = document.querySelector("#typed");
if (typed && !reduceMotion) {
  const text = typed.textContent;
  let n = 0, deleting = false;
  typed.setAttribute("aria-label", text);
  typed.textContent = "";
  (function tick() {
    n += deleting ? -1 : 1;
    typed.textContent = text.slice(0, n);
    let delay = deleting ? 45 : 90;
    if (!deleting && n === text.length) { deleting = true; delay = 2200; }
    else if (deleting && n === 0) { deleting = false; delay = 500; }
    setTimeout(tick, delay);
  })();
}
