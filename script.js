var slidePosition = 0;
var slideInterval;
const COFFEERATIOS = {
  espresso:     ["espresso"],
  longBlack:    ["espresso", "water"],
  flatWhite:    ["espresso", "2milk", "0.25foam"],
  cappuccino:   ["1milk", "espresso", "1foam"],
  latte:        ["espresso", "2milk", "1foam"],
  hotChocolate: ["chocolate", "2milk", "1foam"],
  mochaccino:   ["1milk", "chocolate", "espresso", "1foam"]
};
const COFFEECOLOURS = {
  espresso:  "#3c2218",
  water:     "#76d3f5",
  milk:      "#fffecc",
  foam:      "#fffef7",
  chocolate: "#7b3f00"
};
const COFFEEUNITS = 4;

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
      icons[x + 1].style.animationName = "fadeIn";
    } else {
      icons[x + 1].style.animationName = "fadeOut";
    }

    dis -= pages[x].clientHeight;
  }

}
// Running the function
updatePage();

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
 * @Function updateIconSizes
 *
 * Updates the font size of icons to make them adjust to different screen sizes
 */
function updateIconSizes() {
  // bi is bootstap icon (I think)
  var icons = document.getElementsByClassName("bi");
  var buttons = document.getElementsByClassName("slideButton");

  for (var x = 0; x < icons.length; x++) {
    icons[x].style.fontSize = icons[x].clientHeight * 0.9 + "px";
  }
  for (var x = 0; x < buttons.length; x++) {
    buttons[x].style.width = Math.min(buttons[x].parentElement.clientHeight, buttons[x].parentElement.clientWidth) * 0.1 + "px";
    buttons[x].style.height = Math.min(buttons[x].parentElement.clientHeight, buttons[x].parentElement.clientWidth) * 0.1 + "px";
  }
}

setInterval(updateIconSizes, 16);

/**
 * @Function createCoffeeSVG
 * @Param {array} _args = [
 *                           _colour[1],
 *                           _end[1],
 *                           _colour[2],
 *                           _end[2],
 *                           _colour[n],
 *                           _end[n],
 *                         ]
 *
 * Creates a svg object with polygons with of colour _colour[n] from _end[n-1] to end[n]
 */
function createCoffeeSVG(_args) {
  var width = 175;
  var height = 200;

  // SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  
  // Base coffee cup shape
  for (var x = 0; x < _args.length; x += 2) {
    var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", getPoints(width, height, _args[x-1], _args[x+1]));
    poly.style = "fill:" + _args[x];
    
    svg.append(poly);
  }
  
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  document.getElementById("menuPage").append(svg);
}

/**
 * @Function getPoints
 * @Param {number} _width  = The width of the svg
 * @Param {number} _height = The height of the svg
 * @Param {number} _start  = Where this section of the svg should start
 * @Param {number} _end    = Where this section of the svg should end
 *
 * Gives the points for the section of a cup svg between _start and _end
 */
function getPoints(_width, _height, _start, _end) {
  if (!_start) _start = 0;
  function thisLerpx(_x) {
    //return(_max - (_max - _min) * (1 - _x));
    return(1 - (1 - 0.8) * (1 - _x));
  }
  
  return(`${_width * (1 - thisLerpx(_end))  },${_height * (1 - _end)}
          ${_width * thisLerpx(_end)        },${_height * (1 - _end)}
          ${_width * thisLerpx(_start)      },${_height * (1 - _start)}
          ${_width * (1 - thisLerpx(_start))},${_height * (1 - _start)}`);
}

function parseCoffeeSVG(_coffee) {
  var output = [];
  var pos = 0;
  
  for (var x in _coffee) {
    var num = _coffee[x].slice(0, 1);
    
    if (!isNaN(parseFloat(num))) {
      output.push(COFFEECOLOURS[_coffee[x].slice(1)]);
      pos += num / COFFEEUNITS;
      output.push(pos);
    } else {
      output.push(COFFEECOLOURS[_coffee[x]]);
      pos += 1 / COFFEEUNITS;
      output.push(pos);
    }
  }
  console.log(output);
  createCoffeeSVG(output);
}

/*
Espresso      - espresso
Long Black    - espresso + water
Flat White    - espresso + 2milk + 0.25 foam
Cappuccino    - 1milk + espresso + 1foam
Latte         - espresso + 2milk + 1foam
Hot Chocolate - chocolate + 2milk + 1foam
Mochaccino    - 1milk + chocolate + espresso + 1foam
*/