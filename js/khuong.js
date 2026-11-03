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
  menuToggle.setAttribute("aria-label", t(open ? "Đóng menu" : "Mở menu"));
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
// Ghi chú vai trò, khó khăn, bài học cho từng dự án (hiện trong cửa sổ mô tả)
const projectNotes = {
  banhcuon: {
    "Vai trò": "Dự án cá nhân: mình tự làm toàn bộ, từ thiết kế giao diện đến viết code và đăng tải lên Netlify.",
    "Khó khăn": "Làm giỏ hàng bằng JavaScript: cập nhật số lượng và tính lại tổng tiền mỗi khi khách thêm hoặc bớt món, đồng thời giữ giao diện gọn gàng trên màn hình điện thoại.",
    "Học được": "Cách dùng DOM và sự kiện để trang web tương tác được, cách chia nhỏ vấn đề thành từng bước để dễ sửa lỗi, và cách đưa một website lên mạng cho mọi người cùng xem."
  },
  portfolio: {
    "Vai trò": "Dự án cá nhân: mình tự làm toàn bộ, từ ý tưởng, thiết kế giao diện đến viết HTML, CSS và JavaScript.",
    "Khó khăn": "Làm cho trang hiển thị đẹp trên cả máy tính, máy tính bảng và điện thoại, đồng thời giữ chế độ sáng/tối và các hiệu ứng chạy mượt mà.",
    "Học được": "Cách dùng Flexbox và Grid để chia bố cục, cách dùng JavaScript để tạo menu, lọc dự án và kiểm tra form, và cách giữ code gọn gàng để dễ chỉnh sửa về sau."
  },
  group: {
    "Vai trò": "Trưởng nhóm: mình tự làm toàn bộ trang chủ của Nhóm 4, từ bố cục, giao diện đến code, rồi kết nối với trang cá nhân của từng thành viên.",
    "Khó khăn": "Thiết kế sao cho sáu thẻ thành viên đồng đều, dễ nhìn, và các liên kết dẫn đúng đến từng trang cá nhân.",
    "Học được": "Cách tổ chức một trang có nhiều liên kết, cách thống nhất giao diện chung cho cả nhóm, và cách điều phối công việc để các trang riêng khớp với trang chủ."
  },
  caro: {
    "Vai trò": "Dự án nhóm: mình phụ trách phần cơ sở dữ liệu và queue writer, tức hàng đợi ghi dữ liệu của game.",
    "Khó khăn": "Nhiều người chơi cùng gửi dữ liệu một lúc nên cần ghi vào cơ sở dữ liệu đúng thứ tự và không bị mất hay trùng.",
    "Học được": "Cách thiết kế và làm việc với cơ sở dữ liệu, cách dùng hàng đợi để xử lý nhiều yêu cầu cùng lúc, và cách phối hợp với các bạn phụ trách phần giao diện và kết nối mạng."
  }
};
const modal = document.querySelector("#project-modal");
document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const info = projectInfo[button.dataset.project];
    document.querySelector("#modal-title").textContent = t(info.title);
    document.querySelector("#modal-text").textContent = t(info.text);
    document.querySelector("#modal-notes").replaceChildren(...Object.entries(projectNotes[button.dataset.project]).map(([k, v]) => {
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = t(k);
      dd.textContent = t(v);
      row.append(dt, dd);
      return row;
    }));
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
  form.querySelector(`[data-for="${name}"]`).textContent = valid ? "" : t(rules[name].msg);
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
    status.textContent = t("Bạn hãy kiểm tra lại các trường được đánh dấu.");
    return;
  }
  status.textContent = t("Thông tin hợp lệ. Đây là bản demo nên lời nhắn chưa được gửi đi.");
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

// Slideshow ảnh ở banner: chỉ xoay vòng những ảnh tải được
window.addEventListener("load", () => {
  const slides = [...document.querySelectorAll(".arch .slide")];
  if (!slides.length) return;
  let current = 0;
  slides[0].classList.add("is-on");
  if (slides.length < 2 || reduceMotion) return;
  setInterval(() => {
    slides[current].classList.remove("is-on");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-on");
  }, 4000);
});

// Thẻ "vài điều thú vị": bấm để lật
document.querySelectorAll(".flip").forEach((card) => {
  card.addEventListener("click", () => {
    const flipped = card.classList.toggle("flipped");
    card.setAttribute("aria-pressed", String(flipped));
  });
});

