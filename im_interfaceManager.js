var slidePosition = 0;
var slideInterval;


function setUpSlide() {
  document.getElementById("d_slideContainer").style.width = document.getElementsByClassName("slideItem").length * 100 + "%";
}
setUpSlide();

function slideTo(_index) {
  clearInterval(slideInterval);
  slideInterval = setInterval(slideNext, 8000);
  document.getElementById("d_slideContainer").style.left = _index * -100 + "%";
}

/**
 * @Function slideNext
 *
 * Slides in next slide
 */
function slideNext() {
  slidePosition++;
  if (slidePosition >= document.getElementsByClassName("slideItem").length) {
    slidePosition = 0;
  }
  slideTo(slidePosition);
}
slideInterval = setInterval(slideNext, 8000);

/**
 * @Function slideNext
 *
 * Slides in next slide
 */
function slidePrev() {
  slidePosition--;
  if (slidePosition < 0) {
    slidePosition = document.getElementsByClassName("slideItem").length - 1;
  }
  slideTo(slidePosition);
}


/**
 * @Function updatePage
 * @Param {number} _input = the grid button clicked
 *
 * Highlights the current page on the nav bar when
 *  the main element is scrolled
 */
function updatePage() {
  // The displacement from the top
  var dis = document.getElementById("main").scrollTop;
  // All of the page elements
  const pages = document.getElementsByTagName("section");
  const icons = document.getElementsByClassName("navItem");

  if (dis == 0) {
    document.getElementById("b_scrollDown").style.opacity = 1;
  } else {
    document.getElementById("b_scrollDown").style.opacity = 0;
  }

  // Running through all the pages
  // If dis < the current pages height, that means that this is
  //   the current page that the user is scrolled to.
  // (window.innerHeight / 4) is added to displacement to make the
  //   line that determines what page you're on is lowered
  //   by 1/4 the pages height
  // The pages height is then taken away from displacement
  for (var x = 0; x < pages.length; x++) {
    if (dis + window.innerHeight / 4 < pages[x].clientHeight && dis + window.innerHeight / 4 > 0) {
      // Sets the nav icon for the page to be a different colour. The x + 1 is because the
      //  first icon is going to be the logo and so won't be highlighted
      icons[x + 1].style.background = "#FFA857";
    } else {
      icons[x + 1].style.background = "#FFD0A3";
    }

    dis -= pages[x].clientHeight;
  }

}
// Running the function
updatePage();


/**
 * @Function updateIconSizes
 *
 * Updates the font size of icons to make them adjust to different screen sizes
 */
function updateIconSizes() {
  // bi is bootstap icon (I think)
  var icons = document.getElementsByClassName("autoScaleIcon");
  var buttons = document.getElementsByClassName("resizeButton");

  var x;
  for (x = 0; x < icons.length; x++) {
    icons[x].style.fontSize = icons[x].clientHeight * 0.9 + "px";
  }
  
  for (x = 0; x < buttons.length; x++) {
    buttons[x].style.width = Math.min(buttons[x].parentElement.clientHeight, buttons[x].parentElement.clientWidth) * 0.1 + "px";
    buttons[x].style.height = Math.min(buttons[x].parentElement.clientHeight, buttons[x].parentElement.clientWidth) * 0.1 + "px";
  }
}

setInterval(updateIconSizes, 16);