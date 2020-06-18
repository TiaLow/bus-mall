/*

  Goal today is to preserve the votes in between refreshes
  we will do this by saving them into local storage and retrieving them

  retrieval should happen at the start

  when should we save our goats
  - chose to do it every click

*/

// ======= Global variables ======
var goatCollection = []; // TODO: save this into local storage
var totalClicks = 0;
var maxClicks = 5;

// constructors are always nouns
function Goat(imageSource, caption){
  this.clicked = 0;
  this.shown = 0;
  this.imageSrc = imageSource;
  this.imageCaption = caption;

  goatCollection.push(this);
}

new Goat('images/cruisin-goat.jpg', 'A goat that is cruisin.');
new Goat('images/smiling-goat.jpg', 'A goat that is rocking a smile.');
new Goat('images/float-your-goat.jpg', 'A goat that is rocking a float.');
new Goat('images/sassy-goat.jpg', 'A goat that is rocking a sass.');
new Goat('images/goat-out-of-hand.jpg', 'A goat that is rocking a hand.');
new Goat('images/kissing-goat.jpg', 'A goat that is rocking a kiss.');
new Goat('images/goat-away.jpg', 'A goat that is rocking a away.');
new Goat('images/sweater-goat.jpg', 'A goat that is rocking a sweater.');


//1. retrieve with getItem
var stringyGoatsFromStorage = localStorage.getItem('storedGoats');
// 2. parse or unstringy the object with JSON.parse
var goatsFromStorage = JSON.parse(stringyGoatsFromStorage);
console.log('goats from storage', goatsFromStorage);

// THIS SHOULD ONLY HAPPEN IF THERE ARE THINGS IN LOCAL STORAGE
if(goatsFromStorage){ // if goatsFromStorage is truthy
  goatCollection = goatsFromStorage;
}






var goatImageSection = document.getElementById('goat-images');
goatImageSection.addEventListener('click', handleClickOnAGoat);

function handleClickOnAGoat(event){
  if(event.target.tagName === 'IMG'){
    totalClicks++;

    // https://stackoverflow.com/questions/14221231/find-relative-path-of-a-image-tag-javascript
    var targetSrc = event.target.getAttribute('src');
    for(var i = 0; i < goatCollection.length; i++){
      if (goatCollection[i].imageSrc === targetSrc) {
        goatCollection[i].clicked++;
      }
    }

    rerenderSomeRandomImages();

    if (totalClicks === maxClicks) {
      goatImageSection.removeEventListener('click', handleClickOnAGoat);
      renderTheChart();
    }

    // save goats to local storage
    // 1. stringify it
    var stringyGoatCollection = JSON.stringify(goatCollection);
    console.log('stringy array', stringyGoatCollection);
    // 2. save it
    localStorage.setItem('storedGoats', stringyGoatCollection);


  } else {
    alert('click an img please');
  }
}



function rerenderSomeRandomImages(){
  var firstRandom = pickRandom(0, goatCollection.length);

  var secondRandom = pickRandom(0, goatCollection.length);

  while(secondRandom === firstRandom){
    secondRandom = pickRandom(0, goatCollection.length);
  }

  var leftImage = document.getElementById('left-image');
  var leftText = document.getElementById('left-text');
  var rightImage = document.getElementById('right-image');
  var rightText = document.getElementById('right-text');

  leftImage.src = goatCollection[firstRandom].imageSrc;
  leftText.textContent = goatCollection[firstRandom].imageCaption;
  goatCollection[firstRandom].shown++;

  var secondGoat = goatCollection[secondRandom];
  rightImage.src = secondGoat.imageSrc;
  rightText.textContent = secondGoat.imageCaption;
  secondGoat.shown++;

}

function pickRandom(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

function renderTheChart(){
  console.log('about to render the chart');



  var goatLabels =[];
  for(var i = 0; i < goatCollection.length; i++){
    goatLabels.push(goatCollection[i].imageCaption);
  }


  var goatClicks = [];
  for(i = 0; i < goatCollection.length; i++){
    goatClicks.push(goatCollection[i].clicked);
  }

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: goatLabels,
      datasets: [{
        label: 'Goat clicks',
        data: goatClicks,
        backgroundColor: [
          'rgba(' + 255 + ', ' +99 + ', ' + 132 +', 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'Goat clicks',
        data: goatClicks,
        backgroundColor: [
          'rgba(' + 255 + ', ' + 99 + ', ' + 132 + ', 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
        type: 'line',
      },
      {
        label: 'Goat clicks',
        data: goatClicks,
        backgroundColor: [
          'rgba(' + 255 + ', ' + 99 + ', ' + 132 + ', 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
        type: 'bar',
      }]
    },
    options: {
      // https://stackoverflow.com/questions/26257268/click-events-on-pie-charts-in-chart-js
      onClick: function (event){
        console.log(event);
        console.log(myChart.getElementsAtEvent(event));
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}