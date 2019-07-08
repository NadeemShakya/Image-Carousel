// declaring variables

let currentIndex = 0;
const HOLD_TIME =   3000;
// animation time must be multiple of image width.
const ANIMATION_TIME = 40;
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 300;

const IMAGE_COUNT = 4;
let LEFT_DIRECTION = true;
let RIGHT_DIRECTION = false;
let FPS = 60;
let isHolding = false;
let isTransiting = false;
let isButtonTransiting = false;
let isAutomaticAnimation;
let marginLeft = 0;

// accessing DOM elements.
let carouselContainer = document.getElementsByClassName('carousel-container')[0];
let carouselImgWrapper = document.getElementsByClassName('carousel-image-wrapper')[0];

// setting css properties

// styling carousel container

carouselContainer.style.width = `${IMAGE_WIDTH}px`;
carouselContainer.style.height = `${IMAGE_HEIGHT}px`;
carouselContainer.style.overflow = "hidden";
carouselContainer.style.position = "relative";
carouselContainer.style.marginLeft = carouselContainer.style.marginRight = "auto";
carouselContainer.style.marginTop = carouselContainer.style.marginBottom = `${20}px`;

// styling carousel wrapper

carouselImgWrapper.style.marginLeft = `${0}px`;
carouselImgWrapper.style.width = `${IMAGE_WIDTH * IMAGE_COUNT}px`;
carouselImgWrapper.style.height = `${IMAGE_HEIGHT}px`;
let images = carouselImgWrapper.querySelectorAll('img');

for(let i = 0; i < images.length; i++) {
  images[i].style.width = `${IMAGE_WIDTH}px`;
  images[i].style.height = `${IMAGE_HEIGHT}px`;
  images[i].style.marginRight = `${-4}px`;

}
// appending arrows

// appending left arrow.
var leftButton = document.createElement('div');
var imgHolder = document.createElement('img');
imgHolder.src = `./images/left-arrow.png`;
imgHolder.style.height = `${40}px`;
imgHolder.style.width = `${40}px`;
imgHolder.style.marginTop = `${20}px`;
leftButton.appendChild(imgHolder);
leftButton.className = "leftSliderArrow";
leftButton.style.position = "absolute";
leftButton.style.display = "block";
leftButton.style.height = `${80}px`;
leftButton.style.width = `${50}px`;
leftButton.style.top = `${50}%`;
leftButton.style.transform = `translate(${0}, ${-50}%)`;
leftButton.style.background= `rgba(${255}, ${255}, ${255}, ${0.6})`;
leftButton.style.cursor = `pointer`;
carouselContainer.appendChild(leftButton);

// appending right arrow.
var rightButton = document.createElement('div');
var imgHolder = document.createElement('img');
imgHolder.src = `./images/right-arrow.png`;
imgHolder.style.height = `${40}px`;
imgHolder.style.width = `${40}px`;
imgHolder.style.marginTop = `${20}px`;
imgHolder.style.marginLeft = `${10}px`;
rightButton.appendChild(imgHolder);
rightButton.className = "rightSliderArrow";
rightButton.style.position = "absolute";
rightButton.style.display = "block";
rightButton.style.height = `${80}px`;
rightButton.style.width = `${50}px`;
rightButton.style.top = `${50}%`;
rightButton.style.right = `${0}px`;
rightButton.style.transform = `translate(${0}, ${-50}%)`;
rightButton.style.background= `rgba(${255}, ${255}, ${255}, ${0.6})`;
rightButton.style.cursor = `pointer`;
carouselContainer.appendChild(rightButton);

// event listener attachment to leftButton.
leftButton.addEventListener("click",function() {
    if(!isTransiting) {
        isButtonTransiting = true;
        moveInRightDirection();
        clearInterval(isAutomaticAnimation);
        isAutomaticAnimation = null;
    }
})

// event listener attachment to right button.
rightButton.addEventListener("click",function() {
  if(!isTransiting) {
      isButtonTransiting = true;
      moveInLeftDirection();
      clearInterval(isAutomaticAnimation);
      isAutomaticAnimation = null;
  }
})


