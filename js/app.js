'use strict';

// MONDAY PLAN-
// 1. Create constructor function that creates an object associated with each product and has:
// - NAME of product, FILE PATH of product

// 2. Randomly generate three unique product images and displays side by side in browser

// 3. Event listener to HTML section that holds images, when user clicks this area three new products are displayed

// 4. Track the selections made
// - in constructor function define a property to hold number of times product has been clicked
// - after each selection, update newly added property to reflect it was clicked

// 5. Control number of rounds user can do this to 25. Keep this in global variable so we can test with 5 first, then change to max 25

// 6. Report results after all rounds to list
// - create property in function that keeps track of all products being considered
// - after 25 voting rounds, remove event listeners (see notes from lecture for that)
// - display list like "Banana slicer had 3 votes and was shown 5 times"


//TUES PLAN-

// 1. Update algorithm for showing products so that no two products are shown two times in a row

// 2. Track how many time product has appeared in a voting session to be able to track analytics on each piece of data
//  - make sure there is something that tracks number of times its been shown
//  - update it each time its been shown

// 3. Create chart to display results visually
//  - two bar charts, one shows how many times it was clicked, one shows number of times it was shown
//  - bar chart can go under product images
//  - bar charts should only appear after all 25 rounds

//WEDS PLAN-

// Today I need to make data persistently track totals between page refreshes, so I can keep track of aggregate number of votes
//  1. Implement local storage into my current application
//  2. Make sure data persists across both browser refreshes and resets

//  - store products array into local storage as a formatted JSON string
//  - retrieve products array from local storage and then utilize JSON.Parse() function.

//---------------------------------------------------------------------------------

var totalClicks = 0;
var maxClicks = 25;

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//--------------------------------------------- CONSTRUCTOR FUNCTION ---------------

function Product(productNameParameter, imageSource){
  this.clicked = 0;
  this.shown = 0;
  this.productName = productNameParameter;
  this.imgSrc = imageSource;

  Product.allProducts.push(this);
}

// empty array to contain all product information
Product.allProducts = [];

//------------------------------------------------ NEW INSTANCES ---------------------

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
new Product('Baby Sweeper', 'img/sweep.png');
new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new Product('Unicorn Meat', 'img/unicorn.jpg');
new Product('Tentacle USB', 'img/usb.gif');
new Product('Closed System Watering Can', 'img/water-can.jpg');
new Product('Undrinkable Wine Glass', 'img/wine-glass.jpg');


// retrieve information from localStorage with getItem, parse/unstringify with JSON.parse
var stringyProductsFromStorage = localStorage.getItem('storedProducts');

var productsFromStorage = JSON.parse(stringyProductsFromStorage);

// the below happens only if there are things in localStorage
if(productsFromStorage){
  Product.allProducts = productsFromStorage;
}


//------------------------------------------------- EVENT LISTENER FOR CLICKS

var productImageSection = document.getElementById('product-images');
productImageSection.addEventListener('click', handleProductClicks);

// the function below checks to see if an img was clicked on, if so it increases global totalClicks variable. also checks against the image source and if it matches, it increments that specific product's click count. tells page to render the randomized images, checks if the total clicks is the max clicks and if so, removes the event listener. also saves the clicked data to storage

function handleProductClicks(event){
  if(event.target.tagName === 'IMG'){
    totalClicks++;
  }

  var targetSrc = event.target.getAttribute('src');

  for (var i = 0; i < Product.allProducts.length; i++){

    if(Product.allProducts[i].imgSrc === targetSrc)
      Product.allProducts[i].clicked++;
  }

  renderSomeRandomImages();

  // when user gets to max clicks, remove the event listener and render the chart

  if(totalClicks === maxClicks){
    productImageSection.removeEventListener('click', handleProductClicks);
    renderTheChart();
  }

  // save to local storage- first stringify, then setItem

  var stringyProductCollection = JSON.stringify(Product.allProducts);

  localStorage.setItem('storedProducts', stringyProductCollection);
}

