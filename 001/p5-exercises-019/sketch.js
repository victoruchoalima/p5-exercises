let walker
let stepSize = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#FBF4EA');
    walker = new Walker(width/2, height/2)
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

        //FOUR DIRECTION WALKER

        // let choice = floor(random(4))

        // if (choice===0){
        //     this.x = this.x + 1
        // } else if (choice===1){
        //     this.x = this.x -1
        // } else if (choice===2){
        //     this.y = this.y + 1
        // } else {
        //     this.y = this.y - 1
        // }

        //EIGHT DIRECTION WALKER

        let xstep = random(-1,1) * stepSize
        let ystep = random(-1,1) * stepSize

        this.x = this.x + xstep
        this.y = this.y + ystep

    }
}