// appending dot indicator.
let dotHolder = document.createElement('div');
dotHolder.className = "dotHolder";
dotHolder.style.display = "inline-block";
dotHolder.style.position = "absolute";
dotHolder.style.left =  `${50}%`;
dotHolder.style.transform = `translate(${-50}%, ${0}%)`;
dotHolder.style.bottom =  `${0}px`;
dotHolder.margin = `${0}, auto`;
carouselContainer.appendChild(dotHolder);

for(let i = 0; i < IMAGE_COUNT; i++) {
  let dot = document.createElement('div');
  dot.className = "dot";
  dot.style.display = "inline-block";
  dot.style.height = `${10}px`;
  dot.style.width = `${10}px`;
  dot.style.background= `rgba(${255}, ${255}, ${255}, ${0.7})`;
  dot.style.borderRadius = `${50}%`;
  dot.style.marginRight = `${5}px`;
  dot.style.cursor = `pointer`;
  dotHolder.appendChild(dot);
  dot.style.left = `${i * 20}px`;
  dot.addEventListener('click', function() {
    if(!isTransiting) {
      // isButtonTransiting = true;
      jumpToImage(i);
      clearInterval(isAutomaticAnimation);
      isAutomaticAnimation = null;
    }      
  })
}


setInterval(() => {
  var tempDot = document.querySelector(`.dot:nth-child(${currentIndex+1})`);
  var dots = document.querySelectorAll('.dot');
  for(let i = 0; i < dots.length; i++) {
    dots[i].style.background = "#fff";
  }
  tempDot.style.background = "rgba(0, 255, 0, 0.8)";
}, 16.667)

function jumpToImage(nextIndex) {
    transition(currentIndex, nextIndex);
    currentIndex = nextIndex;
}


// set the isAutomaticAnimation counter

isAutomaticAnimation = setInterval(animate, HOLD_TIME);

function moveInLeftDirection() {

  if(currentIndex === IMAGE_COUNT - 1) {
    transition(currentIndex, 0);
    currentIndex = 0;
  }else {
    transition(currentIndex, currentIndex + 1)
    currentIndex++;
  }
}

function moveInRightDirection() {
  if(currentIndex == 0) {
    transition(currentIndex, IMAGE_COUNT - 1);
    currentIndex = IMAGE_COUNT - 1;
  }else {
    transition(currentIndex, currentIndex - 1)
    currentIndex--;
  }
}

// function to animate the slider
function animate() {
    // set the direction of animation.
    if(currentIndex == 0) {
      RIGHT_DIRECTION = false;
      LEFT_DIRECTION = true;
    }else if(currentIndex == IMAGE_COUNT - 1) {
      LEFT_DIRECTION = false;
      RIGHT_DIRECTION = true;
    }

    // animate the carousel depending on the direction.
    if(LEFT_DIRECTION) {
      nextIndex = currentIndex + 1;
      transition(currentIndex, nextIndex)
      currentIndex++;
    }
    if(RIGHT_DIRECTION) {
      nextIndex = currentIndex - 1;
      transition(currentIndex, nextIndex)
      currentIndex--;
    } 

}

// function for transition of the images
function transition(currentIndex, nextIndex) {
    
  // set the old margin value.
  let oldMarginValue = marginLeft;

  clearInterval(isAutomaticAnimation);
  isAutomaticAnimation = null;

  // if no transition is taking place
  if(!isTransiting) {

    var transitionTimer = setInterval(() => {
        
      // set transitioning to true now.
      isTransiting = true;
      
      // compute the change in index.
      let indexDifference = (nextIndex - currentIndex);

      // compute the total margin(distance) to be moved.
      let distance = indexDifference * IMAGE_WIDTH;

      // compute the Velocity with which the marginis to be moved.
      marginLeft -= (distance / ANIMATION_TIME);

      // set the marginLeft in the DOM element.
      carouselImgWrapper.style.marginLeft = `${marginLeft}px`;

      let changeInMargin = oldMarginValue - marginLeft;
      
      // if changeInMargin and distance is equal, then 
      // the frame has reached its destination point.

      if(changeInMargin === distance) {

          // transition is finished
          isTransiting = false;

          // clear the transition timer.
          clearInterval(transitionTimer);

          // reset the automatic animation.
          if(!isAutomaticAnimation) {

            isAutomaticAnimation = setInterval(animate, HOLD_TIME);
          }
      }
    }, (1000 / FPS))     
  }
    // isTransiting = true; 
}   

