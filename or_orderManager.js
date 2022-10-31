/*
 * Will manage the customers order
*/
var order = [];
const SIZEPRICES = {large: 4, small: 3};
var currentItemAlterations;

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
  document.getElementById("b_coffeePopupCheckout").setAttribute("coffee", coffeeName);

  document.getElementById("i_coffeePopupAlterations").value = "";

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
function addToOrder(_event) {
  var highestIndex = 0;
  for (var x in order) {
    highestIndex = Math.max(highestIndex, order[x].index);
  }
  order.push({
    name:        _event.srcElement.getAttribute("coffee"),
    size:        document.getElementById("sel_coffeePopupSize").value,
    alterations: document.getElementById("i_coffeePopupAlterations").value,
    index:       highestIndex + 1
  });

  hideCoffeePopup();
  updateCartIcon();
}
document.getElementById("b_coffeePopupAdd").addEventListener("click", addToOrder);

/**
 * @Function addAndCheckout
 * @Param {event} _event  = The event contains the type of coffee to be added to the order
 *
 * Calls the addToOrder and showCheckout functions
 */
function addAndCheckout(_event) {
  addToOrder(_event);
  showCheckout();
}
document.getElementById("b_coffeePopupCheckout").addEventListener("click", addAndCheckout);

/**
 * @Function updateCartIcon
 *
 * Updates the cart icon with how many items are in the cart
 */
function updateCartIcon() {
  var cartElmt = document.getElementById("d_shoppingCart");
  if (order.length == 0) {
    cartElmt.style.display = "none";
    return;
  }
  
  cartElmt.style.display = "block";

  document.getElementById("p_shoppingCartCount").textContent = order.length;
}

/**
 * @Function showCheckout
 *
 * Updates the checkout page and shows it
 */
function showCheckout() {
  // Displaying the page
  document.getElementById("d_orderingPage").style.display = "block";
  // Clearing the list
  document.getElementById("d_orderingPageList").innerHTML = "";

  // The total price of the order
  var totalPrice = 0;
  // Running through all of the items in the cart
  for (var x in order) {
    // Adding to the total price
    if (order[x].size == "l") {
      totalPrice += 4;
    } else {
      totalPrice += 3;
    }
    
    // The card that will go onto the list in the checkout page
    var itemCard = document.createElement("div");
    itemCard.classList.add("orderingPageListItem");

    // Creating the name
    var itemCardName = document.createElement("p");
    itemCardName.classList.add("orderingPageListName");
    itemCardName.textContent = COFFEENAMES[order[x].name];
    itemCardName.style.gridArea = "name";

    // Creating the SVG
    var itemCardSVG = createCoffeeSVG(COFFEERATIOS[order[x].name]);
    itemCardSVG.style.gridArea = "svg";

    // Creating the card options
    var cardOptions = document.createElement("div");
    cardOptions.style.gridArea = "options";
    cardOptions.style.position = "relative";

    // Creating the size drop down
    var sizeSel = document.createElement("select");
    sizeSel.id = "sel_size" + order[x].index;
    // Large option
    var sizeLarge = document.createElement("option");
    sizeLarge.value = "l";
    sizeLarge.textContent = "Large: $4"
    // Small option
    var sizeSmall = document.createElement("option");
    sizeSmall.value = "s";
    sizeSmall.textContent = "Small: $3"
    // Appending options to select
    sizeSel.append(sizeLarge, sizeSmall);
    sizeSel.value = order[x].size;

    var alterations = document.createElement("input");
    alterations.id = "in_alterations" + order[x].index;
    alterations.type = "text";
    alterations.placeholder = "Note to barista eg. Decaf";
    alterations.value = order[x].alterations;

    var remove = document.createElement("button");
    remove.classList.add("orderingPageListRemove");
    remove.textContent = "Remove";
    remove.setAttribute("index", order[x].index);
    remove.addEventListener("click", removeFromOrder);
    
    var save = document.createElement("button");
    save.classList.add("orderingPageListSave");
    save.textContent = "Save changes";
    save.setAttribute("index", order[x].index);
    save.addEventListener("click", saveItemInOrder);

    // Appending options to options
    cardOptions.append(sizeSel, document.createElement("br"), alterations, remove, save);
    
    itemCard.append(itemCardName, itemCardSVG, cardOptions);

    document.getElementById("d_orderingPageList").append(itemCard);
  }
  document.getElementById("p_orderingPagePrice").textContent = "$" + totalPrice;
}
document.getElementById("d_shoppingCart").addEventListener("click", showCheckout);

/**
 * @Function removeFromOrder
 * @Param {event} _event  = The event contains the index of the element to remove from the order
 *
 * Removes an item from the order and reloads the checkout page
 */
function removeFromOrder(_event) {
  var index = parseInt(_event.target.attributes.index.value);
  for (var x in order) {
    if (order[x].index == index) {
      order.splice(x, 1);
      break;
    }
  }

  showCheckout();
  updateCartIcon();
}

/**
 * @Function saveItemInOrder
 * @Param {event} _event  = The event contains the index of the element to change from the order
 *
 * Saves any changes made to an item in the checkout page
 */
function saveItemInOrder(_event) {
  // Getting the index
  var index = parseInt(_event.target.attributes.index.value);
  var arrIndex;
  for (var x in order) {
    if (order[x].index = index) {
      arrIndex = x;
      break;
    }
  }

  console.log(order[arrIndex].size)
  console.log(document.getElementById("sel_size" + index).value);
  order[arrIndex].size = document.getElementById("sel_size" + index).value;
  order[arrIndex].alterations = document.getElementById("in_alterations" + index).value;
  console.log(order[arrIndex].size)
  
  showCheckout();
}

/**
 * @Function resetOrder
 *
 * Resets the users order and sends them to the main page
 */
function resetOrder() {
  if (confirm("Are you sure that you want to reset your order?") == false) return;
  order = [];
  updateCartIcon();
  document.getElementById('d_orderingPage').style.display = 'none'
}

/**
 * @Function placeOrder
 *
 * Writes the order into the firebase
 */
function placeOrder() {
  var orderObj = {
    time: document.getElementById("i_pickupTime").value,
    day: document.getElementById("sel_pickupDay").value,
    items: order,
    name: userDetails.name
  };

  fb_write("orders/" + userDetails.uid, orderObj);
  
  document.getElementById('d_orderingPage').style.display = 'none'
}