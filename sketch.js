function setup() {
        createCanvas(640, 480);
}

function draw() {
        background(200);
        fill(255);
        textSize(40);
        textLeading((mouseX / width) * 80);
        text("Site under construction", 100, 100, 200, 200);
}
