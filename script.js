// Navigation functionality
const navbar = document.getElementById('navbar');
const logo = document.getElementById('logo');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const mobileMenu = document.getElementById('mobileMenu');
const navLinksContainer = document.getElementById('navLinks');
const scrollIndicator = document.getElementById('scrollIndicator');

// Throttle function for performance optimization
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

// Enhanced scroll effects with better color transitions
const handleScroll = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class with threshold
    if (scrollTop > 80) {
        navbar.classList.add('scrolled');
        
        // Force color changes for better visibility
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
        
        // Remove forced dark colors
        navLinks.forEach(link => {
            link.classList.remove('force-dark');
        });
        
        logo.classList.remove('force-dark');
    }

    // Update scroll indicator
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
    scrollIndicator.style.width = Math.min(scrollPercent, 100) + '%';
}, 16); // ~60fps

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Enhanced page navigation with smooth transitions
function switchToPage(targetPageId) {
    // Remove active class from all links and pages
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Add a subtle scale animation
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
    
    // Add active class to clicked link with delay for smooth transition
    setTimeout(() => {
        const activeLink = document.querySelector(`[data-page="${targetPageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.style.transform = 'scale(1.05)';
            setTimeout(() => {
                activeLink.style.transform = '';
            }, 200);
        }
        
        // Show corresponding page
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
        
        // Smooth scroll to top
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
        
        // Close mobile menu if open
        navLinksContainer.classList.remove('active');
        
        // Trigger scroll handler to update navbar state
        setTimeout(handleScroll, 100);
        
    }, 200);
}

// Handle page navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        switchToPage(pageId);
    });
});

// Enhanced hover effects for navigation links
navLinks.forEach(link => {
    // Mouse enter effect
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.05)';
        link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add glow effect
        link.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
        
        // Trigger the shimmer effect
        const shimmer = link.querySelector('::before');
        if (shimmer) {
            shimmer.style.left = '100%';
        }
    });
    
    // Mouse leave effect
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
        link.style.boxShadow = '';
    });
    
    // Add click feedback
    link.addEventListener('mousedown', () => {
        link.style.transform = 'translateY(-1px) scale(1.02)';
    });
    
    link.addEventListener('mouseup', () => {
        link.style.transform = 'translateY(-3px) scale(1.05)';
    });
});

// Mobile menu toggle with animation
mobileMenu.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    
    // Animate hamburger menu
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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navLinksContainer.classList.remove('active');
        
        // Reset hamburger menu
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
});

// Add parallax effect to hero sections
const addParallaxEffect = throttle(() => {
    const scrolled = window.pageYOffset;
    const activeHero = document.querySelector('.page.active .hero');
    
    if (activeHero) {
        const speed = scrolled * 0.3;
        activeHero.style.transform = `translateY(${speed}px)`;
    }
}, 16);

window.addEventListener('scroll', addParallaxEffect);

// Form submission handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email && password) {
            // Add loading state to button
            const submitBtn = loginForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing In...';
            submitBtn.style.background = '#999';
            
            // Simulate login process
            setTimeout(() => {
                alert(`Login simulation:\nEmail: ${email}\nPassword: ${password.replace(/./g, '*')}\n\nLogin successful!`);
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                
                // Reset form
                loginForm.reset();
            }, 1500);
        }
    });
}

// Enhanced card animations with intersection observer
const observeCards = () => {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            } else {
                // Reset animation when out of view
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px) scale(0.95)';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach((card, index) => {
        // Initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        
        observer.observe(card);
    });
};

// Smooth scroll for internal links
const smoothScrollToElement = (targetId) => {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Arrow key navigation
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
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        navLinksContainer.classList.remove('active');
    }
});

// Add loading screen effect
const addLoadingEffect = () => {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
};

// Performance optimization: Reduce animations on low-end devices
const optimizeForPerformance = () => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for accessibility
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

// Enhanced scroll to top functionality
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
    
    // Show/hide scroll to top button
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

// Initialize all features when page loads
window.addEventListener('load', () => {
    addLoadingEffect();
    observeCards();
    optimizeForPerformance();
    addScrollToTop();
    
    // Initial scroll handler call
    handleScroll();
    
    // Add focus styles for accessibility
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

// Handle window resize for responsive adjustments
window.addEventListener('resize', throttle(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navLinksContainer.classList.remove('active');
    }
    
    // Recalculate scroll indicator
    handleScroll();
}, 250));

// Add error handling for missing elements
const safeQuerySelector = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
};

// Export functions for potential external use
window.NavigationController = {
    switchToPage,
    handleScroll,
    smoothScrollToElement
};