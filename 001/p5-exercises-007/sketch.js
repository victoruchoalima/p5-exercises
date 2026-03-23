function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0);
    strokeWeight(4)
    stroke(255)
    

    //FOR LOOP

    for (let x=50; x<width; x = x + 50){
        fill(0,200,255)
        ellipse(x, 100,  25, 25)
    }

    // WHILE LOOP
    let x = 50

    while (x<width) {
        fill(200,0,200)
        ellipse (x, 200, 25,25);
        x = x + 50;
    }
    
}
