document.addEventListener('DOMContentLoaded', function() {
    const colorButtons = document.querySelectorAll('.colorBtn');
    const body = document.body;
    const bikeImage = document.querySelector('.productImage img');

    const bikeColors = {
        'light': 'white.png',
        'gray': 'graphite.png',
        'dark': 'black.png'
    };

    bikeImage.src = 'white.png';

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