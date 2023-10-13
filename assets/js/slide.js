const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector('.carousel');
const arrows = document.querySelectorAll('.wrapper i');
const firstCardWidth = carousel.querySelector('.card').offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, starX, startScrollLeft, timeoutId;

let cardPerWidth = Math.round(carousel.offsetWidth  / firstCardWidth);

carouselChildrens.slice(-cardPerWidth).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
});

carouselChildrens.slice(0, cardPerWidth).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

arrows.forEach(btn => {
    btn.addEventListener('click', e => {
        carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
    });
});

function dragStart(e) {
    isDragging = true;
    carousel.classList.add('dragging');
    starX = e.pageX
    startScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - starX);
}

function dragStop() {
    isDragging = false;
    carousel.classList.remove('dragging');
}

function autoPlay() {
    // if(window.innerWidth < 800) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 3500);
}

autoPlay();

function infiniteScroll() {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove('no-transition');
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    }
    clearTimeout(timeoutId);
    if(!wrapper.matches(':hover')) autoPlay();
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
wrapper.addEventListener('mouseleave', autoPlay);