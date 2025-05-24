document.addEventListener('DOMContentLoaded', function() {
    const menuTrigger = document.querySelector('.menu-trigger');
    const nav = document.querySelector('.main-nav .nav');
    const hasSubMenus = document.querySelectorAll('.has-sub');

    // Toggle main menu
    menuTrigger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Handle submenu toggles
    hasSubMenus.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && nav.classList.contains('active')) {
            menuTrigger.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            menuTrigger.classList.remove('active');
            nav.classList.remove('active');
            hasSubMenus.forEach(item => item.classList.remove('active'));
        }
    });
}); 