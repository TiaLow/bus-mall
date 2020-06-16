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
var maxClicks = 25;


function Product(productNameParameter, imageSource){
  this.clicked = 0;
  this.shown = 0;
  this.productName = productNameParameter;
  this.imgSrc = imageSource;

  allProducts.push(this);
}

new Product('R2D2 Luggage', 'img/bag.jpg');
new Product('Banana Slicer', 'img/banana.jpg');
new Product('Bathroom Tablet', 'img/bathroom.jpg');
new Product('Toeless Boots', 'img/boots.jpg');
new Product('All-in-One Breakfast', 'img/breakfast.jpg');

new Product('Meatball Bubble Gum', 'img/bubblegum.jpg');
new Product('Curved Chair', 'img/chair.jpg');
new Product('Gnarly Winged Toy', 'img/cthulhu.jpg');
new Product('Dog Duck Whistle', 'img/dog-duck.jpg');
new Product('Dragon Meat', 'img/dragon.jpg');

new Product('Pen Utensil', 'img/pen.jpg');
new Product('Pet Sweepers', 'img/pet-sweep.jpg');
new Product('Pizza Scissors', 'img/scissors.jpg');
new Product('Shark Sleeping Bag', 'img/shark.jpg');
new Product('Baby Sweeper', 'img/sweep.jpg');

new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new Product('Unicorn Meat', 'img/unicorn.jpg');
new Product('Tentacle USB', 'img/usb.jpg');
new Product('Closed System Watering Can', 'img/water-can.jpg');
new Product('Undrinkable Wine Glass', 'img/wine-glass.jpg');

//------------------------------------------------- EVENT LISTENER FOR CLICKS

var productImageSection = document.getElementById('product-images'); //target
productImageSection.addEventListener('click', handleProductClicks); //add listener with type and callback function

function handleProductClicks(event){
  if(event.target.tagName === 'IMG'){

    // console.log('it worked! you clicked an img!');
    totalClicks++;

    if(totalClicks === maxClicks){
      productImageSection.removeEventListener('click', handleProductClicks);
      renderResultsToList();
    }
  }

  var targetSrc = event.target.getAttribute('src');
  // debugger;
  for (var i = 0; i < allProducts.length; i++){

    if(allProducts[i].imgSrc === targetSrc)
      allProducts[i].clicked++;
  }

  rerenderSomeRandomImages();
}

function rerenderSomeRandomImages(){

  var firstRandom = randomize(0, allProducts.length);
  // console.log('first new', allProducts[firstRandom]);

  var secondRandom = randomize(0, allProducts.length);
  // console.log('second new', allProducts[secondRandom]);

  var thirdRandom = randomize(0, allProducts.length);
  // console.log('third new', allProducts[thirdRandom]);

  if(firstRandom === secondRandom || firstRandom === thirdRandom){
    firstRandom = randomize(0, allProducts.length);
  } else if (secondRandom === thirdRandom){
    secondRandom = randomize(0, allProducts.length);
  }

  //^^^^^^^^COULD PUT A WHILE LOOP HERE? While one of these conditions is true, generate new images?

  var imgLeft = document.getElementById('left');
  var imgMiddle = document.getElementById('middle');
  var imgRight = document.getElementById('right');

  imgLeft.src = allProducts[firstRandom].imgSrc;
  allProducts[firstRandom].shown++;

  imgMiddle.src = allProducts[secondRandom].imgSrc;
  allProducts[secondRandom].shown++;

  imgRight.src = allProducts[thirdRandom].imgSrc;
  allProducts[thirdRandom].shown++;

}

function renderResultsToList(){
  var list = document.getElementById('results-list');

  for (var i=0; i < allProducts.length; i++){
    var listItem = document.createElement('li');

    listItem.textContent = (allProducts[i].productName + ' product: ' + allProducts[i].clicked + ' votes, displayed: ' + allProducts[i].shown + ' times');

    list.appendChild(listItem);
  }
}


function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;

}
