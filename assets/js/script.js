// This script handles the interactive UI for the portfolio.
// It keeps the code simple and focuses on core front-end behavior.

document.addEventListener('DOMContentLoaded', () => {
    // Set the current year in the footer.
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Handle theme toggle, storing the user's choice in localStorage.
    const root = document.documentElement;
    const themeButton = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
    }

    if (themeButton) {
        themeButton.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            root.setAttribute('data-theme', nextTheme);
            localStorage.setItem('portfolio-theme', nextTheme);
        });
    }

    // Handle mobile navigation toggle.
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            mainNav.classList.toggle('is-open');
        });

        mainNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Simple project filtering and search interaction.
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('projectSearch');

    function applyProjectFilters() {
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
        const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : '';

        projectCards.forEach((card) => {
            const category = card.dataset.category || '';
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';

            const matchesFilter = activeFilter === 'all' || category.includes(activeFilter);
            const matchesSearch = !searchValue || title.includes(searchValue) || description.includes(searchValue);

            card.style.display = matchesFilter && matchesSearch ? 'block' : 'none';
        });
    }

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            applyProjectFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', applyProjectFilters);
    }

    // Prevent the contact form from submitting for this static front-end stage.
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');

            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Message Sent';
                submitButton.disabled = true;

                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 1800);
            }
        });
    }
});
