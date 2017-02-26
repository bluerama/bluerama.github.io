var phrase = "Website under construction";
function setup() {
        //var cnv = createCanvas(600, 400);
        //var x = (windowWidth - width) / 2;
        //var y = (windowHeight - height) / 2;
        //cnv.position(x, y);
        createCanvas(windowWidth, windowHeight);
}

function draw() {
        background(120, 200, 255);
        fill(255);
        textSize(40);
        textFont("Helvetica");
        textAlign(CENTER, CENTER);
        var middle = phrase.length / 2;
        var left = middle - ((mouseX/width) * middle);
        var right = middle + ((mouseX/width) * middle);
        text(phrase.substring(left, right+1), width/2, height/2);
        
}
