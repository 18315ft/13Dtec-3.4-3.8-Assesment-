/*
 * Will manage the customers order
*/
var order = [];
const SIZEPRICES = {large: 4, small: 3};

// Change svg, name, button function, display popup
function displayCoffeePopup(_event) {
  // Getting the coffee name
  var coffeeName;
  // Looping the path until if finds the element with the coffeename attribute
  for (var x = 0; x < _event.path.length; x++) {
    if (_event.path[x].getAttribute("coffeename") != undefined) {
      coffeeName = _event.path[x].getAttribute("coffeename");
      break;
    }
  }
  // Change svg
  document.getElementById("svg_coffeePopupSVG").append(createCoffeeSVG(COFFEERATIOS[coffeeName]));

  // Change name
  document.getElementById("p_coffeePopupName").textContent = COFFEENAMES[coffeeName];

  // Button functionality
  document.getElementById("b_coffeePopupAdd").setAttribute("coffee", coffeeName);

  // Displaying
  document.getElementById("d_coffeePopup").style.opacity = 1;
}

function addToOrder(_event) {
  var coffeeName = _event.srcElement.getAttribute("coffee");
  console.log(coffeeName);
}