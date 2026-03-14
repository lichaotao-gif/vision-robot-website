/**
 * VisionX Robotics - 视光机器人官网
 * 交互与动画
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initI18n === 'function') initI18n();
    initParticles();
    initNav();
    initScrollAnimations();
    initStatsCounter();
    initSmoothScroll();
    initMobileMenu();
});

// 粒子背景
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = 60;
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.4);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
        `;
        container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0); opacity: 0.4; }
            25% { transform: translate(10px, -20px); opacity: 0.8; }
            50% { transform: translate(-10px, 10px); opacity: 0.4; }
            75% { transform: translate(20px, 5px); opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}

// 导航栏滚动效果
function initNav() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
    });
}

// 滚动动画 (AOS)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// 数字递增动画
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-num[data-target]');
    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                animateNumber(el, 0, target, 2000);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(el, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = end;
        }
    }

    requestAnimationFrame(update);
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                document.querySelector('.nav-toggle')?.classList.remove('active');
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });
}

// 移动端菜单
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');

    toggle?.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links?.classList.toggle('active');
    });
}
