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


var totalClicks = 0;
var maxClicks = 25;

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
  if(totalClicks === maxClicks){
    productImageSection.removeEventListener('click', handleProductClicks);
    // renderResultsToList();

    renderTheChart();

  }

  renderSomeRandomImages();
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

  for (var i = 0; i < Product.allProducts.length; i++){
    productLabels.push(Product.allProducts[i].productName);
  }

  var productClicks = [];
  for (i = 0; i < Product.allProducts.length; i++){
    productClicks.push(Product.allProducts[i].clicked);
  }

  var productShown = [];
  for (i = 0; i < Product.allProducts.length; i++){
    productShown.push(Product.allProducts[i].shown);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productLabels,
      datasets: [{
        label: '# of clicks',
        data: productClicks,
        backgroundColor: [
          //https://github.com/ashiguruma/patternomaly
          // pattern.draw('diamond', '#cc65fe'),
          // pattern.draw('diamond', '#cc65fe'),
          // pattern.draw('diamond', '#cc65fe'),
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# times shown',
        data: productShown,
        backgroundColor: [
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)',
          'rgba(231, 68, 249, 0.2)'
        ],
        borderColor: [
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)',
          'rgba(231, 68, 249, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            max: 20,
            min: 0,
            stepSize: 1
            // beginAtZero: true
          }
        }]
      }
    }
  });









}






