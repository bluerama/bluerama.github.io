/* 
Code inspired by example in Daniel Shiffman's "Nature of Code" book
*/

// seed and perlin noise start point
var t = 0;
var seed = 1;

function setup() {
        createCanvas(windowWidth, windowHeight);
        smooth();
}

function draw() {
        // Light Steel Blue background
        background('#A7C6DA');  
        
        stroke(255);
        
        // translate current location. We'll draw the tree at (center, bottom)
        translate(width/2, height);
        
        // Move in noise space
        t += 0.005;
        randomSeed(seed);
        
        // Create the tree
        branch(120, 0);
        
        // Text -- Website related
        noStroke();
        // Minion Yellow color for text
        fill('#F1DB4B');
        // Text at the starting of the trunk
        translate(-width/2, -height);
        textFont("monospace");
        textSize(40);
        textAlign(CENTER, CENTER);
        text("bluerama", width/2, height);
}

// Function to recursively draw the tree
function branch(h, xoff) {       
        // thickness of branch is proportional to the position of branch on tree
        // highest branches have thinnest widths
        var sw = map(h, 2, 120, 1, 5);
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
