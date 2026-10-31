document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement, KEY = 'portfolio-theme';
  const $ = (s, p = document) => p.querySelector(s), $$ = (s, p = document) => [...p.querySelectorAll(s)];

  
  const themeBtn = $('#themeBtn');
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  const setTheme = t => { root.dataset.theme = t; themeBtn.textContent = t === 'dark' ? '☀️' : '🌙'; };
  setTheme(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeBtn.addEventListener('click', () => {
    const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
  });

 
  const menu = $('#menu'), menuBtn = $('#menuBtn');
  const toggleMenu = open => { menu.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', open); menuBtn.textContent = open ? '✕' : '☰'; };
  menuBtn.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  
  const chips = $$('.chip');
  chips.forEach(c => c.addEventListener('click', () => {
    chips.forEach(x => x.classList.toggle('active', x === c));
    $$('.project').forEach(p => p.classList.toggle('hide', c.dataset.filter !== 'all' && p.dataset.cat !== c.dataset.filter));
  }));

  
  const fillBars = el => $$('.bar i', el).forEach(i => i.style.width = i.dataset.level + '%');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('show'); fillBars(e.target); io.unobserve(e.target); }
    }), { threshold: .15 });
    $$('.reveal').forEach(el => io.observe(el));
  } else { $$('.reveal').forEach(el => { el.classList.add('show'); fillBars(el); }); }

  
  const form = $('#contactForm'), ok = $('#formOk');
  const rules = {
    name: v => v.trim().length >= 2 || 'Nhập họ tên từ 2 ký tự trở lên.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Email chưa đúng, ví dụ: ten@gmail.com.',
    subject: v => v.trim().length >= 3 || 'Nhập chủ đề từ 3 ký tự trở lên.',
    message: v => v.trim().length >= 10 || 'Nội dung cần ít nhất 10 ký tự.'
  };
  const check = f => {
    const r = rules[f.name](f.value), bad = r !== true;
    f.classList.toggle('invalid', bad);
    f.setAttribute('aria-invalid', bad);
    f.parentElement.querySelector('.err').textContent = bad ? r : '';
    return !bad;
  };
  const fields = $$('input,textarea', form);
  fields.forEach(f => f.addEventListener('blur', () => check(f)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const valid = fields.map(check).every(Boolean);
    ok.hidden = !valid;
    if (valid) form.reset(); else fields.find(f => f.classList.contains('invalid')).focus();
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const b = document.getElementById('printBtn');
  if (b) b.addEventListener('click', () => window.print());
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.bar i').forEach(i => i.style.width = i.dataset.level + '%');
  });
});
