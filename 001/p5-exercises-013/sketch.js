let bubbles= [];



function setup() {
    createCanvas(windowWidth, windowHeight); 
    for(let i=0;i<10;i++){
        let x = random(width)
        let y = random(height)
        let r = random(10,40)
        let b = new Bubble(x,y,r)
        bubbles.push(b)
    }
    
}

function mousePressed(){
    for (let i=0;i<bubbles.length;i++){
        bubbles[i].clicked(mouseX,mouseY)
    }
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
        this.brightness=0
    }

    clicked(px,py){
        let d = dist(px,py,this.x,this.y)
        if (d<this.r){
            this.brightness = 255
        }
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
        fill(this.brightness,125)
        ellipse(this.x,this.y,this.r*2)
    }
}

/* this is called linear search, where every click on the canvas loops through
all bubbles and checks distance. for now (this quantity) it is an ok approach,
but for scalling we would need to think in better strategies like checking which 
bubbles could possibly be near the click and only check them*/