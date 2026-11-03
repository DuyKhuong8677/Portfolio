// Hiệu ứng trang trí. Mọi hiệu ứng chuyển động đều tắt khi người dùng chọn "giảm chuyển động".
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const rand = (min, max) => min + Math.random() * (max - min);
  const SVG_NS = "http://www.w3.org/2000/svg";

  // Số liệu đếm lên khi cuộn tới
  const counters = document.querySelectorAll("[data-count]");
  if (!reduce && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const el = entry.target;
        const end = Number(el.dataset.count);
        const from = Number(el.dataset.from || 0);
        const start = performance.now();
        (function step(now) {
          const p = Math.min((now - start) / 1400, 1);
          el.textContent = Math.round(from + (end - from) * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(start);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => counterObserver.observe(el));
  }
  document.querySelectorAll(".stats .reveal").forEach((el, i) => el.style.setProperty("--delay", `${i * 0.1}s`));

  if (reduce) return;

  // Tên ở banner hiện từng chữ
  const title = document.querySelector(".hero h1");
  if (title) {
    const text = title.textContent;
    title.setAttribute("aria-label", text);
    title.textContent = "";
    let index = 0;
    const words = text.split(" ");
    words.forEach((word, w) => {
      const wordEl = document.createElement("span");
      wordEl.className = "word";
      wordEl.setAttribute("aria-hidden", "true");
      [...word].forEach((ch) => {
        const c = document.createElement("span");
        c.className = "char";
        c.textContent = ch;
        c.style.setProperty("--i", index++);
        wordEl.append(c);
      });
      title.append(wordEl);
      if (w < words.length - 1) title.append(" ");
    });
  }

  // Đom đóm bay ở chế độ tối
  const scene = document.querySelector(".scene");
  const fireflies = document.createElement("div");
  fireflies.className = "fireflies";
  fireflies.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 18; i++) {
    const f = document.createElement("i");
    const vars = {
      "--x": `${rand(2, 98)}vw`, "--y": `${rand(5, 95)}vh`,
      "--dur": `${rand(8, 16)}s`, "--delay": `${-rand(0, 12)}s`,
      "--mx": `${rand(-60, 60)}px`, "--my": `${rand(-80, 80)}px`
    };
    Object.entries(vars).forEach(([k, v]) => f.style.setProperty(k, v));
    fireflies.append(f);
  }
  scene.after(fireflies);

  // Bấm đâu, lá bung ra từ đó
  window.addEventListener("pointerdown", (e) => {
    for (let i = 0; i < 7; i++) {
      const leaf = document.createElementNS(SVG_NS, "svg");
      const angle = (i / 7) * Math.PI * 2 + rand(-0.3, 0.3);
      const dist = rand(50, 110);
      leaf.setAttribute("class", "burst");
      leaf.innerHTML = '<use href="#leaf"/>';
      leaf.style.left = `${e.clientX}px`;
      leaf.style.top = `${e.clientY}px`;
      leaf.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      leaf.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
      leaf.style.setProperty("--rot", `${rand(-200, 200)}deg`);
      if (i % 3 === 0) leaf.style.fill = "var(--accent)";
      leaf.addEventListener("animationend", () => leaf.remove());
      document.body.append(leaf);
    }
  });

  if (!fine) return;

  // Đom đóm nhỏ theo con trỏ
  let lastSpark = 0;
  window.addEventListener("pointermove", (e) => {
    const now = performance.now();
    if (now - lastSpark < 45) return;
    lastSpark = now;
    const spark = document.createElement("i");
    spark.className = "spark";
    spark.style.left = `${e.clientX}px`;
    spark.style.top = `${e.clientY}px`;
    spark.style.setProperty("--dx", `${rand(-15, 15)}px`);
    spark.style.setProperty("--dy", `${rand(10, 34)}px`);
    spark.addEventListener("animationend", () => spark.remove());
    document.body.append(spark);
  }, { passive: true });

  // Thẻ nghiêng 3D theo con trỏ, có vệt sáng
  document.querySelectorAll(".skill, .facts .card, .route-steps li, .project, .hobby").forEach((card) => {
    const glare = document.createElement("i");
    glare.className = "glare";
    card.classList.add("tilt");
    card.append(glare);
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.transition = "transform .12s ease-out, box-shadow .5s";
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg) translateY(-4px)`;
      card.style.setProperty("--gx", `${x * 100}%`);
      card.style.setProperty("--gy", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.transition = "";
      card.style.transform = "";
    });
  });

  // Nút bị con trỏ kéo nhẹ về phía mình
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("pointermove", (e) => {
      const r = button.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
      button.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    button.addEventListener("pointerleave", () => { button.style.transform = ""; });
  });
})();
