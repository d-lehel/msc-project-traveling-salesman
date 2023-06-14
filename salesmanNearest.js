var cityInput = document.getElementById("cityNumber");
var speedInput = document.getElementById("simulationSpeed");
var restartButton = document.getElementById("restartButton");

speedInput.addEventListener("input", function () {
  frameRate(parseInt(speedInput.value));
});

restartButton.addEventListener("click", function () {
  restartAlgorithm();
});

let cities = [];
let currentIndex = 0;
let iteration = 0;

function restartAlgorithm() {
  let value = parseInt(cityInput.value);
  if (value > 1000) {
    cityInput.value = 1000;
    numberOfCities = 1000;
  } else {
    numberOfCities = value;
  }

  cities = [];
  for (let i = 0; i < numberOfCities; i++) {
    const city = createVector(random(10, width - 10), random(70, height - 10));
    cities.push(city);
  }
  cityIndex = 0;
  iteration = 0;
  loop();
}

function setup() {
  const canvasWidth = 785;
  const canvasHeight = 807;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas-container");

  var initialLength = 0;
  cities = [];
  numberOfCities = parseInt(cityInput.value);
  for (let i = 0; i < numberOfCities; i++) {
    const x = random(10, canvasWidth - 10);
    const y = random(30, canvasHeight - 10);
    const city = createVector(x, y);
    cities.push(city);
  }
  cityIndex = 0;
  iteration = 0;
}

function draw() {
  background(255);
  frameRate(parseInt(speedInput.value));

  /////////////////////////////////////////
  ///// draw current path and cities /////
  ///////////////////////////////////////

  beginShape();
  for (let i = 0; i < numberOfCities; i++) {
    citySize = 12;
    vertex(cities[i].x, cities[i].y);
    if (i == cityIndex) {
      fill(0, 123, 255);
      citySize = 25;
    } else {
      fill(50);
    }
    // draw cities
    ellipse(cities[i].x, cities[i].y, citySize, citySize);
  }
  noFill();
  stroke(0);
  strokeWeight(2.5);
  endShape(CLOSE);

  ///////////////////////////////////////////////
  ///// Perform Nearest Neighbor heuristic /////
  /////////////////////////////////////////////

  if (cityIndex < numberOfCities - 1) {
    let currentCity = cities[cityIndex];
    let minDistance = Infinity;
    let nearestNeighborIndex = -1;

    for (let i = cityIndex + 1; i < numberOfCities; i++) {
      const distance = currentCity.dist(cities[i]);
      if (distance < minDistance) {
        minDistance = distance;
        nearestNeighborIndex = i;
      }
    }

    /////////////////////////////////////////////////////////////
    ///// Connect the current city to its nearest neighbor /////
    ///////////////////////////////////////////////////////////

    stroke(0, 123, 255);
    strokeWeight(4);
    line(
      currentCity.x,
      currentCity.y,
      cities[nearestNeighborIndex].x,
      cities[nearestNeighborIndex].y
    );

    /////////////////////////////////////////////////////////////////////
    ///// Swap the nearest neighbor with the next city in the list /////
    ///////////////////////////////////////////////////////////////////

    [cities[cityIndex + 1], cities[nearestNeighborIndex]] = [
      cities[nearestNeighborIndex],
      cities[cityIndex + 1],
    ];
  } else {
    noLoop(); // end of loop
    console.log("cities:", cities);
    console.log("city:", cities[0]);
  }

  // Calculate whole path length
  let pathLength = 0;
  for (let i = 0; i < numberOfCities - 1; i++) {
    const distance = cities[i].dist(cities[i + 1]);
    pathLength += distance;
  }
  // Add the distance from the last city to the first city to complete the path
  pathLength += cities[numberOfCities - 1].dist(cities[0]);

  if (cityIndex == 0) initialLength = pathLength;

  // Display iteration and road length
  textSize(20);
  fill(50);
  noStroke();
  text("Iteration: " + iteration, 20, 20);
  text("Initial length: " + Math.round(initialLength) + " km", 250, 20);
  text("Optimized length: " + Math.round(pathLength) + " km", 500, 20);

  cityIndex++;
  iteration++;
}
