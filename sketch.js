/*
Code inspired by the examples shown in Daniel Shiffman's "Nature of Code"
*/
// cavnas variable
var canvas;

// seed and perlin noise start point
var xoff = 0;
var t = 0;
var seed = 100;

// variable to hold the length of tree trunk
var treeLength;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("dynamic_background");
  smooth();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseWheel(event) {
  t += event.delta * 0.001;
  console.log(event);
}

function draw() {
  background(255)
  stroke(0);
  // translate current location. We'll draw the tree at (center, bottom)
  translate(width/8, height);

  // Move in noise space
  t += 0.005;
  randomSeed(seed);
  // Create the tree
  treeLength = height/8;
  branch(treeLength, xoff);

}

// TODO: Make this a class
// Function to recursively draw the tree
function branch(h, xoff) {
  // thickness of branch is proportional to the position of branch on tree
  // highest branches have thinnest widths
  var sw = map(h, 2, height/6, 1, 5);
  strokeWeight(sw);

  // Draw the branch
  line(0, 0, 0, -h);
  // Translate to tip of branch
  translate(0, -h);

  // Child branches are 2/3 of parent branch
  h *= 0.667;
  // Make a move in noise space
  xoff += 0.1;
  // Terminating condition for recursion -- if length of branch is less than 2 pixels
  // 'Recurse' if terminating condition is not met
  if (h > 2) {
    // A random number of branches for each call to this function
    var n = Math.floor(random(1, 4));
    // Now, for each branch,
    for (var i = 0; i < n; i++) {
      // The angle the child branch makes with the parent branch
      // is mapped to the noise space.
      var theta = map(noise(xoff+i, t), 0, 1, -PI/4, PI/4);
      if (n % 2 == 0) {
        // Make every even branch 'blow' in the opposite direction
        theta *= -1;
      }

      // Create the branch
      push();
      rotate(theta);
      // Recursively call this function
      branch(h, xoff);
      pop();
    }
  }
}