//-------------------------------------------- RENDER IMAGES
// uses the randomize function to choose a random product from 0 to the length of the array and assign it to three variables. first while loop checks to make sure there arent any duplicates in the three displayed, and if so it re-randomizes. after one assignment of the three random variables, those are passed to the randomImageIndexes array. the next while loops check the new variables against the array and if any match, it re-randomizes. this prevents any duplicates from showing up in the subsequent round.

var randomImageIndexes = [];

function renderSomeRandomImages(){

  var firstRandom = randomize(0, Product.allProducts.length);
  var secondRandom = randomize(0, Product.allProducts.length);
  var thirdRandom = randomize(0, Product.allProducts.length);

  while (firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom){
    firstRandom = randomize(0, Product.allProducts.length);
    secondRandom = randomize(0, Product.allProducts.length);
    thirdRandom = randomize(0, Product.allProducts.length);
  }

  while (firstRandom === randomImageIndexes[0] || firstRandom === randomImageIndexes[1] || firstRandom === randomImageIndexes[2]){
    firstRandom = randomize(0, Product.allProducts.length);
  }

  while (secondRandom === randomImageIndexes[0] || secondRandom === randomImageIndexes[1] || secondRandom === randomImageIndexes[2] || secondRandom === firstRandom){
    secondRandom = randomize(0, Product.allProducts.length);
  }

  while (thirdRandom === randomImageIndexes[0] || thirdRandom === randomImageIndexes[1] || thirdRandom === randomImageIndexes[2] || thirdRandom === secondRandom || thirdRandom === firstRandom){
    thirdRandom = randomize(0, Product.allProducts.length);
  }

  randomImageIndexes = [firstRandom, secondRandom, thirdRandom];

  // targets the picture and caption elements, increases the shown count each time a specific one is chosen
  var imgLeft = document.getElementById('left');
  var targetNameLeft = document.getElementById('left-name');
  var imgMiddle = document.getElementById('middle');
  var targetNameMiddle = document.getElementById('middle-name');
  var imgRight = document.getElementById('right');
  var targetNameRight = document.getElementById('right-name');

  imgLeft.src = Product.allProducts[firstRandom].imgSrc;
  Product.allProducts[firstRandom].shown++;
  targetNameLeft.textContent = Product.allProducts[firstRandom].productName;


  imgMiddle.src = Product.allProducts[secondRandom].imgSrc;
  Product.allProducts[secondRandom].shown++;
  targetNameMiddle.textContent = Product.allProducts[secondRandom].productName;


  imgRight.src = Product.allProducts[thirdRandom].imgSrc;
  Product.allProducts[thirdRandom].shown++;
  targetNameRight.textContent = Product.allProducts[thirdRandom].productName;

}
renderSomeRandomImages();

// function below to render the chart, this is called above when total clicks equals max clicks
function renderTheChart(){


  var productLabels = [];
  var productClicks = [];
  var productShown = [];

  for (var i = 0; i < Product.allProducts.length; i++){
    var prod= Product.allProducts[i];
    productLabels.push(prod.productName);
    productClicks.push(prod.clicked);
    productShown.push(prod.shown);
  }

  //------------------------------------------- MIXED CHART INFORMATION --------------

  var ctx = document.getElementById('myChart').getContext('2d');

  var mixedChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productLabels,
      datasets: [{
        label: '# of clicks',
        data: productClicks,
        backgroundColor: [
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)',
          'rgba(235, 40, 19, 0.2)'
        ],
        borderColor: [
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)',
          'rgba(235, 40, 19, 1)'
        ],
        borderWidth: 1
      },{
        label: '# times shown',
        data: productShown,
        type: 'line',
        fill: false,
        backgroundColor: [
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)',
          'rgba(48, 93, 235, 0.2)'
        ],
        borderColor: [
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)',
          'rgba(48, 93, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            max: 50,
            min: 0,
            stepSize: 1
          }
        }]
      }
    }
  });
}








