/**
 * ==========================================================================
 * PERSONAL PORTFOLIO WEBSITE - JAVASCRIPT
 * Developer: Đỗ Trung Kiên
 * University: Đại học Giao thông Vận tải TP.HCM (UTH)
 * Architecture: Vanilla JavaScript (ES6+), Zero External Dependencies
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       FEATURE 1: THEME TOGGLE (Dark / Light Mode)
       ========================================================================== */
    const initThemeToggle = () => {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        if (!themeToggle || !themeIcon) return;

        const THEME_STORAGE_KEY = 'theme';

        // Apply theme helper
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

        // Load saved preference on initialization
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            // Default is dark mode according to design spec
            applyTheme('dark');
        }

        // Toggle on click
        themeToggle.addEventListener('click', () => {
            const isCurrentlyLight = document.body.classList.contains('light-mode');
            const nextTheme = isCurrentlyLight ? 'dark' : 'light';
            applyTheme(nextTheme);
            try {
                localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            } catch (e) {
                console.warn('LocalStorage unavailable for theme persistence.', e);
            }
        });
    };

    /* ==========================================================================
       FEATURE 2: MOBILE HAMBURGER MENU
       ========================================================================== */
    const initMobileMenu = () => {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const mobileOverlay = document.getElementById('mobileOverlay');
        if (!hamburger || !navLinks || !mobileOverlay) return;

        let isMenuOpen = false;

        const openMenu = () => {
            isMenuOpen = true;
            hamburger.classList.add('active');
            navLinks.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
        };

        const closeMenu = () => {
            if (!isMenuOpen) return;
            isMenuOpen = false;
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        };

        hamburger.addEventListener('click', () => {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close when clicking overlay
        mobileOverlay.addEventListener('click', closeMenu);

        // Close menu when any nav link is clicked
        const navAnchorLinks = navLinks.querySelectorAll('a');
        navAnchorLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        // Auto close when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    };

    /* ==========================================================================
       FEATURE 3: STICKY HEADER & SCROLL EFFECTS
       FEATURE 6: SCROLL PROGRESS BAR
       FEATURE 7: SCROLL TO TOP BUTTON
       FEATURE 4: ACTIVE NAV LINK ON SCROLL
       (Unified in a high-performance scroll handler with requestAnimationFrame)
       ========================================================================== */
    const initScrollFeatures = () => {
        const header = document.getElementById('header');
        const scrollProgress = document.getElementById('scrollProgress');
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        const sections = document.querySelectorAll('section[id]');

        let ticking = false;

        // Sticky Header update
        const updateStickyHeader = (scrollY) => {
            if (!header) return;
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        // Scroll progress bar update
        const updateScrollProgress = (scrollY) => {
            if (!scrollProgress) return;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            const clamped = Math.min(100, Math.max(0, progress));
            scrollProgress.style.width = `${clamped}%`;
        };

        // Scroll to top button visibility
        const updateScrollTopBtn = (scrollY) => {
            if (!scrollTopBtn) return;
            if (scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        };

        // Active nav link based on scroll position
        const updateActiveNav = (scrollY) => {
            if (!navLinks.length || !sections.length) return;

            const HEADER_OFFSET = 100;
            const scrollPos = scrollY + HEADER_OFFSET;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Edge case: when user reaches the very bottom of the document
            if (scrollY + windowHeight >= docHeight - 40) {
                const lastSection = sections[sections.length - 1];
                if (lastSection) {
                    setActiveLink(lastSection.getAttribute('id'));
                    return;
                }
            }

            let currentSectionId = '';
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            // Edge case: at the very top of page
            if (!currentSectionId && sections[0] && scrollY < sections[0].offsetHeight) {
                currentSectionId = sections[0].getAttribute('id');
            }

            if (currentSectionId) {
                setActiveLink(currentSectionId);
            }
        };

        const setActiveLink = (sectionId) => {
            navLinks.forEach((link) => {
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };

        // Unified tick function
        const onScrollTick = () => {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            updateStickyHeader(scrollY);
            updateScrollProgress(scrollY);
            updateScrollTopBtn(scrollY);
            updateActiveNav(scrollY);
            ticking = false;
        };

        // Scroll listener using requestAnimationFrame for 60fps performance
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(onScrollTick);
                ticking = true;
            }
        }, { passive: true });

        // Scroll to top button click event
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Run once on load
        onScrollTick();
    };

    /* ==========================================================================
       FEATURE 5: SMOOTH SCROLL (Account for fixed header height: 80px)
       ========================================================================== */
    const initSmoothScroll = () => {
        const FIXED_HEADER_HEIGHT = 80;

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#' || href === '#!') return;

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - FIXED_HEADER_HEIGHT;

                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: 'smooth'
                    });

                    // Update URL without harsh jumping
                    if (window.history && window.history.pushState) {
                        window.history.pushState(null, '', href);
                    }
                }
            });
        });
    };

    /* ==========================================================================
       FEATURE 8: TYPING EFFECT (Hero Section)
       ========================================================================== */
    const initTypingEffect = () => {
        const typingText = document.getElementById('typingText');
        if (!typingText) return;

        const phrases = [
            'Full-stack Developer',
            'Photography Lover'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timer = null;

        const TYPE_DELAY = 100;
        const DELETE_DELAY = 50;
        const PAUSE_COMPLETE = 2000;
        const PAUSE_EMPTY = 300;

        const typeStep = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                charIndex--;
                typingText.textContent = currentPhrase.substring(0, charIndex);

                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    timer = setTimeout(typeStep, PAUSE_EMPTY);
                    return;
                }
                timer = setTimeout(typeStep, DELETE_DELAY);
            } else {
                charIndex++;
                typingText.textContent = currentPhrase.substring(0, charIndex);

                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    timer = setTimeout(typeStep, PAUSE_COMPLETE);
                    return;
                }
                timer = setTimeout(typeStep, TYPE_DELAY);
            }
        };

        // Start typing
        typeStep();

        // Cleanup on unload if needed
        window.addEventListener('beforeunload', () => {
            if (timer) clearTimeout(timer);
        });
    };

    /* ==========================================================================
       FEATURE 9: PARTICLE BACKGROUND (Canvas)
       ========================================================================== */
    const initParticleBackground = () => {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId = null;
        let width = 0;
        let height = 0;
        let particles = [];

        const MAX_CONNECT_DISTANCE = 150;
        const PARTICLE_COLOR = 'rgba(102, 126, 234, 0.5)';
        const LINE_COLOR_BASE = 'rgba(102, 126, 234, ';

        // Mouse interaction state
        const mouse = {
            x: null,
            y: null,
            radius: 120
        };

        // Resize handler
        const resizeCanvas = () => {
            const parent = canvas.parentElement || document.body;
            width = canvas.width = parent.offsetWidth || window.innerWidth;
            height = canvas.height = parent.offsetHeight || window.innerHeight;
            createParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 1.5 + 1.2; // 1.2px - 2.7px
                this.baseVx = this.vx;
                this.baseVy = this.vy;
            }

            update() {
                // Gentle bounce off boundaries
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;

                // Mouse subtle repulsion
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < mouse.radius && dist > 0) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        const pushX = (dx / dist) * force * 1.2;
                        const pushY = (dy / dist) * force * 1.2;
                        this.x += pushX;
                        this.y += pushY;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = PARTICLE_COLOR;
                ctx.fill();
            }
        }

        const createParticles = () => {
            particles = [];
            // Target ~80 particles on desktop, scale down for smaller viewports
            const targetCount = width < 768 ? 35 : Math.min(80, Math.floor((width * height) / 11000));
            const count = Math.max(25, targetCount);

            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const drawLines = () => {
            const count = particles.length;
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < MAX_CONNECT_DISTANCE) {
                        const alpha = (1 - distance / MAX_CONNECT_DISTANCE) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `${LINE_COLOR_BASE}${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            drawLines();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Mouse listeners on hero / canvas
        const heroSection = canvas.closest('.hero') || canvas;

        heroSection.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('resize', () => {
            resizeCanvas();
        }, { passive: true });

        // Pause animation when page is hidden to conserve battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
            } else {
                animate();
            }
        });

        // Initialize
        resizeCanvas();
        animate();
    };

    /* ==========================================================================
       FEATURE 10: CUSTOM CURSOR (Desktop Only)
       ========================================================================== */
    const initCustomCursor = () => {
        const cursor = document.getElementById('cursor');
        const cursorFollower = document.getElementById('cursorFollower');
        if (!cursor || !cursorFollower) return;

        // Check if device supports fine hover pointer and width >= 768px
        const isTouchOrSmall = () => {
            return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
        };

        if (isTouchOrSmall()) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
            return;
        }

        let mouseX = -100;
        let mouseY = -100;
        let followerX = -100;
        let followerY = -100;
        let isCursorVisible = false;

        // Interactive element selector
        const INTERACTIVE_SELECTORS = 'a, button, input, textarea, select, .project-card, .tilt-card, .dot, .slide-btn, .theme-toggle, .hamburger, [role="button"]';

        document.addEventListener('mousemove', (e) => {
            if (isTouchOrSmall()) return;

            mouseX = e.clientX;
            mouseY = e.clientY;

            // Direct update for the sharp center dot
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            if (!isCursorVisible) {
                cursor.style.opacity = '1';
                cursorFollower.style.opacity = '1';
                followerX = mouseX;
                followerY = mouseY;
                isCursorVisible = true;
            }
        });

        // Smooth trailing animation loop for follower circle
        const renderFollower = () => {
            if (!isTouchOrSmall() && isCursorVisible) {
                // Smooth interpolation (LERP: 0.16)
                followerX += (mouseX - followerX) * 0.16;
                followerY += (mouseY - followerY) * 0.16;
                cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
            }
            requestAnimationFrame(renderFollower);
        };
        requestAnimationFrame(renderFollower);

        // Hover scale effects using event delegation for reliable performance
        document.addEventListener('mouseover', (e) => {
            if (isTouchOrSmall()) return;
            const target = e.target.closest(INTERACTIVE_SELECTORS);
            if (target) {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (isTouchOrSmall()) return;
            const target = e.target.closest(INTERACTIVE_SELECTORS);
            if (target) {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-hover');
            }
        });

        // Hide when mouse exits window viewport
        document.documentElement.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
            isCursorVisible = false;
        });

        document.documentElement.addEventListener('mouseenter', () => {
            if (!isTouchOrSmall()) {
                cursor.style.opacity = '1';
                cursorFollower.style.opacity = '1';
                isCursorVisible = true;
            }
        });

        // Handle resize events dynamically
        window.addEventListener('resize', () => {
            if (isTouchOrSmall()) {
                cursor.style.display = 'none';
                cursorFollower.style.display = 'none';
            } else {
                cursor.style.display = 'block';
                cursorFollower.style.display = 'block';
            }
        });
    };

    /* ==========================================================================
       FEATURE 11: SCROLL ANIMATIONS (Intersection Observer)
       ========================================================================== */
    const initScrollAnimations = () => {
        const animElements = document.querySelectorAll('.animate-on-scroll');
        if (!animElements.length) return;

        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            animElements.forEach((el) => el.classList.add('animated'));
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.12
        };

        const animObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animElements.forEach((el) => {
            animObserver.observe(el);
        });
    };

    /* ==========================================================================
       FEATURE 12: SKILL BAR PROGRESS ANIMATION
       ========================================================================== */
    const initSkillBars = () => {
        const skillCategories = document.querySelectorAll('.skill-category');
        const skillProgressBars = document.querySelectorAll('.skill-progress[data-width]');
        if (!skillProgressBars.length) return;

        const animateCategoryBars = (category) => {
            const bars = category.querySelectorAll('.skill-progress[data-width]');
            bars.forEach((bar) => {
                const targetWidth = bar.getAttribute('data-width');
                if (targetWidth) {
                    bar.style.width = `${targetWidth}%`;
                }
            });
        };

        if (!('IntersectionObserver' in window)) {
            // Fallback
            skillProgressBars.forEach((bar) => {
                const width = bar.getAttribute('data-width');
                if (width) bar.style.width = `${width}%`;
            });
            return;
        }

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCategoryBars(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        skillCategories.forEach((category) => {
            skillObserver.observe(category);
        });
    };

    /* ==========================================================================
       FEATURE 13: PROJECT MODAL
       ========================================================================== */
    const initProjectModal = () => {
        const projectModal = document.getElementById('projectModal');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');

        // Modal Content Targets
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalFeatures = document.getElementById('modalFeatures');
        const modalTech = document.getElementById('modalTech');
        const modalRole = document.getElementById('modalRole');
        const modalImage = document.getElementById('modalImage');
        const modalDemo = document.getElementById('modalDemo');
        const modalSource = document.getElementById('modalSource');

        if (!projectModal || !modalOverlay || !modalClose) return;

        // Project dataset specification
        const projectsData = {
            1: {
                title: 'Website Quản lý Thư viện Online',
                description: 'Hệ thống quản lý mượn/trả sách trực tuyến được thiết kế dành cho sinh viên và thủ thư. Ứng dụng giúp số hóa quy trình quản lý thư viện, từ việc tìm kiếm sách, đăng ký mượn, đến theo dõi lịch sử mượn/trả và thống kê.',
                features: [
                    'Tìm kiếm sách theo tên, tác giả, thể loại',
                    'Đăng ký mượn/trả sách trực tuyến',
                    'Quản lý tài khoản người dùng (sinh viên, thủ thư)',
                    'Thống kê số liệu mượn/trả theo thời gian',
                    'Giao diện responsive, thân thiện người dùng'
                ],
                tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
                role: 'Đảm nhận vai trò Full-stack Developer, thiết kế giao diện và xây dựng backend. Qua dự án này, tôi đã học được cách tổ chức cơ sở dữ liệu quan hệ, xử lý CRUD operations và triển khai hệ thống xác thực người dùng.',
                image: 'linear-gradient(135deg, #667eea, #764ba2)',
                icon: 'fas fa-book-open',
                demoLink: '#',
                sourceLink: '#'
            },
            2: {
                title: 'TaskWeather - Quản lý công việc thông minh',
                description: 'Ứng dụng quản lý công việc (Todo App) tích hợp thông tin thời tiết real-time. Người dùng có thể tạo, sửa, xóa task, kéo thả để sắp xếp thứ tự ưu tiên, đồng thời xem thông tin thời tiết để lên kế hoạch hoạt động ngoài trời.',
                features: [
                    'CRUD tasks với giao diện trực quan',
                    'Kéo thả (Drag & Drop) để sắp xếp thứ tự',
                    'Tích hợp API thời tiết real-time',
                    'Lọc task theo trạng thái (hoàn thành/chưa)',
                    'Lưu trữ dữ liệu với localStorage',
                    'Giao diện Dark/Light mode'
                ],
                tech: ['HTML5', 'CSS3', 'JavaScript', 'REST API', 'LocalStorage'],
                role: 'Tự phát triển toàn bộ ứng dụng từ thiết kế UI đến triển khai logic. Dự án giúp tôi nắm vững JavaScript DOM manipulation, Drag & Drop API, Fetch API để gọi REST endpoints, và quản lý state với localStorage.',
                image: 'linear-gradient(135deg, #f093fb, #f5576c)',
                icon: 'fas fa-tasks',
                demoLink: '#',
                sourceLink: '#'
            }
        };

        const openModal = (projectId) => {
            const project = projectsData[projectId];
            if (!project) return;

            // Fill text details
            if (modalTitle) modalTitle.textContent = project.title;
            if (modalDescription) modalDescription.textContent = project.description;
            if (modalRole) modalRole.textContent = project.role;

            // Fill features list
            if (modalFeatures) {
                modalFeatures.innerHTML = '';
                project.features.forEach((feature) => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });
            }

            // Fill tech tags
            if (modalTech) {
                modalTech.innerHTML = '';
                project.tech.forEach((tag) => {
                    const span = document.createElement('span');
                    span.className = 'tech-tag';
                    span.textContent = tag;
                    modalTech.appendChild(span);
                });
            }

            // Fill image and icon
            if (modalImage) {
                modalImage.style.background = project.image;
                modalImage.innerHTML = `<i class="${project.icon}"></i>`;
            }

            // Fill links
            if (modalDemo) modalDemo.setAttribute('href', project.demoLink || '#');
            if (modalSource) modalSource.setAttribute('href', project.sourceLink || '#');

            // Open modal and lock scroll
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Attach clicks to project cards and view detail buttons
        const projectCards = document.querySelectorAll('.project-card[data-project]');
        projectCards.forEach((card) => {
            card.addEventListener('click', (e) => {
                // If user clicked directly on source/demo anchor, don't hijack
                if (e.target.closest('.project-link')) return;

                const projectId = card.getAttribute('data-project');
                if (projectId) openModal(projectId);
            });
        });

        const viewButtons = document.querySelectorAll('.project-view-btn[data-project]');
        viewButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = btn.getAttribute('data-project');
                if (projectId) openModal(projectId);
            });
        });

        // Close handlers
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Escape key close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                closeModal();
            }
        });
    };

    /* ==========================================================================
       FEATURE 14: SLIDESHOW (Hobbies Section)
       ========================================================================== */
    const initSlideshow = () => {
        const slideshow = document.getElementById('slideshow');
        if (!slideshow) return;

        const slides = slideshow.querySelectorAll('.slide');
        const prevBtn = document.getElementById('slidePrev');
        const nextBtn = document.getElementById('slideNext');
        const dotsContainer = document.getElementById('slideshowDots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

        if (!slides.length) return;

        let currentIndex = 0;
        let autoPlayTimer = null;
        const AUTOPLAY_INTERVAL = 4000;

        const goToSlide = (index) => {
            currentIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, idx) => {
                slide.classList.toggle('active', idx === currentIndex);
            });

            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        const nextSlide = () => {
            goToSlide(currentIndex + 1);
        };

        const prevSlide = () => {
            goToSlide(currentIndex - 1);
        };

        // Auto-play management
        const startAutoPlay = () => {
            stopAutoPlay();
            autoPlayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
        };

        const stopAutoPlay = () => {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        };

        const resetAutoPlay = () => {
            stopAutoPlay();
            startAutoPlay();
        };

        // Navigation button listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoPlay();
            });
        }

        // Dot click listeners
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetAutoPlay();
            });
        });

        // Pause on hover over slideshow container or wrapper
        const slideshowWrapper = slideshow.closest('.slideshow-wrapper') || slideshow;
        slideshowWrapper.addEventListener('mouseenter', stopAutoPlay);
        slideshowWrapper.addEventListener('mouseleave', startAutoPlay);

        // Start auto-play initially
        startAutoPlay();
    };

    /* ==========================================================================
       FEATURE 15: FORM VALIDATION (Contact Form)
       ========================================================================== */
    const initContactForm = () => {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const nameInput = document.getElementById('formName');
        const emailInput = document.getElementById('formEmail');
        const subjectInput = document.getElementById('formSubject');
        const messageInput = document.getElementById('formMessage');
        const submitBtn = document.getElementById('formSubmit');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const formSuccess = document.getElementById('formSuccess');

        const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

        const setError = (input, errorSpan, message) => {
            if (input) input.classList.add('error');
            if (errorSpan) {
                errorSpan.textContent = message;
                errorSpan.style.display = 'block';
            }
        };

        const clearError = (input, errorSpan) => {
            if (input) input.classList.remove('error');
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.style.display = 'none';
            }
        };

        // Real-time input validation: clear error upon typing
        if (nameInput) {
            nameInput.addEventListener('input', () => clearError(nameInput, nameError));
        }
        if (emailInput) {
            emailInput.addEventListener('input', () => clearError(emailInput, emailError));
        }
        if (messageInput) {
            messageInput.addEventListener('input', () => clearError(messageInput, messageError));
        }

        // Form submit handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            let firstInvalidField = null;

            // Validate Name
            const nameVal = nameInput ? nameInput.value.trim() : '';
            if (!nameVal) {
                setError(nameInput, nameError, 'Vui lòng nhập họ tên của bạn.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = nameInput;
            } else if (nameVal.length < 2) {
                setError(nameInput, nameError, 'Họ tên phải có ít nhất 2 ký tự.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = nameInput;
            } else {
                clearError(nameInput, nameError);
            }

            // Validate Email
            const emailVal = emailInput ? emailInput.value.trim() : '';
            if (!emailVal) {
                setError(emailInput, emailError, 'Vui lòng nhập địa chỉ email.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = emailInput;
            } else if (!EMAIL_REGEX.test(emailVal)) {
                setError(emailInput, emailError, 'Địa chỉ email không hợp lệ (ví dụ: name@gmail.com).');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = emailInput;
            } else {
                clearError(emailInput, emailError);
            }

            // Validate Message
            const msgVal = messageInput ? messageInput.value.trim() : '';
            if (!msgVal) {
                setError(messageInput, messageError, 'Vui lòng nhập nội dung tin nhắn.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = messageInput;
            } else if (msgVal.length < 5) {
                setError(messageInput, messageError, 'Nội dung tin nhắn phải có ít nhất 5 ký tự.');
                isValid = false;
                if (!firstInvalidField) firstInvalidField = messageInput;
            } else {
                clearError(messageInput, messageError);
            }

            // Focus on first error if invalid
            if (!isValid) {
                if (firstInvalidField) firstInvalidField.focus();
                return;
            }

            // Submission Success
            if (formSuccess) {
                formSuccess.classList.add('show');
            }
            if (submitBtn) {
                submitBtn.disabled = true;
            }

            // Reset form and message after 3 seconds
            setTimeout(() => {
                form.reset();
                if (formSuccess) {
                    formSuccess.classList.remove('show');
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
            }, 3000);
        });
    };

    /* ==========================================================================
       FEATURE 16: TILT EFFECT ON CARDS
       ========================================================================== */
    const initTiltCards = () => {
        // Desktop check: disable on touch devices or screens < 768px
        const isTouchOrSmall = () => {
            return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
        };

        if (isTouchOrSmall()) return;

        const tiltCards = document.querySelectorAll('.tilt-card');
        if (!tiltCards.length) return;

        const MAX_TILT_DEG = 5;

        tiltCards.forEach((card) => {
            let isHovered = false;

            card.addEventListener('mouseenter', () => {
                if (isTouchOrSmall()) return;
                isHovered = true;
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mousemove', (e) => {
                if (isTouchOrSmall() || !isHovered) return;

                const rect = card.getBoundingClientRect();
                const cardWidth = rect.width;
                const cardHeight = rect.height;

                const centerX = rect.left + cardWidth / 2;
                const centerY = rect.top + cardHeight / 2;

                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                // Subtle rotation within max ±5 degrees
                const rotateX = -((mouseY / (cardHeight / 2)) * MAX_TILT_DEG);
                const rotateY = (mouseX / (cardWidth / 2)) * MAX_TILT_DEG;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                isHovered = false;
                card.style.transition = 'transform 0.5s ease-out';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    };

    /* ==========================================================================
       INITIALIZE ALL FEATURES
       ========================================================================== */
    initThemeToggle();
    initMobileMenu();
    initScrollFeatures();
    initSmoothScroll();
    initTypingEffect();
    initParticleBackground();
    initCustomCursor();
    initScrollAnimations();
    initSkillBars();
    initProjectModal();
    initSlideshow();
    initContactForm();
    initTiltCards();
});
