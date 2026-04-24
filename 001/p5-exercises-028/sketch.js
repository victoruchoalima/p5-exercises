
let walker;
let params = {
    weight:1
}

function setup() {
    createCanvas(windowWidth, windowHeight,WEBGL); 
    walker = new Walker()

    gsap.to(params,{
        weight:10,
        duration:2,
        repeat:-1,
        yoyo:true,
        ease:'power1.inOut'
    })
}

function draw() {
    background("#fffceb");
    orbitControl()
    
    walker.step()
    scale(20)
    walker.show()
    
}

class Walker{
    constructor(){
        this.x=0
        this.y=0
        this.z=0

        this.history=[]
    }

    show() {
        strokeWeight(params.weight)
        stroke("#df0b0b")
        noFill()
        beginShape(POINTS);
        for (let v of this.history){
        vertex(v.x,v.y,v.z)
        }
        endShape()
    }

    step() {
       let xstep = floor(random(3)) -1
       let ystep = floor(random(3)) -1
       let zstep = floor(random(3)) -1


       this.x = this.x + xstep
       this.y = this.y + ystep
       this.z = this.z + zstep

       this.history.push({x:this.x, y:this.y,z:this.z})
    }
}

