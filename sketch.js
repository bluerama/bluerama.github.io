/*
Code inspired by the examples shown in Daniel Shiffman's "Nature of Code"
*/
// cavnas variable
var canvas;

// seed and perlin noise start point
var xoff = 0;
var t = 0;
var seed = 100;

// snow
var snow = [];
var flakes = 500;

// variable to hold the length of tree trunk
var treeLength;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("dynamic_background");
  smooth();
  for (var i = 0; i < flakes; i++) {
    snow.push(new snowFlake());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (var i = 0; i < flakes; i++) {
   snow[i].reset();
  }
}

function mouseWheel(event) {
  t += event.delta * 0.001;
  //console.log(event);
}

function draw() {
  // Light Steel Blue background
  //background('#A7C6DA');
  background('#3E8896')
  stroke(255);
  // translate current location. We'll draw the tree at (center, bottom)
  translate(width/2, height);

  // Move in noise space
  t += 0.005;
  randomSeed(seed);
  // Create the tree
  treeLength = height/6;
  branch(treeLength, xoff);


  // Text -- Website related
  //noStroke();
  // Minion Yellow color for text
  //fill('#F1DB4B');
  // Text at the starting of the trunk
  translate(-width/2, -height+treeLength);


  //textFont("monospace");
  //textSize(40);
  //textAlign(CENTER, CENTER);
  //text("bluerama", width/2, height-treeLength);

  // Snowflakes
  for (var i = 0; i < flakes; i++) {
    snow[i].update();
    snow[i].render();
  }
}

// snowFlake class
function snowFlake() {
  // TODO: Use arrays for position and velocity
  // TODO: Incorporate gravity
  // Position of the snowflake
  this.x = random(width);
  this.y = random(height);
  // Velocity of the snowflake
  //this.xspeed = map(noise(xoff, t), 0, 1, -3, 3);
  //this.yspeed = random(1, 4);
  // Diameter of the snowflake
  //this.diameter = map(this.yspeed, 1, 4, 5, 1);
  this.diameter = random(1, 5);

  this.update = function() {
    this.xspeed = map(noise(xoff, t), 0, 1, -3, 3);
    this.yspeed = map(this.diameter, 1, 5, 5, 1);
    // Add velocities to positions
    this.x += this.xspeed;
    this.y += this.yspeed;

    // If flake falls below screen place it on the top of screen
    if (this.y > height) {
      this.y = 0;
    }

    // Make sure that the snowflake stays within the screen
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
  };

  // Draw the snowflake
  this.render = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };

  this.reset = function() {
    this.x = random(width);
    this.y = random(height);
  };
}

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
      var theta = map(noise(xoff+i, t), 0, 1, -PI/3, PI/3);
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
