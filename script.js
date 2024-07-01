window.addEventListener('load', () => {
  document.body.classList.remove('before-load');
});
document.querySelector('.loading').addEventListener('transitionend', (e) => {
  document.body.removeChild(e.currentTarget);
});

//CARDS
// Function to update mouse coordinates
function updateMouseCoordinates(e, card) {
  const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
}

// Function to update touch coordinates
function updateTouchCoordinates(e, card) {
  const touch = e.touches[0],
        rect = card.getBoundingClientRect(),
        x = touch.clientX - rect.left,
        y = touch.clientY - rect.top;

  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
}

// Handle mouse move and touch move events
document.getElementById("cards").addEventListener("mousemove", e => {
  for (const card of document.getElementsByClassName("card")) {
    updateMouseCoordinates(e, card);
  }
});

document.getElementById("cards").addEventListener("touchmove", e => {
  for (const card of document.getElementsByClassName("card")) {
    updateTouchCoordinates(e, card);
  }
});
/*
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("clicked");
    });
  });
*/
  
//SERVICES

var navLink = gsap.utils.toArray(".nav-link"),
    imgWrap = document.querySelector('.img-wrapper'),
    imgItem = document.querySelector('.img-placeholder img');

function moveImg(e){
    var mouseX = e.clientX,
        mouseY = e.clientY;
    var imgWrapWidth = imgWrap.offsetWidth,
        imgWrapHeight = imgWrap.offsetHeight;
        
    var tl = gsap.timeline();
    tl.to(imgWrap, {
        duration: 1,
        x: mouseX - imgWrapWidth / 2,
        y: mouseY - imgWrapHeight / 2,
        ease: Expo.ease
    });
}

function linkHover(e){
    if (e.type === "mouseenter"){
        var imgSrc = e.target.dataset.src;
        var tl = gsap.timeline();

        tl.set(imgItem, {
            attr: {src : imgSrc}
        }).to(imgWrap, {
            autoAlpha: 1,
            scale: 1
        });
    } else if (e.type === "mouseleave"){
        var tl = gsap.timeline();
        tl.to(imgWrap, {
            autoAlpha: 0,
            scale: 0.9
        });
    }
}

function initAnimation(){
    navLink.forEach(link => {
        link.addEventListener('mouseenter', linkHover);
        link.addEventListener('mouseleave', linkHover);
        link.addEventListener('mousemove', moveImg);
    });
}

function init(){
    initAnimation();
}

window.addEventListener("load", function(){
    init();
});
