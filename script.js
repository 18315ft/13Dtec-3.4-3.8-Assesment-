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

  // Running through all the pages
  // If dis < the current pages height, that means that this is
  //   the current page that the user is scrolled to.
  // (window.innerHeight / 4) is added to displacement to make the
  //   line that determines what page you're on is lowered
  //   by 1/4 the pages height
  // The pages height is then taken away from displacement
  for (var x = 0; x < pages.length; x++) {
    if (dis + window.innerHeight / 4 < pages[x].clientHeight) {
      console.log(pages[x].id); //#FFA857
      return;
    }
    dis -= pages[x].clientHeight;
  }
}
