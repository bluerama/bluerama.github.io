var phrase = "Under construction...";
function setup() {
        createCanvas(640, 480);
        frameRate(10);
}

function draw() {
        background(200);
        fill(255);
        textSize(40);
        textAlign(CENTER, CENTER);
        var middle = phrase.length / 2;
        var left = middle - ((mouseX / width) * middle);
        var right = middle - ((mouseX / width) * middle);
        text(phrase.substring(left, right+1), width/2, height/2);
}
