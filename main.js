// AnimeVerse - Main JavaScript File
// Handles animations, interactions, and dynamic effects

// Global variables
let particleSystem = null;
let currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeParticles();
    initializeScrollEffects();
    initializeNavigation();
    initializeMobileMenu();
    
    // Page-specific initializations
    if (currentPage === 'index.html' || currentPage === '') {
        initializeHomePage();
    }
});

// Animation System
function initializeAnimations() {
    // Animate hero title characters
    if (document.querySelector('.hero-title')) {
        anime({
            targets: '.hero-title .char',
            opacity: [0, 1],
            translateY: [100, 0],
            rotateZ: [180, 0],
            delay: function(el, i) {
                return i * 100;
            },
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }
    
    // Animate subtitle
    if (document.querySelector('.hero-subtitle')) {
        anime({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 1000,
            duration: 800,
            easing: 'easeOutQuad'
        });
    }
    
    // Animate CTA button
    if (document.querySelector('.cta-button')) {
        anime({
            targets: '.cta-button',
            scale: [0.8, 1],
            opacity: [0, 1],
            delay: 1500,
            duration: 600,
            easing: 'easeOutBack'
        });
    }
}

// Particle System
function initializeParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
    
    // Animate particles
    animateParticles();
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    container.appendChild(particle);
}

function animateParticles() {
    // Continuously create new particles
    setInterval(() => {
        const particles = document.querySelectorAll('.floating-particle');
        particles.forEach(particle => {
            if (Math.random() < 0.01) { // 1% chance each frame
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
            }
        });
    }, 100);
}

// Scroll Effects
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate cards with stagger
                if (entry.target.classList.contains('card-grid')) {
                    const cards = entry.target.querySelectorAll('.card');
                    anime({
                        targets: cards,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        delay: anime.stagger(100),
                        duration: 600,
                        easing: 'easeOutQuad'
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Navigation
function initializeNavigation() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        // Create mobile menu if it doesn't exist
        let mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) {
            mobileMenu = createMobileMenu();
        }
        
        // Toggle menu
        mobileMenu.classList.toggle('active');
    });
}

function createMobileMenu() {
    const nav = document.querySelector('.nav-bar');
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'mobile-menu';
    
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            <a href="index.html" class="mobile-nav-link">Home</a>
            <a href="characters.html" class="mobile-nav-link">Characters</a>
            <a href="episodes.html" class="mobile-nav-link">Episodes</a>
        </div>
    `;
    
    nav.appendChild(mobileMenu);
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            border-top: 1px solid var(--primary-red);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 100;
        }
        
        .mobile-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-content {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .mobile-nav-link {
            color: var(--text-silver);
            text-decoration: none;
            font-size: 1.1rem;
            padding: 1rem;
            border-radius: 10px;
            transition: all 0.3s ease;
            text-align: center;
        }
        
        .mobile-nav-link:hover {
            background: rgba(220, 20, 60, 0.1);
            color: var(--electric-red);
            transform: translateX(10px);
        }
    `;
    
    document.head.appendChild(style);
    return mobileMenu;
}

// Home Page Specific Functions
function initializeHomePage() {
    initializeCarousel();
    initializeQuiz();
    initializeNewsTicker();
}

