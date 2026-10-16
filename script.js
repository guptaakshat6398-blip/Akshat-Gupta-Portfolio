// Keep the JavaScript simple: mobile menu, scroll animations, and the current year.

// 1. Open and close the navigation menu on small screens.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', function () {
    navigation.classList.toggle('open');
    const isOpen = navigation.classList.contains('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.textContent = isOpen ? '×' : '☰';
});

// Close the mobile menu after a navigation link is clicked.
document.querySelectorAll('.navigation a').forEach(function (link) {
    link.addEventListener('click', function () {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '☰';
    });
});

// 2. Reveal sections smoothly as they enter the screen.
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });
} else {
    // Fallback for older browsers: show everything if the animation API is unavailable.
    revealItems.forEach(function (item) {
        item.classList.add('visible');
    });
}

// 3. Automatically display the current year in the footer.
document.getElementById('year').textContent = new Date().getFullYear();
