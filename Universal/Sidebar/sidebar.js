const sidebar = document.querySelector('.sidebar');
const hamburger = sidebar.querySelector('.heading button');
const main = document.querySelector('main');
const MOBILE_BREAKPOINT = 940;

function closeSidebarOnMobile() {
    sidebar.classList.remove('collapsed');
    sidebar.classList.remove('overlay-open');
    sidebar.classList.add('overlay-closed');
}

function syncSidebarByWidth() {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
        closeSidebarOnMobile();
    } else {
        sidebar.classList.remove('overlay-open', 'overlay-closed');
    }
}

hamburger.addEventListener('click', () => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
        sidebar.classList = sidebar.classList.contains('overlay-open') ? 'sidebar overlay-closed' : 'sidebar overlay-open';
    } else {
        sidebar.classList.remove('overlay-open', 'overlay-closed');
        sidebar.classList.toggle('collapsed');
    }
});

// if (main) {
//     main.addEventListener('click', () => {
//         if (window.innerWidth < MOBILE_BREAKPOINT && sidebar.classList.contains('overlay-open')) {
//             closeSidebarOnMobile();
//         }
//     });
// }

document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target)) {
        sidebar.classList.remove('overlay-open');
    }
});

window.addEventListener('resize', syncSidebarByWidth);

syncSidebarByWidth();