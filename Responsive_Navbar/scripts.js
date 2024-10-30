const navMenu = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.nav-links');
const hamburgerIcon = document.querySelector('.hamburger');
const closedHamburgerIcon = document.querySelector('.closed-icon');
const openHamburgerIcon = document.querySelector('.open-icon');

function toggleMenu() {
    if (navMenu.classList.contains('showMenu')) {
        navMenu.classList.remove('showMenu');
        closedHamburgerIcon.style.display = 'none';
        openHamburgerIcon.style.display = 'block';
    } else {
        navMenu.classList.add('showMenu');
        closedHamburgerIcon.style.display = 'block';
        openHamburgerIcon.style.display = 'none';
    }
}

hamburgerIcon.addEventListener('click', toggleMenu);

navLinks.forEach(
    function(link) {
        link.addEventListener('click', toggleMenu)
    }
)


// reset the window
function handleResize() {
    if (window.innerWidth > 800) {
        navMenu.classList.remove('showMenu');
        openHamburgerIcon.style.display = 'none';
        closedHamburgerIcon.style.display = 'none';
    } else {
        openHamburgerIcon.style.display = 'block';
    }
}

window.addEventListener('resize', handleResize);