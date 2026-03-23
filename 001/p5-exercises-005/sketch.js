let r = 0;
let b = 0;


function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {

    //bg
    r = map(mouseX,0,width,0,255)
    b = map(mouseX,0,width,255,0)
    background(r,0,b);

    //ellipse

    fill(250,118,222)
    ellipse(mouseX,height/2,64,64)
}
