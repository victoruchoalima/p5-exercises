

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0);
    strokeWeight(4);
    stroke(255);

    for (let x=0; x<= mouseX; x += 25) {

        for (let y=0; y<= mouseY; y += 25){
            fill(random(255),random(255),random(255));
            ellipse(x,y,25,25)
        }
    }

   
}
 