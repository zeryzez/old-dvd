const dvd = document.getElementById('dvdSVG');
const dvdTxt = document.getElementById('dvd');
const dvdContainer = document.getElementById('dvd-section');
const menu = document.getElementById('menu');

let isMenuOpen = false;

let positionX = 0;
let positionY = 0;
let directionX = 1;
let directionY = 1;
let speed = 2;

const rect = dvd.getBoundingClientRect();
let dvdWidth  = rect.width-10;
let dvdHeight = rect.height-40;

let containerWidth = window.innerWidth;
let containerHeight = window.innerHeight;

positionX = Math.random() * (containerWidth - dvdWidth);
positionY = Math.random() * (containerHeight - dvdHeight);
dvd.style.left = positionX + 'px';
dvd.style.top = positionY + 'px';

function updatePosition() {
    // Update position based on current direction
    positionX += directionX * speed;
    positionY += directionY * speed;
    

    // Check for collision with the walls
    if (positionX <= 0 || positionX + dvdWidth >= containerWidth) {
        directionX *= -1;
        changeColor();
    }
    if (positionY <= -40 || positionY + dvdHeight >= containerHeight) {
        directionY *= -1;
        changeColor();
    }

    // Apply the new position to the DVD logo
    dvd.style.left = positionX + 'px';
    dvd.style.top = positionY + 'px';

    requestAnimationFrame(updatePosition);
}

function changeColor() {
    // Generate a random color
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    dvdTxt.style.fill = randomColor;
}

// Start the animation
requestAnimationFrame(updatePosition);

// Update container dimensions on window resize
window.addEventListener('resize', () => {
    containerWidth = window.innerWidth;
    containerHeight = window.innerHeight;
    // Recalculate the initial position
    positionX = Math.random() * (containerWidth - dvdWidth);
    positionY = Math.random() * (containerHeight - dvdHeight);
    dvd.style.left = positionX + 'px';
    dvd.style.top = positionY + 'px';
});

// Add event listener to change speed with arrow keys
window.addEventListener('keydown', (event) => {
    if(event.key ==='Escape') {
            menu.classList.toggle('hidden');
            dvdContainer.classList.toggle('hidden');
            isMenuOpen = !isMenuOpen;
    }
});

const menuOptions = document.querySelectorAll('#menu > ul > li');
let currentIndex = 0;
// Add event listener to toggle menu
window.addEventListener('keydown', (event) => {
    if(isMenuOpen){
        if (event.key === 'ArrowUp'){
            if(currentIndex > 0) {
                menuOptions[currentIndex].classList.toggle('current-option');
                currentIndex--;
                menuOptions[currentIndex].classList.toggle('current-option');
            } 
        }else if (event.key === 'ArrowDown') {
            if(currentIndex < menuOptions.length - 1) {
                menuOptions[currentIndex].classList.toggle('current-option');
                currentIndex++;
                menuOptions[currentIndex].classList.toggle('current-option');
            }
        }else if (event.key === 'ArrowRight') {
            if(currentIndex === 0) {
                speed = Math.min(speed + 1, 10);
                updateRectSpeed();
            }
        } else if (event.key === 'ArrowLeft') {
            if(currentIndex === 0) {
                speed = Math.max(speed - 1, 1);
                updateRectSpeed();
            }
        }
    }
});

function updateRectSpeed() {
    const rects = document.querySelectorAll('.rectangle');
    rects.forEach((rect, index) => {
        if (index < speed) {
            rect.style.backgroundColor = 'white';
        } else {
            rect.style.backgroundColor = 'blue';
        }
    });
}

function updateManySvg() {
    const svgs = document.querySelectorAll('.svg');
    svgs.forEach(svg => {
        svg.style.width = `${dvdWidth}px`;
        svg.style.height = `${dvdHeight}px`;
    });
}

