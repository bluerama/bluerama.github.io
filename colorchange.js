var i = 0;

function setup() {
  createCanvas(640, 480);
}

function draw() {
  while (i < 255) {
    background(i);
    if (i == 255) {
      i = 0;
    }
    i += 1;
  }  
}