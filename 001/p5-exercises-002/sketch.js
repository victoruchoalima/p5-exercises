let isRed = false;

function setup() {
    createCanvas(800, 800);
}

function draw() {

    if (isRed) {

        background(mouseY,0,0)
    } else{

        background(0,0,0);
    }

    noStroke();
    fill(255);
    rectMode(CENTER);
    square(mouseX, mouseY, 24);
}

function mousePressed(){
    isRed = !isRed
}