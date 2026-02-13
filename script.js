// Reverb Newsroom Website - JavaScript

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

// Smooth Scroll Reveal Animations
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

// Add scroll-reveal class and observe
document.querySelectorAll('.section-title').forEach(el => {
    revealObserver.observe(el);
});

document.querySelectorAll('.feature-badge').forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
});

// Staggered card reveals
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const cards = document.querySelectorAll('.card:not(.hidden)');
            const cardIndex = Array.from(cards).indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, cardIndex * 100);
        }
    });
}, revealOptions);

document.querySelectorAll('.card').forEach(card => {
    card.classList.add('scroll-reveal');
    cardObserver.observe(card);
});

document.querySelectorAll('.capability').forEach((el, index) => {
    el.classList.add('scroll-reveal');
    setTimeout(() => {
        revealObserver.observe(el);
    }, index * 50);
});

document.querySelectorAll('.stat').forEach((el, index) => {
    el.classList.add('scroll-reveal');
    setTimeout(() => {
        revealObserver.observe(el);
    }, index * 150);
});

// Parallax effect on hero video
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroVideo = document.querySelector('.hero-video-bg iframe');
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
