/*
 * Will manage the customers order
*/
var order = [];
const SIZEPRICES = {large: 4, small: 3};

// Change svg, name, button function, display popup
function displayCoffeePopup(_coffee) {
  // Change svg
  document.getElementById("svg_coffeePopupSVG").innerHTML = createCoffeeSVG(COFFEERATIOS[_coffee]);

  // Change name
  document.getElementById("svg_coffeePopupName").textContent = COFFEENAMES[_coffee];

  // Button functionality
  document.getElementById("b_coffeePopupAdd").setAttribute("coffee", _coffee);
}

function addToOrder(_event) {
  var coffeeName = _event.srcElement.getAttribute("coffee");
}