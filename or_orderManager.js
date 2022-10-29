/*
 * Will manage the customers order
*/
var order = [];
const SIZEPRICES = {large: 4, small: 3};

/**
 * @Function displayCoffeePopup
 * @Param {event} _event  = The event contains the type of coffee to be displayed
 *
 * Shows the coffee popup
 */
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
  document.getElementById("d_coffeePopupBackground").style.display = "flex";
  // Current method of changing opacity after the display. If they are changed at the same time,
  //  the  transition doesn't happen
  setTimeout(() => document.getElementById("d_coffeePopupBackground").style.opacity = 1, 0);
}

/**
 * @Function hideCoffeePopup
 *
 * Hides the coffee popup
 */
function hideCoffeePopup() {
  // Getting the coffee popup element
  var coffeePopup = document.getElementById("d_coffeePopupBackground");
  // Changing the opacity
  coffeePopup.style.opacity = 0;

  // Getting the transition duration
  var popupStyleDuration = getComputedStyle(coffeePopup).transitionDuration;

  // Making the none once the opacity is 0
  setTimeout(() => {
    coffeePopup.style.display = "none";
  }, parseFloat(popupStyleDuration) * 1000);
}

// Making it so that if you click the background it closes the popup
document.getElementById("d_coffeePopupBackground").addEventListener("click", hideCoffeePopup);
// Making it so that if you click the close button it closes the popup
document.getElementById("i_coffeePopupClose").addEventListener("click", hideCoffeePopup);

// Making so that if you click on the coffee popup it doesn't close it,
//  because clicking the popup is considered to be clicking the background as well
document.getElementById("d_coffeePopup").addEventListener("click", (e) => {e.stopPropagation()});

/**
 * @Function addToOrder
 * @Param {event} _event  = The event contains the type of coffee to be added to the order
 *
 * Adds coffee to the list
 */
var thing
function addToOrder(_event) {
  var coffeeName = _event.srcElement.getAttribute("coffee");
  console.log(coffeeName);
  thing = document.getElementById("sel_coffeePopupSize");
  console.log(thing.value);
}
document.getElementById("b_coffeePopupAdd").addEventListener("click", addToOrder);