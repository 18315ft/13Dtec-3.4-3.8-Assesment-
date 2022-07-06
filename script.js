var slidePosition = 0;


/**
 * @Function displayCurrentPage
 * @Param {number} _input = the grid button clicked
 *
 * Highlights the current page on the nav bar when
 *  the main element is scrolled
 */
function displayCurrentPage() {
  // The displacement from the top
  var dis = document.getElementById("main").scrollTop;
  // All of the page elements
  const pages = document.getElementsByTagName("section");
  const icons = document.getElementsByClassName("navIcon");

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
      icons[x + 1].style.animationName = "fadeIn";
    } else {
      icons[x + 1].style.animationName = "fadeOut";
    }
    
    dis -= pages[x].clientHeight;
  }
}
// Running the function
displayCurrentPage();

/**
 * @Function slideIn
 * @Param {number} _index = The slide to show
 *
 * Slides in the slide at _index and slides out all other slides
 */
function slideIn(_index) {
  // Slides
  var slides = document.getElementsByClassName("slideItem");

  // Making all the slides slide out
  for (var x = 0; x < slides.length; x++) {
    slides[x].style.animationName = "slideOut";
  }
  // Changing slide[_index] to slide in
  slides[_index].style.animationName = "slideIn";
}

/**
 * @Function slideNext
 *
 * Slides in next slide
 */
function slideNext() {
  slidePosition++;
  if (slidePosition == document.getElementsByClassName("slideItem").length) {
    slidePosition = 0;
  }
  
  slideIn(slidePosition);
}

setInterval(slideNext, 5000);