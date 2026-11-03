/**
 * ==========================================================================
 * PERSONAL PORTFOLIO WEBSITE - JAVASCRIPT
 * Developer: Đỗ Trung Kiên
 * Institution: Đại học Giao thông Vận tải TP.HCM (UTH)
 * Architecture: Vanilla JavaScript (ES6+), High Performance, Zero Dependencies
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       FEATURE 1: THEME TOGGLE (Dark & Light Mode with LocalStorage)
       ========================================================================== */
    const initThemeToggle = () => {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        if (!themeToggle || !themeIcon) return;

        const THEME_STORAGE_KEY = 'kien-portfolio-theme';

        const applyTheme = (theme) => {
            if (theme === 'light') {
                document.body.classList.add('light-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                document.body.classList.remove('light-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        };

        // Saved preference or system preference
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }

        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.contains('light-mode');
            const targetTheme = isLight ? 'dark' : 'light';
            applyTheme(targetTheme);
            try {
                localStorage.setItem(THEME_STORAGE_KEY, targetTheme);
            } catch (e) {
                console.warn('LocalStorage unavailable:', e);
            }
        });
    };

    /* ==========================================================================
       FEATURE 2: MOBILE HAMBURGER MENU
       ========================================================================== */
    const initMobileMenu = () => {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navLinks')?.parentElement;
        const mobileOverlay = document.getElementById('mobileOverlay');
        if (!hamburger || !navMenu || !mobileOverlay) return;

        let isMenuOpen = false;

        const openMenu = () => {
            isMenuOpen = true;
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            if (!isMenuOpen) return;
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', () => {
            if (isMenuOpen) closeMenu();
            else openMenu();
        });

        mobileOverlay.addEventListener('click', closeMenu);

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && isMenuOpen) {
                closeMenu();
            }
        });
    };

    /* ==========================================================================
       FEATURE 3: SCROLL PROGRESS BAR & FLOATING SCROLL TOP
       ========================================================================== */
    const initScrollIndicators = () => {
        const scrollProgress = document.getElementById('scrollProgress');
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        const header = document.getElementById('header');

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            // Update Progress Bar
            if (scrollProgress && docHeight > 0) {
                const percent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
                scrollProgress.style.width = percent + '%';
            }

            // Show/Hide Scroll to top button
            if (scrollTopBtn) {
                if (scrollTop > 350) {
                    scrollTopBtn.classList.add('show');
                } else {
                    scrollTopBtn.classList.remove('show');
                }
            }

            // Header shadow on scroll
            if (header) {
                header.classList.toggle('scrolled', scrollTop > 20);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    /* ==========================================================================
       FEATURE 4: SECTION SPY (Sync Navbar & Dossier TOC)
       ========================================================================== */
    const initSectionSpy = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.masthead-nav .nav-link');
        if (!sections.length || !navLinks.length) return;

        const updateActiveLinks = () => {
            const scrollHeaderOffset = 110;
            let currentSectionId = '';

            const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 70);

            if (isNearBottom) {
                currentSectionId = 'contact';
            } else if (window.scrollY < 120) {
                currentSectionId = 'hero';
            } else {
                sections.forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= scrollHeaderOffset && rect.bottom > scrollHeaderOffset) {
                        currentSectionId = section.getAttribute('id');
                    }
                });
            }

            if (currentSectionId) {
                navLinks.forEach((link) => {
                    const target = link.getAttribute('href');
                    if (target === `#${currentSectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        };

        window.addEventListener('scroll', updateActiveLinks, { passive: true });
        updateActiveLinks();
    };

    /* ==========================================================================
       FEATURE 5: DYNAMIC TYPING EFFECT
       ========================================================================== */
    const initTypingEffect = () => {
        const typingEl = document.getElementById('typingText');
        if (!typingEl) return;

        const PHRASES = [
            'Sinh viên Công nghệ Thông tin',
            'Nhiếp ảnh gia & Sáng tạo',
            'Sinh viên K24 · UTH'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        const type = () => {
            const currentPhrase = PHRASES[phraseIndex];

            if (isDeleting) {
                typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1600; // Pause at end of phrase
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % PHRASES.length;
                typingSpeed = 400; // Pause before new phrase
            }

            setTimeout(type, typingSpeed);
        };

        type();
    };

    /* ==========================================================================
       FEATURE 6: AMBIENT PARTICLE CANVAS
       ========================================================================== */
    const initParticleCanvas = () => {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const PARTICLE_COUNT = Math.min(50, Math.floor(width / 30));
        const particles = [];

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.alpha = Math.random() * 0.6 + 0.2;
                this.color = Math.random() > 0.5 ? '59, 130, 246' : '139, 92, 246';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        let animationFrameId;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    };

    /* ==========================================================================
       FEATURE 7: CUSTOM CURSOR FOLLOWER
       ========================================================================== */
    const initCustomCursor = () => {
        const dot = document.getElementById('cursorDot');
        const ring = document.getElementById('cursorRing');
        if (!dot || !ring) return;

        // Skip on touch or mobile
        if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
            return;
        }

        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        const renderRing = () => {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            ring.style.transform = `translate(${ringX - 17}px, ${ringY - 17}px)`;
            requestAnimationFrame(renderRing);
        };
        renderRing();

        // Enlarge on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .slide-item, .thumb-node');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                ring.style.width = '48px';
                ring.style.height = '48px';
                ring.style.borderColor = 'var(--brand-blue)';
            });
            el.addEventListener('mouseleave', () => {
                ring.style.width = '34px';
                ring.style.height = '34px';
                ring.style.borderColor = 'var(--border-accent)';
            });
        });
    };

    /* ==========================================================================
       FEATURE 8: SCROLL REVEAL ANIMATIONS (IntersectionObserver)
       ========================================================================== */
    const initScrollReveals = () => {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        revealElements.forEach((el) => observer.observe(el));
    };

    /* ==========================================================================
       FEATURE 9: SKILLS FILTER TABS & ANIMATED METERS
       ========================================================================== */
    const initSkillsFilter = () => {
        const filterBtns = document.querySelectorAll('.filter-tab-btn');
        const panels = document.querySelectorAll('.skill-category-panel');

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const targetCategory = btn.getAttribute('data-filter');

                filterBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                panels.forEach((panel) => {
                    const category = panel.getAttribute('data-category');
                    if (targetCategory === 'all' || category === targetCategory) {
                        panel.classList.remove('hidden');
                        panel.style.opacity = '1';
                    } else {
                        panel.classList.add('hidden');
                    }
                });
            });
        });
    };

    /* ==========================================================================
       FEATURE 10: PROJECT MODAL DATA & HANDLERS
       ========================================================================== */
    const initProjectModal = () => {
        const modal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDescription');
        const modalFeatures = document.getElementById('modalFeatures');
        const modalTech = document.getElementById('modalTech');
        const modalRole = document.getElementById('modalRole');
        const modalVisualBanner = document.getElementById('modalVisualBanner');
        const modalIcon = document.getElementById('modalIcon');
        const triggers = document.querySelectorAll('.project-modal-trigger');

        if (!modal) return;

        const PROJECTS_DATA = {
            1: {
                title: 'Website Quản lý Thư viện Online',
                desc: 'Hệ thống quản lý thư viện trực tuyến hỗ trợ toàn diện các nghiệp vụ tìm kiếm danh mục sách, đặt mượn sách, quản lý độc giả và lập phiếu thống kê dành cho thủ thư.',
                features: [
                    'Tra cứu sách nhanh chóng theo thể loại, tác giả và nhà xuất bản với bộ lọc trực quan',
                    'Đăng ký tài khoản độc giả và quản lý lịch sử mượn/trả sách cá nhân',
                    'Bảng điều khiển (Dashboard) dành cho thủ thư duyệt mượn và gửi thông báo nhắc hạn trả',
                    'Thống kê số lượng sách phổ biến và số lượng độc giả tích cực hàng tháng'
                ],
                tech: ['HTML5', 'CSS3', 'JavaScript ES6', 'PHP (OOP)', 'MySQL Database', 'Apache'],
                role: 'Đảm nhiệm toàn bộ quá trình thiết kế giao diện UI/UX người dùng, xây dựng cấu trúc cơ sở dữ liệu quan hệ MySQL và lập trình logic CRUD bằng PHP. Dự án giúp củng cố kiến thức kiến trúc MVC và bảo mật biểu mẫu người dùng.',
                icon: 'fa-book-reader',
                bannerGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
            },
            2: {
                title: 'TaskWeather - Quản lý công việc thông minh',
                desc: 'Ứng dụng lập kế hoạch và quản lý công việc hàng ngày kết hợp thông tin thời tiết địa phương theo thời gian thực, giúp người dùng sắp xếp hoạt động ngoài trời hợp lý.',
                features: [
                    'Giao diện kéo thả (Drag and Drop) nhiệm vụ theo mô hình bảng Kanban trực quan',
                    'Tích hợp OpenWeatherMap API tự động định vị và hiển thị thời tiết nơi người dùng sinh sống',
                    'Gợi ý thời điểm làm việc phù hợp dựa theo cảnh báo thời tiết (mưa, nắng gắt)',
                    'Lưu trữ dữ liệu ngoại tuyến (Offline Storage) đảm bảo không bị gián đoạn'
                ],
                tech: ['HTML5 Drag & Drop', 'CSS Flexbox/Grid', 'JavaScript ES6+', 'RESTful API', 'LocalStorage'],
                role: 'Phát triển ứng dụng từ ý tưởng thực tế: kết nối REST API bất đồng bộ với Async/Await, xử lý luồng sự kiện kéo thả mượt mà trên trình duyệt và thiết kế giao diện người dùng theo phong cách Neumorphism/Glassmorphism hiện đại.',
                icon: 'fa-cloud-sun-rain',
                bannerGradient: 'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)'
            }
        };

        const openModal = (projectId) => {
            const data = PROJECTS_DATA[projectId];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;

            // Features list
            modalFeatures.innerHTML = data.features.map((f) => `<li>${f}</li>`).join('');

            // Tech stack chips
            modalTech.innerHTML = data.tech.map((t) => `<span class="tech-chip">${t}</span>`).join('');

            // Role
            modalRole.textContent = data.role;

            // Banner style
            if (modalVisualBanner) modalVisualBanner.style.background = data.bannerGradient;
            if (modalIcon) modalIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;

            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        triggers.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-project');
                openModal(id);
            });
        });

        if (modalClose) modalClose.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    };

    /* ==========================================================================
       FEATURE 11: PHOTOGRAPHY SLIDESHOW & FULLSCREEN LIGHTBOX
       ========================================================================== */
    const initPhotographyShowcase = () => {
        const slides = document.querySelectorAll('.slideshow-stage .slide-item');
        const dots = document.querySelectorAll('.slideshow-pagination-dots .dot');
        const thumbs = document.querySelectorAll('.gallery-thumbs-row .thumb-node');
        const prevBtn = document.getElementById('slidePrev');
        const nextBtn = document.getElementById('slideNext');
        const counterEl = document.getElementById('slideCounter');

        // Lightbox elements
        const lightbox = document.getElementById('imageLightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');

        if (!slides.length) return;

        let currentIndex = 0;
        let slideTimer = null;

        const updateSlide = (newIndex) => {
            currentIndex = (newIndex + slides.length) % slides.length;

            slides.forEach((s, idx) => {
                s.classList.toggle('active', idx === currentIndex);
            });

            dots.forEach((d, idx) => {
                d.classList.toggle('active', idx === currentIndex);
            });

            thumbs.forEach((t, idx) => {
                t.classList.toggle('active', idx === currentIndex);
            });

            if (counterEl) {
                counterEl.textContent = `${currentIndex + 1} / ${slides.length}`;
            }
        };

        const nextSlide = () => updateSlide(currentIndex + 1);
        const prevSlide = () => updateSlide(currentIndex - 1);

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-slide'), 10);
                updateSlide(idx);
            });
        });

        thumbs.forEach((thumb) => {
            thumb.addEventListener('click', () => {
                const idx = parseInt(thumb.getAttribute('data-slide'), 10);
                updateSlide(idx);
            });
        });

        // Auto advance every 5s, paused on hover
        const startTimer = () => {
            slideTimer = setInterval(nextSlide, 5000);
        };
        const stopTimer = () => {
            if (slideTimer) clearInterval(slideTimer);
        };

        const stage = document.getElementById('slideshow');
        if (stage) {
            stage.addEventListener('mouseenter', stopTimer);
            stage.addEventListener('mouseleave', startTimer);
        }
        startTimer();

        // Lightbox Functions
        const openLightbox = (index) => {
            const activeSlide = slides[index];
            if (!activeSlide || !lightbox || !lightboxImg) return;

            const img = activeSlide.querySelector('img');
            const caption = activeSlide.getAttribute('data-caption') || `Ảnh ${index + 1}`;

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            if (lightboxCaption) lightboxCaption.textContent = caption;

            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            stopTimer();
        };

        const closeLightbox = () => {
            if (!lightbox) return;
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            startTimer();
        };

        slides.forEach((slide, idx) => {
            slide.addEventListener('click', () => {
                openLightbox(idx);
            });
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                updateSlide(currentIndex - 1);
                openLightbox(currentIndex);
            });
        }

        if (lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                updateSlide(currentIndex + 1);
                openLightbox(currentIndex);
            });
        }

        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (lightbox && lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') {
                    updateSlide(currentIndex + 1);
                    openLightbox(currentIndex);
                }
                if (e.key === 'ArrowLeft') {
                    updateSlide(currentIndex - 1);
                    openLightbox(currentIndex);
                }
            }
        });
    };

    /* ==========================================================================
       FEATURE 12: TOAST NOTIFICATIONS & QUICK COPY TO CLIPBOARD
       ========================================================================== */
    const showToast = (message, icon = 'fa-check-circle') => {
        const hub = document.getElementById('toastHub');
        if (!hub) return;

        const toast = document.createElement('div');
        toast.className = 'toast-item';
        toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
        hub.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    };

    const initClipboardButtons = () => {
        const copyBtns = document.querySelectorAll('[data-copy]');
        copyBtns.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const text = btn.getAttribute('data-copy');
                if (!text) return;

                try {
                    await navigator.clipboard.writeText(text);
                    showToast(`Đã sao chép: ${text}`);
                } catch (err) {
                    // Fallback for older browsers
                    const temp = document.createElement('textarea');
                    temp.value = text;
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand('copy');
                    document.body.removeChild(temp);
                    showToast(`Đã sao chép: ${text}`);
                }
            });
        });
    };

    /* ==========================================================================
       FEATURE 13: CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
       ========================================================================== */
    const initContactForm = () => {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const nameInput = document.getElementById('formName');
        const emailInput = document.getElementById('formEmail');
        const messageInput = document.getElementById('formMessage');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const submitBtn = document.getElementById('formSubmit');
        const formSuccess = document.getElementById('formSuccess');

        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const validateName = () => {
            const val = nameInput.value.trim();
            if (!val) {
                nameError.textContent = 'Vui lòng nhập họ và tên của bạn.';
                nameInput.style.borderColor = '#ef4444';
                return false;
            }
            nameError.textContent = '';
            nameInput.style.borderColor = '';
            return true;
        };

        const validateEmail = () => {
            const val = emailInput.value.trim();
            if (!val) {
                emailError.textContent = 'Vui lòng cung cấp địa chỉ email liên hệ.';
                emailInput.style.borderColor = '#ef4444';
                return false;
            }
            if (!EMAIL_REGEX.test(val)) {
                emailError.textContent = 'Định dạng email không hợp lệ (ví dụ: name@gmail.com).';
                emailInput.style.borderColor = '#ef4444';
                return false;
            }
            emailError.textContent = '';
            emailInput.style.borderColor = '';
            return true;
        };

        const validateMessage = () => {
            const val = messageInput.value.trim();
            if (!val) {
                messageError.textContent = 'Vui lòng nhập nội dung tin nhắn.';
                messageInput.style.borderColor = '#ef4444';
                return false;
            }
            if (val.length < 10) {
                messageError.textContent = 'Nội dung tin nhắn tối thiểu 10 ký tự.';
                messageInput.style.borderColor = '#ef4444';
                return false;
            }
            messageError.textContent = '';
            messageInput.style.borderColor = '';
            return true;
        };

        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMsgValid = validateMessage();

            if (!isNameValid || !isEmailValid || !isMsgValid) {
                showToast('Vui lòng kiểm tra lại thông tin biểu mẫu', 'fa-exclamation-circle');
                return;
            }

            // Simulate loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i><span>Đang gửi tin nhắn...</span>`;

            setTimeout(() => {
                formSuccess.classList.add('show');
                showToast('Tin nhắn gửi thành công!', 'fa-paper-plane');
                form.reset();

                submitBtn.disabled = false;
                submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i><span>Gửi tin nhắn đi</span>`;

                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            }, 800);
        });
    };

    /* ==========================================================================
       FEATURE 14: PROFILE HUB 3D TILT & EQUALIZER INTERACTION
       ========================================================================== */
    const initProfileHubEffects = () => {
        const profileCard = document.getElementById('profileCard');
        const equalizer = document.querySelector('.soundwave-equalizer');
        const vibeRibbon = document.querySelector('.creative-vibe-ribbon');

        if (profileCard && window.innerWidth >= 1024 && !window.matchMedia('(pointer: coarse)').matches) {
            let isHovering = false;

            profileCard.addEventListener('mouseenter', () => {
                isHovering = true;
                profileCard.style.transition = 'transform 0.12s ease-out';
            });

            profileCard.addEventListener('mousemove', (e) => {
                if (!isHovering) return;
                const rect = profileCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = -((y - centerY) / centerY) * 4;
                const rotateY = ((x - centerX) / centerX) * 4;

                profileCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
            });

            profileCard.addEventListener('mouseleave', () => {
                isHovering = false;
                profileCard.style.transition = 'transform 0.4s ease-out';
                profileCard.style.transform = 'none';
            });
        }

        // Equalizer interactive click
        if (vibeRibbon && equalizer) {
            let isPlaying = true;
            vibeRibbon.style.cursor = 'pointer';
            vibeRibbon.title = 'Nhấn để tạm dừng / tiếp tục hiệu ứng giai điệu';

            vibeRibbon.addEventListener('click', () => {
                isPlaying = !isPlaying;
                const bars = equalizer.querySelectorAll('.eq-bar');
                bars.forEach((bar) => {
                    bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
                });
                showToast(isPlaying ? '♫ Giai điệu sáng tạo: Đang phát' : '❚❚ Giai điệu sáng tạo: Tạm dừng', 'fa-music');
            });
        }
    };

    /* ==========================================================================
       INITIALIZE ALL MODULES
       ========================================================================== */
    initThemeToggle();
    initMobileMenu();
    initScrollIndicators();
    initSectionSpy();
    initTypingEffect();
    initParticleCanvas();
    initCustomCursor();
    initScrollReveals();
    initSkillsFilter();
    initProjectModal();
    initPhotographyShowcase();
    initClipboardButtons();
    initContactForm();
    initProfileHubEffects();
});
