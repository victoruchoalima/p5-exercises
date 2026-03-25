//OBJECT COMMUNICATION
let bubbles = []
// let unicorn;
let isIntersecting = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i=0; i<100; i++){
        let x = random(width)
        let y = random(height)
        let r = random(10,50)
        bubbles[i] = new Bubble(x,y,r)
    }

    unicorn = new Bubble(width/2, height/2, 20)
}

function draw() {
    background(0);
    //first logic
    // let d = dist(bubble1.x,bubble1.y,bubble2.x,bubble2.y)
    // if (d<bubble1.r+bubble2.r){
    //     background(200,0,100)
    // }

    // if (bubble1.intersects(bubble2)){
    //     background(200,0,100)
    // }
    
    // unicorn.x = mouseX
    // unicorn.y = mouseY
    // unicorn.show()
    
    for (let i=0; i<bubbles.length; i++){
        bubbles[i].show()
        bubbles[i].move()
        
        let overlapping = false;

        for (let a=0;a<bubbles.length;a++){

            if(i !== a && bubbles[i].intersects(bubbles[a])){
                overlapping=true;
            }
        }

        if (overlapping){
            bubbles[i].changeColor(255)
        }else{
            bubbles[i].changeColor(0)
        }
       

        // if (unicorn.intersects(bubbles[i])){
        //     bubbles[i].changeColor(255)
        //     isIntersecting = true;
        // } else {
        //     bubbles[i].changeColor(0)
            
        // }
    }

    
   
}

class Bubble {
    constructor (x,y,r=50,c){
        this.x=x;
        this.y=y;
        this.r=r;
        this.brightness=0;

    }
    changeColor(bright){
        this.brightness = bright
    }

    contains(px,py){
        let d = dist(px,py,this.x,this.y)
        if(d<this.r){
            return true;
        } else {
            return false;
        }
    } 

    move() {
        this.x = this.x + random(-2,2)
        this.y = this.y + random(-2,2)
    }
    
    show(){
        stroke(255);
        strokeWeight(4);
        fill(this.brightness,125)
        ellipse(this.x, this.y,this.r*2)
    }

    intersects(bubble){
        let d = dist (this.x,this.y,bubble.x,bubble.y)
        let sum = this.r + bubble.r
        if (d>sum){
            return false
        } else {
            return true
        }
    }

}