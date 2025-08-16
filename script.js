const navbar = document.getElementById('navbar');
const logo = document.getElementById('logo');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const mobileMenu = document.getElementById('mobileMenu');
const navLinksContainer = document.getElementById('navLinks');
const scrollIndicator = document.getElementById('scrollIndicator');

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const handleScroll = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 80) {
        navbar.classList.add('scrolled');
        navLinks.forEach(link => {
            if (!link.classList.contains('force-dark')) {
                link.classList.add('force-dark');
            }
        });
        if (!logo.classList.contains('force-dark')) {
            logo.classList.add('force-dark');
        }
    } else {
        navbar.classList.remove('scrolled');
        navLinks.forEach(link => {
            link.classList.remove('force-dark');
        });
        logo.classList.remove('force-dark');
    }
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
    scrollIndicator.style.width = Math.min(scrollPercent, 100) + '%';
}, 16);

window.addEventListener('scroll', handleScroll);

function switchToPage(targetPageId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
    });
    pages.forEach(page => {
        if (page.classList.contains('active')) {
            page.style.opacity = '0';
            page.style.transform = 'translateY(20px)';
            setTimeout(() => {
                page.classList.remove('active');
            }, 200);
        }
    });
    setTimeout(() => {
        const activeLink = document.querySelector(`[data-page="${targetPageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.style.transform = 'scale(1.05)';
            setTimeout(() => {
                activeLink.style.transform = '';
            }, 200);
        }
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.style.opacity = '0';
            targetPage.style.transform = 'translateY(20px)';
            setTimeout(() => {
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'translateY(0)';
            }, 50);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navLinksContainer.classList.remove('active');
        setTimeout(handleScroll, 100);
    }, 200);
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        switchToPage(pageId);
    });
});

navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.05)';
        link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        link.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
        const shimmer = link.querySelector('::before');
        if (shimmer) {
            shimmer.style.left = '100%';
        }
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
        link.style.boxShadow = '';
    });
    link.addEventListener('mousedown', () => {
        link.style.transform = 'translateY(-1px) scale(1.02)';
    });
    link.addEventListener('mouseup', () => {
        link.style.transform = 'translateY(-3px) scale(1.05)';
    });
});

mobileMenu.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    const spans = mobileMenu.querySelectorAll('span');
    if (navLinksContainer.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navLinksContainer.classList.remove('active');
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

const addParallaxEffect = throttle(() => {
    const scrolled = window.pageYOffset;
    const activeHero = document.querySelector('.page.active .hero');
    if (activeHero) {
        const speed = scrolled * 0.3;
        activeHero.style.transform = `translateY(${speed}px)`;
    }
}, 16);

window.addEventListener('scroll', addParallaxEffect);

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email && password) {
            const submitBtn = loginForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing In...';
            submitBtn.style.background = '#999';
            setTimeout(() => {
                alert(`Login simulation:\nEmail: ${email}\nPassword: ${password.replace(/./g, '*')}\n\nLogin successful!`);
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                loginForm.reset();
            }, 1500);
        }
    });
}

const observeCards = () => {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px) scale(0.95)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
};

const smoothScrollToElement = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

document.addEventListener('keydown', (e) => {
    if (e.altKey) {
        const currentActive = document.querySelector('.nav-link.active');
        const links = Array.from(navLinks);
        const currentIndex = links.indexOf(currentActive);
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            const prevPage = links[currentIndex - 1].getAttribute('data-page');
            switchToPage(prevPage);
        } else if (e.key === 'ArrowRight' && currentIndex < links.length - 1) {
            e.preventDefault();
            const nextPage = links[currentIndex + 1].getAttribute('data-page');
            switchToPage(nextPage);
        }
    }
    if (e.key === 'Escape') {
        navLinksContainer.classList.remove('active');
    }
});

const addLoadingEffect = () => {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
};

const optimizeForPerformance = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
};

const addScrollToTop = () => {
    let scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) {
        scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.id = 'scrollToTop';
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(scrollToTopBtn);
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    const toggleScrollToTop = throttle(() => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
            scrollToTopBtn.style.transform = 'scale(0.8)';
        }
    }, 100);
    window.addEventListener('scroll', toggleScrollToTop);
};

window.addEventListener('load', () => {
    addLoadingEffect();
    observeCards();
    optimizeForPerformance();
    addScrollToTop();
    handleScroll();
    navLinks.forEach(link => {
        link.addEventListener('focus', () => {
            link.style.outline = '2px solid #667eea';
            link.style.outlineOffset = '2px';
        });
        link.addEventListener('blur', () => {
            link.style.outline = 'none';
        });
    });
});

window.addEventListener('resize', throttle(() => {
    if (window.innerWidth > 768) {
        navLinksContainer.classList.remove('active');
    }
    handleScroll();
}, 250));

const safeQuerySelector = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
};

window.NavigationController = {
    switchToPage,
    handleScroll,
    smoothScrollToElement
};
