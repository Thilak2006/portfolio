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
    const hue = 190 + (i * 15); // cyan to purple gradient
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
    const hoverTargets = 'a, button, .btn, .showcase-card, .nav-link, .cert-card, .stat-card, .award-card, .contact-card, input, textarea, .carousel-arrow, .carousel-dot';
    document.querySelectorAll(hoverTargets).forEach(el => {
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

    // Animate loop
    function animateCursor() {
        // Main cursor follows instantly
        cursorMain.style.left = mouseX + 'px';
        cursorMain.style.top = mouseY + 'px';

        // Outer ring follows with spring
        outerX += (mouseX - outerX) * 0.12;
        outerY += (mouseY - outerY) * 0.12;
        cursorOuter.style.left = outerX + 'px';
        cursorOuter.style.top = outerY + 'px';

        // Trail dots — each follows the one before it
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


// ===== PARTICLES =====
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


// ===== TYPING EFFECT =====
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
window.addEventListener('load', () => setTimeout(typeWriter, 800));


// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Nav ripple
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
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
        link.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translateY(-2px) translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        link.addEventListener('mouseleave', function() { this.style.transform = ''; });
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
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    });
});


// ===== SKILL ANIMATION =====
const skillItems = document.querySelectorAll('.skill-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

skillItems.forEach(item => observer.observe(item));

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const target = parseInt(card.getAttribute('data-count'));
            const numberEl = card.querySelector('.stat-number');
            let current = 0;
            const counter = setInterval(() => {
                current += target / 40;
                if (current >= target) { numberEl.textContent = target + '+'; clearInterval(counter); }
                else numberEl.textContent = Math.floor(current);
            }, 37);
            counterObserver.unobserve(card);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-card').forEach(card => counterObserver.observe(card));


// =============================================
// ===== CAROUSEL — PROJECTS =====
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

    // Drag to scroll
    let isDragging = false, startX, scrollLeft;
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => { isDragging = false; track.style.cursor = 'grab'; });
    track.addEventListener('mouseup', () => { isDragging = false; track.style.cursor = 'grab'; });
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        track.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });

    // Touch drag
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].pageX; scrollLeft = track.scrollLeft; });
    track.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX;
        track.scrollLeft = scrollLeft - (x - startX);
    });
}

// Init carousels
setupCarousel('projectTrack', 'projLeft', 'projRight', 'projDots');
setupCarousel('certTrack', 'certLeft', 'certRight', null);


// ===== SCROLL REVEAL =====
function setupScrollReveal() {
    const reveals = document.querySelectorAll(
        '.showcase-card, .cert-card, .award-card, .timeline-item, .skill-category, .contact-card, .about-text p, .about-visual'
    );
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('revealed'), index * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(35px)';
        el.style.transition = 'opacity .7s cubic-bezier(.23,1,.32,1), transform .7s cubic-bezier(.23,1,.32,1)';
        revealObserver.observe(el);
    });
}
const revealStyle = document.createElement('style');
revealStyle.textContent = `.revealed{opacity:1!important;transform:translateY(0)!important}`;
document.head.appendChild(revealStyle);
window.addEventListener('load', setupScrollReveal);


// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 500));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    window.location.href = `mailto:thilakvairi.s27@gmail.com?subject=${encodeURIComponent(fd.get('subject'))}&body=${encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\nMessage:\n${fd.get('message')}`)}`;
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Opening Email Client...';
    btn.style.background = 'linear-gradient(135deg,#00ff88,#00d4ff)';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; e.target.reset(); }, 3000);
});


// ===== PARALLAX HERO ORBIT =====
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const orbits = document.querySelector('.orbit-system');
        if (!orbits) return;
        orbits.style.transform = `translate(${(e.clientX / window.innerWidth - 0.5) * 20}px, ${(e.clientY / window.innerHeight - 0.5) * 20}px)`;
    });
}


// ===== WEB CHART HOVER =====
const hexChart = document.getElementById('hexChart');
if (hexChart) {
    const webNodes = hexChart.querySelectorAll('.web-node');
    const labels = hexChart.querySelectorAll('.chart-label');
    webNodes.forEach((node, i) => {
        node.addEventListener('mouseenter', () => {
            node.setAttribute('r', '10');
            if (labels[i]) { labels[i].style.fill = '#fff'; labels[i].style.fontSize = '15px'; }
        });
        node.addEventListener('mouseleave', () => {
            node.setAttribute('r', '6');
            if (labels[i]) { labels[i].style.fill = 'rgba(0,212,255,0.8)'; labels[i].style.fontSize = '13px'; }
        });
    });
}


// ===== BUTTON RIPPLE =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.cssText = `position:absolute;width:0;height:0;border-radius:50%;background:rgba(255,255,255,0.3);left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;transform:translate(-50%,-50%);animation:ripple .6s ease-out;pointer-events:none`;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple{to{width:300px;height:300px;opacity:0}}`;
document.head.appendChild(rippleStyle);

console.log('%c🚀 Portfolio loaded!', 'color:#00d4ff;font-size:16px;font-weight:bold');