// Thư viện ảnh: bấm để xem lớn
const lightbox = document.querySelector("#lightbox");
document.querySelectorAll(".shot").forEach((shot) => {
  shot.addEventListener("click", () => {
    const img = shot.querySelector("img");
    if (!img) return;
    document.querySelector("#lightbox-img").src = img.src;
    document.querySelector("#lightbox-img").alt = img.alt;
    document.querySelector("#lightbox-caption").textContent = shot.querySelector("figcaption")?.textContent ?? "";
    lightbox.showModal();
  });
});
document.querySelector("#lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });

// Cây lớn dần theo tiến trình cuộn, lá nở ở các mốc
const treeEl = document.querySelector(".tree");
const treeLeaves = treeEl.querySelectorAll(".t-leaf");
function growTree() {
  const max = root.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(scrollY / max, 1) : 0;
  treeEl.style.setProperty("--g", (0.08 + p * 0.92).toFixed(3));
  treeLeaves.forEach((leaf) => leaf.classList.toggle("on", p >= Number(leaf.dataset.at)));
}
window.addEventListener("scroll", growTree, { passive: true });
growTree();

// Bấm vào lá rơi để đọc một điều về mình
const leafFacts = [
  "Mình là trưởng nhóm của Nhóm 4 trong bài giữa kỳ này.",
  "Mình học ngành Công nghệ thông tin tại Đại học GTVT TP.HCM (UTH).",
  "Game cờ Caro của nhóm mình chơi được qua mạng nhờ giao thức TCP.",
  "Shop bánh cuốn là website đầu tay của mình, đang chạy thật trên Netlify.",
  "Trang này có phong cảnh ban ngày và ban đêm — thử bấm nút mặt trăng nhé!",
  "Mục tiêu của mình: trở thành Full-stack Developer."
];
const toast = document.querySelector("#leaf-toast");
let factIndex = 0, toastTimer;
document.querySelectorAll(".fall").forEach((leaf) => {
  leaf.addEventListener("click", () => {
    toast.textContent = t(leafFacts[factIndex++ % leafFacts.length]);
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4000);
  });
});

// Quiz: bạn là loài cây nào?
const trees = {
  tre: { name: "Cây tre", text: "Bạn mềm mỏng nhưng bền bỉ: gió lớn đến đâu cũng chỉ uốn mình rồi đứng thẳng lại. Bạn hợp với công việc nhóm và kiên trì theo đuổi mục tiêu dài hạn." },
  phuong: { name: "Phượng vĩ", text: "Bạn rực rỡ và giàu cảm xúc, thích tạo dấu ấn riêng. Bạn mang năng lượng tích cực đến cho mọi người xung quanh." },
  soi: { name: "Cây sồi", text: "Bạn chậm mà chắc, vững vàng và đáng tin cậy. Bạn thích xây nền tảng tốt trước khi bứt phá." },
  sen: { name: "Hoa sen", text: "Bạn điềm tĩnh, giữ được sự thanh thản dù hoàn cảnh ồn ào. Bạn học rất nhanh nhờ biết lắng nghe." }
};
const questions = [
  { q: "Cuối tuần lý tưởng của bạn?", a: [["Đi chơi cùng nhóm bạn", "phuong"], ["Ở nhà đọc sách, nghe nhạc", "sen"], ["Luyện một kỹ năng mới", "soi"], ["Đi dã ngoại, khám phá nơi mới", "tre"]] },
  { q: "Khi gặp khó khăn, bạn thường…", a: [["Bình tĩnh nghĩ cách", "sen"], ["Kiên trì thử đi thử lại", "tre"], ["Lên kế hoạch từng bước", "soi"], ["Nhờ bạn bè cùng giải quyết", "phuong"]] },
  { q: "Trong nhóm, bạn hay đóng vai trò…", a: [["Người truyền cảm hứng", "phuong"], ["Người điều phối, giữ nhịp", "soi"], ["Người hỗ trợ thầm lặng", "sen"], ["Người linh hoạt, việc gì cũng làm", "tre"]] },
  { q: "Bạn muốn mọi người nhớ về mình là…", a: [["Người đáng tin cậy", "soi"], ["Người vui vẻ, nhiều năng lượng", "phuong"], ["Người dịu dàng, thấu hiểu", "sen"], ["Người không bao giờ bỏ cuộc", "tre"]] }
];
const quizBox = document.querySelector("#quiz-box");
function renderQuiz(step = 0, score = {}) {
  quizBox.replaceChildren();
  if (step >= questions.length) {
    const best = Object.keys(trees).reduce((a, b) => ((score[b] || 0) > (score[a] || 0) ? b : a));
    const h = document.createElement("strong");
    h.textContent = `${t("Bạn giống: ")}${t(trees[best].name)}`;
    const p = document.createElement("p");
    p.textContent = t(trees[best].text);
    const again = document.createElement("button");
    again.type = "button";
    again.className = "btn";
    again.textContent = t("Làm lại");
    again.addEventListener("click", () => renderQuiz());
    quizBox.append(h, p, again);
    return;
  }
  const { q, a } = questions[step];
  const title = document.createElement("strong");
  title.textContent = `${t("Câu")} ${step + 1}/${questions.length}: ${t(q)}`;
  const list = document.createElement("div");
  list.className = "quiz-options";
  a.forEach(([label, key]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "filter";
    b.textContent = t(label);
    b.addEventListener("click", () => renderQuiz(step + 1, { ...score, [key]: (score[key] || 0) + 1 }));
    list.append(b);
  });
  quizBox.append(title, list);
}
renderQuiz();

// Đổi ngôn ngữ: dựng lại quiz, dịch lại thông báo lỗi form và đóng thông báo cũ
document.addEventListener("langchange", () => {
  renderQuiz();
  Object.keys(rules).forEach((name) => {
    if (form.elements[name].getAttribute("aria-invalid") === "true") validate(name);
  });
  status.textContent = "";
  toast.classList.remove("show");
});
