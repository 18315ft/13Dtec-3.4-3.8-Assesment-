var slidePosition = 0;
var slideInterval;

// The amount of units in one cup (used for making svgs)
const COFFEEUNITS = 4;
// The ratios of ingredients for making svgs
const COFFEERATIOS = {
  espresso:     ["espresso"],
  longBlack:    ["espresso", "water"],
  flatWhite:    ["espresso", "1.5milk", "0.5foam"],
  cappuccino:   ["espresso", "1.5milk", "1.5foam"],
  latte:        ["espresso", "1.5milk", "0.75foam"],
  hotChocolate: ["chocolate", "1.5milk", "1.5foam"],
  mochaccino:   ["espresso", "0.5chocolate", "1milk", "0.75foam"]
};
// The colours of the coffee ingredients for the svgs
const COFFEECOLOURS = {
  espresso:  "#3c2218",
  water:     "#76d3f5",
  milk:      "#fffecc",
  foam:      "#fffef7",
  chocolate: "#7b3f00"
};
// Correctly capitalised names
const COFFEENAMES = {
  espresso:     "Espresso",
  longBlack:    "Long Black",
  flatWhite:    "Flat White",
  cappuccino:   "Cappuccino",
  latte:        "Latte",
  hotChocolate: "Hot Chocolate",
  mochaccino:   "Mochanccino"
};

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


createCoffeeMenuCards();
function createCoffeeMenuCards() {
  // x becomes the name of the coffee
  for (var x in COFFEERATIOS) {
    var cardElmt = document.createElement("div");
    cardElmt.id = "d_" + x;
    cardElmt.classList.add("coffeeCard");
    cardElmt.addEventListener("click", () => console.log("clicked"))
    
    // Creating and adding the svg element to the card element
    cardElmt.append(createCoffeeSVG(COFFEERATIOS[x]));

    var nameElmt = document.createElement("div");
    nameElmt.id = "d_" + x + "Name";
    nameElmt.classList.add("coffeeName");
    nameElmt.textContent = COFFEENAMES[x];
    // Adding the price element to the card element
    cardElmt.append(nameElmt);

    
    var addElmt = document.createElement("button");
    addElmt.id = "d_" + x + "AddOrder";
    addElmt.classList.add("coffeeButton");
    addElmt.textContent = "Add to order";
    // Adding the add to order element to the card element
    cardElmt.append(addElmt);
    
    // Adding the card element to the menu list element
    document.getElementById("d_menuList").append(cardElmt);
  }
}

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
function createCoffeeSVG(_coffee) {
  var ratioArr = parseCoffeeSVG(_coffee);
  var width = 175;
  var height = 200;

  // SVG element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  
  // Base coffee cup shape
  var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  poly.setAttribute("points", getPoints(0, 1));
  poly.style = "fill: #e3e3e3";
  
  svg.append(poly);
  
  
  for (var x = 0; x < ratioArr.length; x += 2) {
    var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly.setAttribute("points", getPoints(ratioArr[x-1], ratioArr[x+1], 0.9));
    poly.style = "fill:" + ratioArr[x];
    
    svg.append(poly);
  }
  
  // svg.setAttribute("width", width);
  // svg.setAttribute("height", height);
  svg.classList.add("coffeeSVG");
  svg.setAttribute("viewBox", "0 0 1 1");
  svg.setAttribute("grid-area", "svg");
  return(svg);
}

/**
 * @Function parseCoffeeSVG
 * @Param {number} _coffee = The array of ratios for the coffee
 *
 * Gives an array that can be given to getPoints
 */
function parseCoffeeSVG(_coffee) {
  var output = [];
  var pos = 0;
  
  for (var x in _coffee) {
    var num = parseFloat(_coffee[x]);
    // If the num is an integer, use num. Else use 1
    if (!isNaN(num)) {
      output.push(COFFEECOLOURS[_coffee[x].replace(/[0-9][.]*[0-9]*/g, '')]);
      pos += num / COFFEEUNITS;
    } else {
      output.push(COFFEECOLOURS[_coffee[x]]);
      pos += 1 / COFFEEUNITS;
    }
    output.push(pos);
  }
  // Creating the black background
  output.push("#d6d6d6");
  output.push(1);

  return(output);
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
function getPoints(_start, _end, _scale = 1) {
  if (!_start) _start = 0;
  function thisLerpx(_x) {
    return(1 - (1 - 0.8) * (1 - _x));
  }
  
  return(`${_scale * (1 - thisLerpx(_end)) + (1 - _scale) / 2},
          ${_scale * (1 - _end) + (1 - _scale) / 2}
          ${_scale * (thisLerpx(_end)) + (1 - _scale) / 2},
          ${_scale * (1 - _end) + (1 - _scale) / 2} 
          ${_scale * (thisLerpx(_start)) + (1 - _scale) / 2},
          ${_scale * (1 - _start) + (1 - _scale) / 2}
          ${_scale * (1 - thisLerpx(_start)) + (1 - _scale) / 2},
          ${_scale * (1 - _start) + (1 - _scale) / 2}`);
}