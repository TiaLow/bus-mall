'use strict';

// console.log('Sup!');

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

// goal today is to preserve the votes in between refreshes
// we will do this by saving them into local storage and retrieving them
// retrieve the goat data before you start clicking
// when should we save our products? at every click (in case user exits out of browser midway through game)





var totalClicks = 0;
var maxClicks = 15; //CHANGE BACK TO 25 WHEN DONE

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//----------------------------------------------------------------------------------
//--------------------------------------------- CONSTRUCTOR FUNCTION ---------------
//----------------------------------------------------------------------------------

function Product(productNameParameter, imageSource){
  this.clicked = 0;
  this.shown = 0;
  this.productName = productNameParameter;
  this.imgSrc = imageSource;

  Product.allProducts.push(this);
}

Product.allProducts = []; //GOAL IS TO SAVE THIS INTO LOCAL STORAGE

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


// ------------------------------------------------ RETRIEVE FROM STORAGE

// 1. retrieve with getItem
var stringyProductsFromStorage = localStorage.getItem('storedProducts');

// 2. parse/unstringify object with JSON.parse

var productsFromStorage = JSON.parse(stringyProductsFromStorage);
console.log('prods from storage, fingers crossed', productsFromStorage);

if(productsFromStorage){
  Product.allProducts = productsFromStorage;
}


//------------------------------------------------- EVENT LISTENER FOR CLICKS

var productImageSection = document.getElementById('product-images');
productImageSection.addEventListener('click', handleProductClicks);

function handleProductClicks(event){
  if(event.target.tagName === 'IMG'){
    totalClicks++;
  }

  var targetSrc = event.target.getAttribute('src');
  // debugger;
  for (var i = 0; i < Product.allProducts.length; i++){

    if(Product.allProducts[i].imgSrc === targetSrc)
      Product.allProducts[i].clicked++;
  }

  renderSomeRandomImages();

  if(totalClicks === maxClicks){
    productImageSection.removeEventListener('click', handleProductClicks);
    // renderResultsToList();
    renderTheChart();
  }



  //----------------------------------------- SAVE THE GOODS TO LOCAL STORAGE
  //1. stringify it

  var stringyProductCollection = JSON.stringify(Product.allProducts);
  // console.log('stringy array, fingers crossed', stringyProductCollection);

  //2. save that shiz
  localStorage.setItem('storedProducts', stringyProductCollection);


}

//-------------------------------------------- RENDER IMAGES

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


  //   // 1.

  //   var target = document.getElementById('images');
  //   target.innerHTML = '';

  //   // 2.
  //   var imgLeft = document.createElement('img');
  //   var textLeft = document.createElement('figcaption');

  // // 2.5
  //   var theIndexOfThisImage = randomImageIndexes[i]
  //   var firstProduct = Product.Product.allProducts[randomImageIndexes[theIndexOfThisImage]];
  //   imgLeft.src = firstProduct.imgSrc;
  //   textLeft.textContent = firstProduct.productName;
  //   firstProduct.shown++;

  // if the above works once, need to put this in the loop, but move target.innerHTML outside the foor loop

  // console.log(firstRandom, secondRandom, thirdRandom);

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

//-------------------------------------------------- RENDER RESULTS TO LIST

// function renderResultsToList(){
//   var list = document.getElementById('results-list');


//   for (var i=0; i < Product.allProducts.length; i++){
//     var listItem = document.createElement('li');

//     listItem.textContent = (Product.allProducts[i].productName + ' product: ' + Product.allProducts[i].clicked + ' votes, displayed: ' + Product.allProducts[i].shown + ' times');

//     list.appendChild(listItem);
//   }
// }


function renderTheChart(){
  // console.log('charting....charting.....');


  var productLabels = [];
  var productClicks = [];
  var productShown = [];

  for (var i = 0; i < Product.allProducts.length; i++){
    var prod= Product.allProducts[i];
    productLabels.push(prod.productName);
    productClicks.push(prod.clicked);
    productShown.push(prod.shown);
  }


  // var img = new Image();
  // img.src = 'img/bag.jpg';
  // img.onload = function() {

  var ctx = document.getElementById('myChart').getContext('2d');
  // var fillPattern = ctx.createPattern(img, 'repeat');
  var mixedChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productLabels,
      datasets: [{
        label: '# of clicks',
        data: productClicks,
        backgroundColor: [

          //TODO- make the product image repeat the number of times it was clicked, to be the bar graph

          //https://github.com/ashiguruma/patternomaly
          // pattern.draw('diamond', '#cc65fe'),
          // pattern.draw('diamond', '#cc65fe'),
          // pattern.draw('diamond', '#cc65fe'),
          // fillPattern,
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
            // beginAtZero: true
          }
        }]
      }
    }
  });
}








