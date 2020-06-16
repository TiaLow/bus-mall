'use strict';

// console.log('Sup!');

// MONDAY PLAN-
// 1. Create constructor function that creates an object associated with each product and has:
// - NAME of product
// - FILE PATH of product

// 2. Create algorithm that randomly generates three unique product images and displays side by side in browser

// 3. Event listener to HTML section that holds images, when user clicks this area three new products are displayed

// 4. Track the selections made
// - in constructor function define a property to hold number of times product has been clicked
// - after each selection, update newly added property to reflect it was clicked

// 5. Control number of rounds user can do this to 25. Keep this in global variable so we can test with 5 first, then change to max 25

// 6. Report results after all rounds to list
// - create property in function that keeps track of all products being considered
// - after 25 voting rounds, remove event listeners (see notes from lecture for that)
// - display list like "Banana slicer had 3 votes and was shown 5 times"


//----------------------------------------------------------------------------------
//--------------------------------------------- CONSTRUCTOR FUNCTION ---------------
//----------------------------------------------------------------------------------

var allProducts = [];
var totalClicks = 0;
var maxClicks = 5; //CHANGE THIS TO 25 ONCE IT'S WORKING!


function Product(productNameParameter, imageSource){
  this.clicked = 0;
  this.shown = 0;
  this.productName = productNameParameter;
  this.imgSrc = imageSource;

  allProducts.push(this);
}

new Product('Banana Slicer', 'img/banana.jpg');







function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;

}