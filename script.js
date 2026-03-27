// =============================================
// ===== LOADING SCREEN =====
// =============================================
(function () {
    const loader = document.getElementById('loader');
    const loaderProgress = loader?.querySelector('.loader-progress');
    const loaderPercent = loader?.querySelector('.loader-percent');
    let progress = 0;

    function updateLoader() {
        if (progress < 90) {
            progress += Math.random() * 8 + 2;
            if (progress > 90) progress = 90;
            if (loaderProgress) loaderProgress.style.width = progress + '%';
            if (loaderPercent) loaderPercent.textContent = Math.floor(progress) + '%';
            requestAnimationFrame(updateLoader);
        }
    }
    updateLoader();

    window.addEventListener('load', () => {
        // Complete the bar
        progress = 100;
        if (loaderProgress) loaderProgress.style.width = '100%';
        if (loaderPercent) loaderPercent.textContent = '100%';

        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
            setTimeout(() => loader?.remove(), 600);
        }, 800);
    });
})();


// =============================================
// ===== EMAILJS INIT =====
// =============================================
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("K6lJu7-kn43hBRiAs");
    }
})();


// =============================================
// ===== CREATIVE CONSTELLATION CURSOR =====
// =============================================
const cursorMain = document.getElementById('cursorMain');
const cursorOuter = document.getElementById('cursorOuter');
const TRAIL_COUNT = 8;
const trailDots = [];
const trailPos = [];
let mouseX = -100, mouseY = -100;
let outerX = -100, outerY = -100;
let isHovering = false;

// Create trail dots
for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    const hue = 190 + (i * 15);
    const size = 4 - (i * 0.35);
    const opacity = 0.5 - (i * 0.05);
    dot.style.cssText = `
        width:${size}px;height:${size}px;
        background:hsl(${hue},100%,60%);
        box-shadow:0 0 ${6 - i}px hsl(${hue},100%,60%);
        opacity:${opacity};
    `;
    document.body.appendChild(dot);
    trailDots.push(dot);
    trailPos.push({ x: -100, y: -100 });
}

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mousedown', () => {
        cursorMain.classList.add('clicking');
        spawnClickBurst(mouseX, mouseY);
    });
    document.addEventListener('mouseup', () => {
        cursorMain.classList.remove('clicking');
    });

    // Hover detection
    const hoverTargets = 'a, button, .btn, .showcase-card, .nav-link, .cert-card, .stat-card, .award-card, .contact-card, input, textarea, .carousel-arrow, .carousel-dot, .web-node';

    function setupHoverListeners() {
        document.querySelectorAll(hoverTargets).forEach(el => {
            if (el.dataset.cursorBound) return;
            el.dataset.cursorBound = 'true';
            el.addEventListener('mouseenter', () => {
                isHovering = true;
                cursorMain.classList.add('hovering');
                cursorOuter.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                isHovering = false;
                cursorMain.classList.remove('hovering');
                cursorOuter.classList.remove('hovering');
            });
        });
    }
    setupHoverListeners();

    // Re-bind after DOM changes
    const cursorMutationObserver = new MutationObserver(() => setupHoverListeners());
    cursorMutationObserver.observe(document.body, { childList: true, subtree: true });

    // Animate loop
    function animateCursor() {
        cursorMain.style.left = mouseX + 'px';
        cursorMain.style.top = mouseY + 'px';

        outerX += (mouseX - outerX) * 0.12;
        outerY += (mouseY - outerY) * 0.12;
        cursorOuter.style.left = outerX + 'px';
        cursorOuter.style.top = outerY + 'px';

        for (let i = 0; i < TRAIL_COUNT; i++) {
            const target = i === 0 ? { x: mouseX, y: mouseY } : trailPos[i - 1];
            const ease = 0.25 - (i * 0.02);
            trailPos[i].x += (target.x - trailPos[i].x) * ease;
            trailPos[i].y += (target.y - trailPos[i].y) * ease;
            trailDots[i].style.left = trailPos[i].x + 'px';
            trailDots[i].style.top = trailPos[i].y + 'px';
            trailDots[i].style.opacity = isHovering ? '0' : (0.5 - i * 0.05);
        }

        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Click burst particles
function spawnClickBurst(x, y) {
    const colors = ['#00d4ff', '#8338ec', '#ff006e', '#00ff88', '#fbbf24'];
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'click-particle';
        const angle = (Math.PI * 2 * i) / 8;
        const dist = 30 + Math.random() * 30;
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.boxShadow = `0 0 6px ${p.style.background}`;
        p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}


// =============================================
// ===== PARTICLES =====
// =============================================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = window.innerWidth > 768 ? 30 : 15;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.width = (Math.random() * 3 + 1) + 'px';
        p.style.height = p.style.width;
        p.style.animationDuration = (Math.random() * 15 + 10) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(p);
    }
}
createParticles();


