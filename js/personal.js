// 1. Menu điều hướng cho màn hình nhỏ
const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// 2. Dark mode / Light mode; ghi nhớ lựa chọn trong trình duyệt
const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light-theme');
function updateThemeButton() {
  if (!themeToggle) return;
  themeToggle.textContent = document.body.classList.contains('light-theme') ? '☾ Giao diện sáng' : '☼ Giao diện tối';
}
updateThemeButton();
if (themeToggle) themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  updateThemeButton();
});

// 3. Lọc dự án theo danh mục
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => item.classList.toggle('active', item === button));
  projectCards.forEach((card) => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

// 4. Hiệu ứng xuất hiện khi cuộn trang
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

// 5. Kiểm tra dữ liệu form liên hệ ở phía trình duyệt
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const status = document.querySelector('#form-status');
  const fields = {
    name: { input: document.querySelector('#contact-name'), message: 'Vui lòng nhập họ tên (ít nhất 2 ký tự).' },
    email: { input: document.querySelector('#contact-email'), message: 'Vui lòng nhập địa chỉ email hợp lệ.' },
    subject: { input: document.querySelector('#contact-subject'), message: 'Chủ đề cần có ít nhất 3 ký tự.' },
    message: { input: document.querySelector('#contact-message'), message: 'Nội dung cần có ít nhất 10 ký tự.' }
  };
  function validateField(key) {
    const field = fields[key];
    const input = field.input;
    const value = input.value.trim();
    let valid = value.length > 0;
    if (key === 'name') valid = value.length >= 2;
    if (key === 'email') valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (key === 'subject') valid = value.length >= 3;
    if (key === 'message') valid = value.length >= 10;
    input.classList.toggle('invalid', !valid);
    input.setAttribute('aria-invalid', String(!valid));
    const error = document.querySelector(`[data-error="${key}"]`);
    error.textContent = valid ? '' : field.message;
    return valid;
  }
  Object.keys(fields).forEach((key) => fields[key].input.addEventListener('blur', () => validateField(key)));
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const isValid = Object.keys(fields).map(validateField).every(Boolean);
    status.classList.toggle('error', !isValid);
    if (!isValid) {
      status.textContent = 'Bạn hãy kiểm tra lại các trường được đánh dấu.';
      return;
    }
    status.textContent = 'Dữ liệu hợp lệ! Đây là form minh họa, chưa gửi email đến máy chủ.';
    contactForm.reset();
    Object.values(fields).forEach(({ input }) => {
      input.classList.remove('invalid');
      input.removeAttribute('aria-invalid');
    });
    Object.keys(fields).forEach((key) => { document.querySelector(`[data-error="${key}"]`).textContent = ''; });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
