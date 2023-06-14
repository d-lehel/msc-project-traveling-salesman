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
let currentFrame = 0;

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
  currentIndex = 0;
  currentFrame = 0;
  loop();
}

function setup() {
  // Generate the p5.js canvas and place it inside the container
  const canvasWidth = 785;
  const canvasHeight = 807;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas-container");

  // Generate random cities
  cities = [];
  numberOfCities = 30;
  for (let i = 0; i < numberOfCities; i++) {
    const x = random(10, canvasWidth - 10);
    const y = random(30, canvasHeight - 10);
    const city = createVector(x, y);
    cities.push(city);
  }
  currentIndex = 0;
  // iteration count
  currentFrame = 0;
}

// while loop
function draw() {
  // draw cities and path
  background(255);
  frameRate(parseInt(speedInput.value));

  beginShape();
  for (let i = 0; i < numberOfCities; i++) {
    vertex(cities[i].x, cities[i].y);
    fill(50);
    noStroke();
    const citySize = 12;
    ellipse(cities[i].x, cities[i].y, citySize, citySize);
  }
  noFill();
  stroke(0);
  strokeWeight(3);
  endShape(CLOSE);

  // Perform 2-opt algorithm
  // Store previous frame and index values for convergence check
  let previousFrame = currentFrame; // iteration
  let previousIndex = currentIndex; // city index

  // Iterate through all possible city pairs using 2-opt algorithm
  // top: {
    for (let i = currentIndex; i < numberOfCities; i++) {
      for (let j = i + 2; j < numberOfCities; j++) {
        // Calculate the current distance of the tour
        const currentDistance =
          cities[i].dist(cities[(i + 1) % numberOfCities]) + cities[j].dist(cities[(j + 1) % numberOfCities]);

        // Calculate the new distance after swapping two edges
        const newDistance =
          cities[i].dist(cities[j]) +cities[(i + 1) % numberOfCities].dist(cities[(j + 1) % numberOfCities]);

        // Check if the new distance is shorter than the current distance
        if (newDistance < currentDistance) {
          // Reverse the section between the cities and reorganize the tour
          const reversedSection = cities.slice(i + 1, j + 1).reverse();
          cities.splice(i + 1, j - i, ...reversedSection);

          // Update frame and index values
          currentFrame++;
          currentIndex = i;

          // Exit the nested loops and continue with the next iteration
          // break top;
          break
        }
      }
    // }

    // If the loop completes without any changes, reset the current index
    currentIndex = 0;
  }

  // if no progress since the last frame
  if (currentFrame === previousFrame && previousIndex === 0) {
    noLoop(); // end of loop
    console.log("cities:", cities);
    console.log("city:", cities[0]);
  }

  // Calculate path length
  let pathLength = 0;
  for (let i = 0; i < numberOfCities; i++) {
    const distance = cities[i].dist(cities[(i + 1) % numberOfCities]);
    pathLength += distance;
  }

  // Display iteration and road length
  textSize(25);
  fill(50);
  noStroke();
  text("Iteration: " + currentFrame, 20, 20);
  text("Road length: " + Math.round(pathLength) + " km", 500, 20);
}