// =============================================
// ===== TYPING EFFECT =====
// =============================================
const typingElement = document.getElementById('typingText');
const textToType = "Hi, I'm Thilak S";
let charIndex = 0;

function typeWriter() {
    if (charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
    }
}

window.addEventListener('load', () => setTimeout(typeWriter, 1800));


// =============================================
// ===== NAVIGATION =====
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Nav ripple
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'nav-ripple';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    if (window.innerWidth > 768) {
        link.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translateY(-2px) translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        link.addEventListener('mouseleave', function () { this.style.transform = ''; });
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPos = window.scrollY + 200;
    sections.forEach(section => {
        const top = section.offsetTop, height = section.offsetHeight, id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) link.classList.add('active');
            });
        }
    });
}
window.addEventListener('scroll', updateActiveLink);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
});


// =============================================
// ===== SKILL BAR ANIMATION =====
// =============================================
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const item = entry.target;
            const level = item.getAttribute('data-level');
            const progressBar = item.querySelector('.skill-progress');

            // Get index among siblings for stagger
            const siblings = Array.from(item.parentElement.children);
            const index = siblings.indexOf(item);

            setTimeout(() => {
                item.classList.add('visible');
                if (progressBar && level) {
                    progressBar.style.width = level + '%';
                }
            }, index * 150);

            skillObserver.unobserve(item);
        }
    });
}, { threshold: 0.2 });

skillItems.forEach(item => skillObserver.observe(item));


// =============================================
// ===== COUNTER ANIMATION =====
// =============================================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const target = parseInt(card.getAttribute('data-count'));
            const numberEl = card.querySelector('.stat-number');
            let current = 0;
            const counter = setInterval(() => {
                current += target / 40;
                if (current >= target) {
                    numberEl.textContent = target + '+';
                    clearInterval(counter);
                } else {
                    numberEl.textContent = Math.floor(current);
                }
            }, 37);
            counterObserver.unobserve(card);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => counterObserver.observe(card));


