// Theme Logic
const THEME_KEY = 'theme';
const DARK_MODE_CLASS = 'dark-mode';

const themeToggleBtn = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
        document.body.classList.add(DARK_MODE_CLASS);
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        document.body.classList.remove(DARK_MODE_CLASS);
        if (themeIcon) themeIcon.textContent = '🌙';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle(DARK_MODE_CLASS);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

// Attach event listener if button exists, or expose global function
window.toggleTheme = toggleTheme;

// Mobile Menu Logic
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');

    // update hamburger icon
    if (navLinks.classList.contains('active')) {
        hamburger.innerHTML = '✕';
    } else {
        hamburger.innerHTML = '☰';
    }
}

// Close menu when clicking outside or on a link
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    }
});

// Run on load
document.addEventListener('DOMContentLoaded', initTheme);
