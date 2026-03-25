let bubbles= [];

function setup() {
    createCanvas(windowWidth, windowHeight); 
    // for(let i=0;i<10;i++){
    //     let x = random(width)
    //     let y = random(height)
    //     let r = random(10,40)
    //     bubbles[i] = new Bubble(x,y,r)
    // }
}

function mousePressed(){
    let r = random(10,50)
    let b = new Bubble(mouseX, mouseY, r)

    bubbles.push(b);
}

function mouseDragged(){
    let r = random(10,50)
    let b = new Bubble(mouseX, mouseY, r)

    bubbles.push(b);
}

function draw() {
    background(0);
    
    // //sintaxe loop for
    // for(let i=0;i<bubbles.length;i++){
    //     bubbles[i].move()
    //     bubbles[i].show()
    // }

    //sintaxe loop for...of
    for (let bubble of bubbles){
        bubble.move();
        bubble.show();
    }
}


class Bubble {
    constructor(x,y,r){
        this.x=x
        this.y=y
        this.r=r
    }

    move(){
        this.x = this.x + random (-5,5)
        this.y = this.y + random (-5,5)
    }

    show() {
        stroke(255)
        strokeWeight(4)
        noFill()

        // noStroke()
        // fill(255,10)
        ellipse(this.x,this.y,this.r*2)
    }
}