// =============================================
// ===== CAROUSEL — WITH TOUCH FIX + KEYBOARD =====
// =============================================
function setupCarousel(trackId, leftBtnId, rightBtnId, dotsId) {
    const track = document.getElementById(trackId);
    const leftBtn = document.getElementById(leftBtnId);
    const rightBtn = document.getElementById(rightBtnId);
    const dotsContainer = dotsId ? document.getElementById(dotsId) : null;
    if (!track) return;

    const cards = track.querySelectorAll(':scope > *');
    const cardCount = cards.length;
    let currentIndex = 0;

    // Build dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => scrollToCard(i));
            dotsContainer.appendChild(dot);
        });
    }

    function getScrollAmount() {
        const card = cards[0];
        if (!card) return 0;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 0;
        return card.offsetWidth + gap;
    }

    function scrollToCard(index) {
        index = Math.max(0, Math.min(index, cardCount - 1));
        currentIndex = index;
        track.scrollTo({ left: getScrollAmount() * index, behavior: 'smooth' });
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    leftBtn?.addEventListener('click', () => scrollToCard(currentIndex - 1));
    rightBtn?.addEventListener('click', () => scrollToCard(currentIndex + 1));

    // Sync index on manual scroll
    let scrollTimeout;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollAmt = getScrollAmount();
            if (scrollAmt > 0) {
                currentIndex = Math.round(track.scrollLeft / scrollAmt);
                updateDots();
            }
        }, 100);
    });

    // ===== MOUSE DRAG =====
    let isDragging = false, dragStartX, dragScrollLeft;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        track.style.cursor = 'grabbing';
        dragStartX = e.pageX - track.offsetLeft;
        dragScrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.cursor = 'grab';
    });
    track.addEventListener('mouseup', () => {
        isDragging = false;
        track.style.cursor = 'grab';
    });
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        track.scrollLeft = dragScrollLeft - (x - dragStartX) * 1.5;
    });

    // ===== TOUCH DRAG — FIXED (no vertical scroll conflict) =====
    let touchStartX = 0, touchStartY = 0, touchScrollLeft = 0, isSwiping = false;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchStartY = e.touches[0].pageY;
        touchScrollLeft = track.scrollLeft;
        isSwiping = false;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].pageX - touchStartX;
        const dy = e.touches[0].pageY - touchStartY;

        // Determine swipe direction on first significant move
        if (!isSwiping) {
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
                isSwiping = true; // horizontal — we handle it
            } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
                return; // vertical — let page scroll naturally
            } else {
                return; // too small to determine
            }
        }

        if (isSwiping) {
            e.preventDefault();
            track.scrollLeft = touchScrollLeft - dx;
        }
    }, { passive: false });

    track.addEventListener('touchend', () => {
        isSwiping = false;
    }, { passive: true });

    // ===== KEYBOARD NAVIGATION =====
    track.setAttribute('tabindex', '0');
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', 'Carousel');

    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollToCard(currentIndex + 1);
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToCard(currentIndex - 1);
        }
        if (e.key === 'Home') {
            e.preventDefault();
            scrollToCard(0);
        }
        if (e.key === 'End') {
            e.preventDefault();
            scrollToCard(cardCount - 1);
        }
    });

    // Focus outline style
    track.addEventListener('focus', () => {
        track.style.outline = '2px solid rgba(0, 212, 255, 0.3)';
        track.style.outlineOffset = '4px';
        track.style.borderRadius = '12px';
    });
    track.addEventListener('blur', () => {
        track.style.outline = 'none';
    });
}

// Init carousels
// =============================================
// ===== PROJECT CARDS — SCROLL REVEAL =====
// =============================================
(function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    if (!projectCards.length) return;

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on card index
                const cards = Array.from(projectCards);
                const index = cards.indexOf(entry.target);
                const delay = index * 150;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    projectCards.forEach(card => projectObserver.observe(card));

    // ── 3D Tilt on hover (desktop only) ──
    if (window.innerWidth > 900) {
        projectCards.forEach(card => {
            const inner = card.querySelector('.project-card-inner');
            if (!inner) return;

            inner.addEventListener('mousemove', (e) => {
                const rect = inner.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                inner.style.transform = `
                    perspective(1200px)
                    rotateY(${x * 5}deg)
                    rotateX(${-y * 5}deg)
                    translateY(-8px)
                    scale3d(1.01, 1.01, 1.01)
                `;
            });

            inner.addEventListener('mouseleave', () => {
                inner.style.transform = '';
            });
        });
    }

    // ── Parallax image on scroll ──
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            projectCards.forEach(card => {
                const img = card.querySelector('.project-image img');
                if (!img) return;

                const rect = card.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight && rect.bottom > 0) {
                    const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                    const translateY = (progress - 0.5) * 30;
                    img.style.transform = `scale(${1 + Math.abs(progress - 0.5) * 0.05}) translateY(${translateY}px)`;
                }
            });
        }, { passive: true });
    }
})();
setupCarousel('certTrack', 'certLeft', 'certRight', null);


// =============================================
// ===== SCROLL REVEAL — IMPROVED =====
// =============================================
function setupScrollReveal() {
    const reveals = document.querySelectorAll(
    '.cert-card, .award-card, .timeline-item, .skill-category, .contact-card, .about-text p, .about-visual, .web-chart-container, .awards-section, .contact-form, .cert-section-title'
);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Calculate stagger delay from siblings
                const parent = entry.target.parentElement;
                const revealSiblings = Array.from(parent.children).filter(el =>
                    el.classList.contains(entry.target.classList[0]) ||
                    el.tagName === entry.target.tagName
                );
                const index = revealSiblings.indexOf(entry.target);
                const delay = Math.max(0, index) * 100;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(el => {
        // Avoid double-applying
        if (el.dataset.revealBound) return;
        el.dataset.revealBound = 'true';

        el.style.opacity = '0';
        el.style.transform = 'translateY(35px)';
        el.style.transition = 'opacity .7s cubic-bezier(.23,1,.32,1), transform .7s cubic-bezier(.23,1,.32,1)';
        revealObserver.observe(el);
    });
}