function initializeCarousel() {
    const carousel = document.getElementById('anime-carousel');
    if (!carousel) return;
    
    // Initialize Splide carousel
    const splide = new Splide('#anime-carousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        breakpoints: {
            1024: {
                perPage: 2,
            },
            768: {
                perPage: 1,
            }
        }
    });
    
    splide.mount();
    
    // Add hover effects to carousel items
    carousel.querySelectorAll('.splide__slide').forEach(slide => {
        slide.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        slide.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

function initializeQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    
    let currentQuestion = 0;
    let score = 0;
    
    const questions = [
        {
            question: "Which anime features the character Monkey D. Luffy?",
            options: ["One Piece", "Naruto", "Dragon Ball", "Bleach"],
            correct: 0
        },
        {
            question: "What is the name of Naruto's signature technique?",
            options: ["Chidori", "Rasengan", "Kamehameha", "Spirit Bomb"],
            correct: 1
        },
        {
            question: "Which anime studio produced Demon Slayer?",
            options: ["Madhouse", "Ufotable", "Studio Ghibli", "Toei Animation"],
            correct: 1
        },
        {
            question: "What is All Might's signature move in My Hero Academia?",
            options: ["Texas Smash", "California Smash", "Detroit Smash", "United States of Smash"],
            correct: 3
        },
        {
            question: "Who is the main protagonist of Attack on Titan?",
            options: ["Mikasa Ackerman", "Armin Arlert", "Eren Yeager", "Levi Ackerman"],
            correct: 2
        }
    ];
    
    function loadQuestion() {
        const question = questions[currentQuestion];
        const quizContent = document.getElementById('quiz-content');
        
        quizContent.innerHTML = `
            <h3 class="text-2xl font-bold mb-4">Question ${currentQuestion + 1} of ${questions.length}</h3>
            <p class="text-lg mb-6">${question.question}</p>
            ${question.options.map((option, index) => `
                <div class="quiz-option" data-answer="${index === question.correct ? 'correct' : 'incorrect'}" data-index="${index}">
                    ${option}
                </div>
            `).join('')}
        `;
        
        // Add click events to options
        quizContent.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                selectAnswer(this, parseInt(this.dataset.index), question.correct);
            });
        });
    }
    
    function selectAnswer(element, selectedIndex, correctIndex) {
        const allOptions = document.querySelectorAll('.quiz-option');
        
        // Disable all options
        allOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Show correct/incorrect
        if (selectedIndex === correctIndex) {
            element.classList.add('correct');
            score++;
            updateScore();
        } else {
            element.classList.add('incorrect');
            allOptions[correctIndex].classList.add('correct');
        }
        
        // Show next button
        document.getElementById('next-question').classList.remove('hidden');
    }
    
    function nextQuestion() {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            loadQuestion();
            document.getElementById('next-question').classList.add('hidden');
        } else {
            showResults();
        }
    }
    
    function updateScore() {
        document.getElementById('quiz-score').textContent = score;
    }
    
    function showResults() {
        const quizContent = document.getElementById('quiz-content');
        const percentage = Math.round((score / questions.length) * 100);
        let message = '';
        
        if (percentage >= 80) {
            message = "Excellent! You're a true anime expert! 🏆";
        } else if (percentage >= 60) {
            message = "Great job! You know your anime well! ⭐";
        } else if (percentage >= 40) {
            message = "Not bad! Keep watching more anime! 📺";
        } else {
            message = "Time to binge-watch some anime! 🎌";
        }
        
        quizContent.innerHTML = `
            <div class="text-center">
                <h3 class="text-3xl font-bold mb-4" style="color: var(--electric-red);">Quiz Complete!</h3>
                <div class="text-6xl mb-4">${score}/${questions.length}</div>
                <div class="text-2xl mb-4">${percentage}%</div>
                <p class="text-lg mb-6">${message}</p>
                <button class="cta-button" onclick="restartQuiz()">Take Quiz Again</button>
            </div>
        `;
        
        document.getElementById('next-question').classList.add('hidden');
    }
    
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        updateScore();
        loadQuestion();
    }
    
    // Add next question button event
    document.getElementById('next-question').addEventListener('click', nextQuestion);
    
    // Initialize first question
    loadQuestion();
}

function initializeNewsTicker() {
    const newsTicker = document.querySelector('.news-ticker');
    if (!newsTicker) return;
    
    // Add more news items dynamically
    const newsItems = [
        "🎬 New season of Attack on Titan announced for Fall 2024!",
        "🏆 Demon Slayer wins Anime of the Year award!",
        "📺 One Piece reaches 1000 episodes milestone!",
        "🎮 Cyberpunk 2077 anime adaptation breaks viewership records!",
        "🌟 My Hero Academia movie announced for 2025 release!",
        "⚔️ Sword Art Online returns with new season!",
        "🔥 Jujutsu Kaisen movie breaks box office records!",
        "💫 Studio Ghibli announces new project!",
        "🎯 Spy x Family gets third season confirmation!",
        "🌙 Sailor Moon revival series in production!"
    ];
    
    // Duplicate news items for seamless loop
    newsItems.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.textContent = item;
        newsTicker.appendChild(newsItem);
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-dark-gray);
        color: var(--text-white);
        padding: 1rem 2rem;
        border-radius: 10px;
        border: 1px solid var(--primary-red);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Button Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to all buttons
    document.querySelectorAll('.cta-button, .control-btn, .action-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add click ripple effect
    document.querySelectorAll('.cta-button, .control-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            anime({
                targets: ripple,
                scale: 2,
                opacity: [0.3, 0],
                duration: 600,
                easing: 'easeOutQuad',
                complete: () => {
                    ripple.remove();
                }
            });
        });
    });
});

// Loading Animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'loading-overlay';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid var(--bg-dark-gray); border-top: 3px solid var(--primary-red); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="color: var(--text-white); margin-top: 1rem; font-family: 'Orbitron', monospace;">Loading...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

function hideLoadingAnimation() {
    const loader = document.getElementById('loading-overlay');
    if (loader) {
        anime({
            targets: loader,
            opacity: 0,
            duration: 300,
            easing: 'easeOutQuad',
            complete: () => {
                loader.remove();
            }
        });
    }
}

// Page Transition Effects
function initializePageTransitions() {
    // Add page transition effects
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            showLoadingAnimation();
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', initializePageTransitions);

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Handle scroll events here
        }, 100);
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Export functions for use in other files
window.AnimeVerse = {
    scrollToSection,
    showNotification,
    showLoadingAnimation,
    hideLoadingAnimation,
    initializeAnimations,
    initializeParticles
};