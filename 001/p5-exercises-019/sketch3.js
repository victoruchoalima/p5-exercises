let walker
let stepSize = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#FBF4EA');
    walker = new Walker(width/2,height/2)
    
}

function draw() {

    walker.show()
    walker.step()
}

   

class Walker{
    constructor(x,y,){
        this.x=x
        this.y=y
    }

    show(){
        stroke(0)
        strokeWeight(stepSize)
        point(this.x,this.y)
    }

    step(){
        
        let r = random(1)

        if (r<0.5){ // 50% chance
            if (random(1)<0.5){
                this.x += (mouseX> this.x) ? 1:-1
            } else {
                this.y += (mouseY>this.y)? 1: -1
            }
        } else if (r<0.6){ //20% chance
            this.x = this.x-1
        }else if(r<0.8){ //20% chance
            this.y = this.y+1
        }else{
            this.y = this.y -1 //10% chance
        }

    }

    
}