// Inject reveal class
const revealStyle = document.createElement('style');
revealStyle.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(revealStyle);

window.addEventListener('load', () => {
    // Delay slightly so loader finishes first
    setTimeout(setupScrollReveal, 200);
});


// =============================================
// ===== BACK TO TOP =====
// =============================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 500));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// =============================================
// ===== CONTACT FORM =====
// =============================================
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    if (typeof emailjs === 'undefined') {
        btn.innerHTML = '❌ EmailJS not loaded';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.opacity = '';
        }, 3000);
        return;
    }

    emailjs.sendForm(
        'service_2lffah4',
        'template_8egt7og',
        this
    )
        .then(() => {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
            btn.style.opacity = '1';
            this.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed. Try again';
            btn.style.background = 'linear-gradient(135deg, #ff006e, #ff4444)';
            btn.style.opacity = '1';
        })
        .finally(() => {
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
                btn.style.opacity = '';
            }, 3000);
        });
});


// =============================================
// ===== PARALLAX HERO ORBIT =====
// =============================================
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const orbits = document.querySelector('.orbit-system');
        if (!orbits) return;
        const xShift = (e.clientX / window.innerWidth - 0.5) * 20;
        const yShift = (e.clientY / window.innerHeight - 0.5) * 20;
        orbits.style.transform = `translate(${xShift}px, ${yShift}px)`;
    });
}


// =============================================
// ===== WEB CHART HOVER =====
// =============================================
const hexChart = document.getElementById('hexChart');
if (hexChart) {
    const webNodes = hexChart.querySelectorAll('.web-node');
    const labels = hexChart.querySelectorAll('.chart-label');

    webNodes.forEach((node, i) => {
        node.addEventListener('mouseenter', () => {
            node.setAttribute('r', '10');
            node.style.filter = 'url(#nodeGlow) drop-shadow(0 0 12px currentColor)';
            if (labels[i]) {
                labels[i].style.fill = '#fff';
                labels[i].style.fontSize = '15px';
                labels[i].style.fontWeight = '700';
            }
        });
        node.addEventListener('mouseleave', () => {
            node.setAttribute('r', '6');
            node.style.filter = 'url(#nodeGlow)';
            if (labels[i]) {
                labels[i].style.fill = 'rgba(0,212,255,0.8)';
                labels[i].style.fontSize = '13px';
                labels[i].style.fontWeight = '600';
            }
        });
    });

    // Animate chart on scroll
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dataWeb = hexChart.querySelector('.data-web');
                if (dataWeb) {
                    dataWeb.style.transition = 'all 1.5s cubic-bezier(0.23, 1, 0.32, 1)';
                    dataWeb.style.opacity = '1';
                }
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    chartObserver.observe(hexChart);
}


// =============================================
// ===== BUTTON RIPPLE =====
// =============================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 0; height: 0;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            left: ${e.clientX - rect.left}px;
            top: ${e.clientY - rect.top}px;
            transform: translate(-50%,-50%);
            animation: ripple .6s ease-out;
            pointer-events: none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { width: 300px; height: 300px; opacity: 0; } }`;
document.head.appendChild(rippleStyle);


// =============================================
// ===== CONSOLE MESSAGE =====
// =============================================
console.log('%c🚀 Portfolio loaded!', 'color:#00d4ff;font-size:16px;font-weight:bold');
console.log('%c👋 Hey! Thanks for checking the console.', 'color:#8338ec;font-size:12px');
// =============================================
// ===== IMAGE FALLBACK HANDLER =====
// =============================================
document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('error', function () {
        this.style.display = 'none';
        const parent = this.closest('.project-image');
        if (parent) {
            parent.classList.add('image-failed');
        }
    });
});