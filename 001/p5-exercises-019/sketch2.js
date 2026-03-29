let walkers = []
let stepSize = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#FBF4EA');
    
}

function draw() {
    NewWalker()
    renderWalkers()
}

    function mousePressed(){
        walkers.push(new Walker(mouseX,mouseY))
    }
    function NewWalker(){
        let chance = random(1)

        if (chance<0.01){

            walkers.push(new Walker(random(0,windowWidth),random(0,windowHeight)))
            
        } else{
            return
        }
    }

    function renderWalkers(){
        for( let w of walkers){
                w.show()
                w.step()
            }
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

        if (r<0.4){ // 40% chance
            this.x = this.x+1
        } else if (r<0.6){ //20% chance
            this.x = this.x-1
        }else if(r<0.8){ //20% chance
            this.y = this.y+1
        }else{
            this.y = this.y -1 //20% chance
        }

    }

    
}