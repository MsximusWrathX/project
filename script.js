let isScrolling = false;
let scrollY = 0;
let isEntryDone = false;

function updateAccents() {
    // Current scroll position
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // We only react to scroll after the entry animation is conceptually "available"
    // or we just handle it immediately.
    const factor = Math.min(currentScroll / 300, 1);
    const moveAmount = factor * 220; // Slightly more to ensure it clears
    
    document.querySelectorAll('.corner-accent').forEach(accent => {
        let transform = '';
        if (accent.classList.contains('accent-tl')) {
            transform = `rotate(45deg) translateX(-${moveAmount}%)`;
        } else if (accent.classList.contains('accent-tr')) {
            transform = `rotate(-45deg) translateX(${moveAmount}%)`;
        } else if (accent.classList.contains('accent-bl')) {
            transform = `rotate(-45deg) translateX(-${moveAmount}%)`;
        } else if (accent.classList.contains('accent-br')) {
            transform = `rotate(45deg) translateX(${moveAmount}%)`;
        }
        
        if (transform) {
            accent.style.setProperty('transform', transform, 'important');
        }
    });
    isScrolling = false;
}

window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (!isScrolling) {
        window.requestAnimationFrame(updateAccents);
        isScrolling = true;
    }
}, { passive: true });

// Stabilization and Entry Handler
window.addEventListener('load', () => {
    // Check if we are on index (has splash)
    const isIndex = !!document.querySelector('.intro-overlay');
    const delay = isIndex ? 4200 : 200;

    setTimeout(() => {
        document.querySelectorAll('.corner-accent').forEach(el => {
            el.style.opacity = "1";
        });
        updateAccents(); // Initial position
    }, delay);

    console.log('V-CRAFT Core Logic: Active');
});
