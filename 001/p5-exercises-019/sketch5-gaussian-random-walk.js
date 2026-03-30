let walker;

function setup(){
    createCanvas(windowWidth, windowHeight)
    walker = new Walker()
    background(255)
}

function draw(){
    walker.show()
    walker.step()
}

class Walker{
    constructor(){
        this.x=width/2
        this.y=height/2
    }

    show(){
        stroke(0)
        point(this.x,this.y)

    }

    step(){
        let xstep = randomGaussian(0,3)
        let ystep = randomGaussian(0,3)

        this.x = this.x + xstep
        this.y = this.y + ystep
    }
}