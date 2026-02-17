// Reverb Newsroom Website - JavaScript

// ========================================
// GUESTLIST AUTHENTICATION
// ========================================

// Configure your guestlist here
// OPTION 1: Simple array (for testing)
const GUESTLIST = [
    'test@spotify.com',
    'demo@spotify.com',
    'reverb@spotify.com'
];

// OPTION 2: Load from Airtable (uncomment and configure)
// const AIRTABLE_API_KEY = 'your-api-key';
// const AIRTABLE_BASE_ID = 'your-base-id';
// const AIRTABLE_TABLE_NAME = 'Guestlist';

// OPTION 3: Load from Google Sheets (requires Google Sheets API setup)
// const GOOGLE_SHEET_ID = 'your-sheet-id';
// const GOOGLE_API_KEY = 'your-api-key';

async function checkGuestlist(email) {
    // Normalize email
    email = email.toLowerCase().trim();

    // OPTION 1: Check against simple array
    return GUESTLIST.includes(email);

    // OPTION 2: Check against Airtable (uncomment to use)
    /*
    try {
        const response = await fetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?filterByFormula={Email}='${email}'`,
            {
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_API_KEY}`
                }
            }
        );
        const data = await response.json();
        return data.records && data.records.length > 0;
    } catch (error) {
        console.error('Airtable check failed:', error);
        return false;
    }
    */

    // OPTION 3: Check against Google Sheets (uncomment to use)
    /*
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/Sheet1!A:A?key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        const emails = data.values.flat().map(e => e.toLowerCase().trim());
        return emails.includes(email);
    } catch (error) {
        console.error('Google Sheets check failed:', error);
        return false;
    }
    */
}

// Landing Page Logo Click - Creative Explosion Transition
document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // GUESTLIST GATE LOGIC
    // ========================================
    const guestlistGate = document.getElementById('guestlistGate');
    const guestlistForm = document.getElementById('guestlistForm');
    const guestlistEmail = document.getElementById('guestlistEmail');
    const guestlistMessage = document.getElementById('guestlistMessage');
    const landingOverlay = document.getElementById('landingOverlay');

    // Check if already authenticated
    const isAuthenticated = sessionStorage.getItem('guestlist_authenticated') === 'true';

    if (isAuthenticated) {
        // Hide guestlist, show landing animation
        guestlistGate.classList.add('hidden');
        landingOverlay.style.display = 'flex';
        document.body.classList.remove('guestlist-active');
        document.body.classList.add('landing-active');
    } else {
        // Show guestlist gate
        document.body.classList.add('guestlist-active');
    }

    // Handle guestlist form submission
    guestlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = guestlistEmail.value;
        const submitBtn = guestlistForm.querySelector('.guestlist-submit');

        // Clear previous message
        guestlistMessage.textContent = '';
        guestlistMessage.className = 'guestlist-message';

        // Show loading state
        submitBtn.classList.add('loading');

        // Check guestlist
        const isOnList = await checkGuestlist(email);

        if (isOnList) {
            // Success - grant access
            guestlistMessage.textContent = '✓ Welcome! Loading your experience...';
            guestlistMessage.classList.add('success');

            // Store authentication
            sessionStorage.setItem('guestlist_authenticated', 'true');
            sessionStorage.setItem('guestlist_email', email);

            // Hide guestlist gate and show landing animation
            setTimeout(() => {
                guestlistGate.classList.add('hidden');
                landingOverlay.style.display = 'flex';
                document.body.classList.remove('guestlist-active');
                document.body.classList.add('landing-active');
            }, 1000);
        } else {
            // Error - not on list
            guestlistMessage.textContent = '✗ Email not found on guestlist. Please check your email or contact us.';
            guestlistMessage.classList.add('error');
            submitBtn.classList.remove('loading');
        }
    });

    // ========================================
    // ORIGINAL LANDING PAGE LOGIC
    // ========================================
    const reverbLogo = document.getElementById('reverbLogo');
    const explosionParticles = document.getElementById('explosionParticles');

    reverbLogo.addEventListener('click', () => {
        // Trigger clean fade animations
        reverbLogo.classList.add('exploding');
        landingOverlay.classList.add('exploding');

        // Remove overlay and reveal site after animation completes
        setTimeout(() => {
            landingOverlay.classList.add('hidden');
            document.body.classList.remove('landing-active');
            document.body.classList.add('site-revealed');
        }, 800);
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Skip if this is the RSVP trigger
        if (this.classList.contains('rsvp-trigger')) {
            return;
        }

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

// Showreel embed appears
document.querySelectorAll('.showreel-embed').forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
});

// Showreel caption
document.querySelectorAll('.showreel-caption').forEach(el => {
    el.classList.add('scroll-fade');
    revealObserver.observe(el);
});

// Grid header
document.querySelectorAll('.grid-header h2').forEach(el => {
    el.classList.add('scroll-bounce');
    revealObserver.observe(el);
});

// CTA section
document.querySelectorAll('.cta-section h2').forEach(el => {
    el.classList.add('scroll-bounce');
    revealObserver.observe(el);
});

document.querySelectorAll('.cta-section p').forEach(el => {
    el.classList.add('scroll-fade');
    revealObserver.observe(el);
});

document.querySelectorAll('.btn-cta').forEach(el => {
    el.classList.add('scroll-pop');
    revealObserver.observe(el);
});

document.querySelectorAll('.cta-note').forEach(el => {
    el.classList.add('scroll-fade');
    revealObserver.observe(el);
});

// About section elements
document.querySelectorAll('.about-text h2').forEach(el => {
    el.classList.add('scroll-bounce');
    revealObserver.observe(el);
});

// Staggered playful card reveals - alternate directions
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
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
                // Stop observing once revealed
                cardObserver.unobserve(entry.target);
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

// Stats pop in with counting animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Animate numbers
            const statNum = entry.target.querySelector('.stat-num');
            if (statNum) {
                const text = statNum.textContent;
                const number = parseInt(text);

                if (!isNaN(number)) {
                    let current = 0;
                    const duration = 1500;
                    const increment = number / (duration / 16);

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            statNum.textContent = number + '+';
                            clearInterval(counter);
                        } else {
                            statNum.textContent = Math.floor(current);
                        }
                    }, 16);
                }
            }
        }
    });
}, revealOptions);

document.querySelectorAll('.stat').forEach((el, index) => {
    el.classList.add('scroll-pop');
    setTimeout(() => {
        statsObserver.observe(el);
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
            if (heroVideo && scrolled < 1000) {
                heroVideo.style.transform = `translate(-50%, -50%) scale(1.3) translateY(${scrolled * 0.2}px)`;
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
