document.addEventListener('DOMContentLoaded', function() {
    const colorButtons = document.querySelectorAll('.colorBtn');
    const body = document.body;
    const bikeImage = document.querySelector('.productImage img');
    const loadingScreen = document.querySelector('.loadingScreen');

    const bikeColors = {
        'light': 'white.png',
        'gray': 'graphite.png',
        'dark': 'black.png'
    };

    bikeImage.src = 'white.png';

    // Preload images
    function preloadImages() {
        return new Promise((resolve) => {
            let loadedImages = 0;
            const totalImages = Object.values(bikeColors).length;

            Object.values(bikeColors).forEach(src => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        resolve();
                    }
                };
            });
        });
    }

    // Initialize animations
    function initializeAnimations() {
        // Header animations
        document.querySelector('.brandLogo').classList.add('slideFromLeft');
        document.querySelector('.mainNav').classList.add('slideFromTop');
        document.querySelector('.navIcons').classList.add('slideFromRight');

        // Hero section animations
        document.querySelector('.sideMenu').classList.add('slideFromLeft');
        document.querySelector('.productImage').classList.add('zoomOutFade');
        document.querySelector('.heroContent').classList.add('slideFromLeft');
        document.querySelector('.colorSelector').classList.add('slideFromRight', 'rotateIn');
        document.querySelector('.buyBtn').classList.add('slideFromRight');
    }

    // Start the website
    async function initializeWebsite() {
        await preloadImages();
        
        // Remove loading screen with fade out
        setTimeout(() => {
            loadingScreen.style.transition = 'opacity 0.3s ease';
            loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                
                // Show main content
                document.querySelector('header').classList.remove('hidden');
                document.querySelector('main').classList.remove('hidden');
                
                // Initialize animations
                initializeAnimations();
            }, 300);
        }, 1000);
    }

    // Start the website
    initializeWebsite();

    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            colorButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selectedColor = this.classList.contains('light') ? 'light' : 
                                this.classList.contains('gray') ? 'gray' : 'dark';

            body.classList.remove('lightMode', 'grayMode', 'darkMode');
            body.classList.add(`${selectedColor}Mode`);

            bikeImage.classList.add('slideOut');
            bikeImage.style.opacity = '0';

            setTimeout(() => {
                bikeImage.src = bikeColors[selectedColor];
                bikeImage.classList.remove('slideOut');
                bikeImage.classList.add('slideIn');
                bikeImage.style.opacity = '1';
            }, 300);

            setTimeout(() => {
                bikeImage.classList.remove('slideIn');
            }, 800);
        });
    });
}); 