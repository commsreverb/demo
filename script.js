// Reverb Newsroom Website - JavaScript

// Landing Page Logo Click - Creative Explosion Transition
document.addEventListener('DOMContentLoaded', () => {
    const landingOverlay = document.getElementById('landingOverlay');
    const reverbLogo = document.getElementById('reverbLogo');
    const explosionParticles = document.getElementById('explosionParticles');

    // Prevent body scroll when landing is active
    document.body.classList.add('landing-active');

    reverbLogo.addEventListener('click', () => {
        // Create explosion particles
        const colors = ['#D4E157', '#A5B4FC', '#FF8A80'];
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.backgroundColor = colors[i % colors.length];

            // Random direction
            const angle = (360 / particleCount) * i;
            const distance = 300 + Math.random() * 200;
            const tx = Math.cos(angle * Math.PI / 180) * distance;
            const ty = Math.sin(angle * Math.PI / 180) * distance;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.left = '50%';
            particle.style.top = '50%';

            explosionParticles.appendChild(particle);

            // Trigger animation
            setTimeout(() => {
                particle.classList.add('burst');
            }, 10);
        }

        // Trigger explosive animations
        reverbLogo.classList.add('exploding');
        landingOverlay.classList.add('exploding');

        // Remove overlay after animation completes
        setTimeout(() => {
            landingOverlay.classList.add('hidden');
            document.body.classList.remove('landing-active');
        }, 1200);
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Check if this is a dropdown filter link
        const filterValue = this.getAttribute('data-filter');
        if (filterValue) {
            e.preventDefault();
            // Trigger the filter
            applyFilter(filterValue);
            // Scroll to work section
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 64;
                const targetPosition = target.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 64;
                const targetPosition = target.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Filter Work Cards
const filterTabs = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('.card');

// Reusable filter function
function applyFilter(filter) {
    // Update active tab
    filterTabs.forEach(t => t.classList.remove('active'));
    const matchingTab = Array.from(filterTabs).find(t => t.getAttribute('data-filter') === filter);
    if (matchingTab) {
        matchingTab.classList.add('active');
    }

    // Filter cards
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        applyFilter(filter);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Fun & Expressive Scroll Reveal Animations
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, revealOptions);

// Section titles with bounce
document.querySelectorAll('.section-title').forEach(el => {
    el.classList.add('scroll-bounce');
    revealObserver.observe(el);
});

// Feature badges pop in
document.querySelectorAll('.feature-badge').forEach(el => {
    el.classList.add('scroll-pop');
    revealObserver.observe(el);
});

// Staggered playful card reveals - alternate directions
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.card:not(.hidden)');
            const cardIndex = Array.from(cards).indexOf(entry.target);

            // Alternate animation styles
            const animationType = cardIndex % 3;
            if (animationType === 0) {
                entry.target.classList.add('scroll-bounce');
            } else if (animationType === 1) {
                entry.target.classList.add('scroll-slide-left');
            } else {
                entry.target.classList.add('scroll-slide-right');
            }

            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, cardIndex * 100);
        }
    });
}, revealOptions);

document.querySelectorAll('.card').forEach(card => {
    cardObserver.observe(card);
});

// Capabilities with variety
document.querySelectorAll('.capability').forEach((el, index) => {
    if (index % 2 === 0) {
        el.classList.add('scroll-slide-left');
    } else {
        el.classList.add('scroll-slide-right');
    }
    setTimeout(() => {
        revealObserver.observe(el);
    }, index * 50);
});

// Stats pop in
document.querySelectorAll('.stat').forEach((el, index) => {
    el.classList.add('scroll-pop');
    setTimeout(() => {
        revealObserver.observe(el);
    }, index * 100);
});

// Text fades
document.querySelectorAll('.hero-description, .lead, .about-text p').forEach(el => {
    el.classList.add('scroll-fade');
    revealObserver.observe(el);
});

// Info boxes bounce
document.querySelectorAll('.info-box').forEach((el, index) => {
    el.classList.add('scroll-bounce');
    setTimeout(() => {
        revealObserver.observe(el);
    }, index * 100);
});

// Filter tabs pop in
document.querySelectorAll('.filter-tab').forEach((el, index) => {
    el.classList.add('scroll-pop');
    setTimeout(() => {
        revealObserver.observe(el);
    }, index * 50);
});

// Parallax effect on hero video
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroVideo = document.querySelector('.hero-video-bg video');
            if (heroVideo && scrolled < 800) {
                heroVideo.style.transform = `scale(1.2) translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Console log
console.log('🎨 Reverb Showcase Website Loaded!');
console.log('✨ Spotify Creative Production Studio');
console.log('🔗 Airtable form integrated');
console.log('🎬 Showreel ready');
