// let t=0
let walkers = []

function setup(){
    createCanvas(windowWidth,windowHeight)
    background(0);
}

function draw(){
    


    for (let w of walkers){
        w.step()
        w.show()
    }
    
}

function mousePressed(){
   let walker = new Walker(mouseX,mouseY)
   walkers.push(walker)
}


class Walker {
    constructor(x,y){

        this.tx = random(1000)
        this.ty = random(1000)

        this.x = x
        this.y = y

        this.x0=x
        this.y0=y

    }

    show() {
        strokeWeight(2)
        fill(255)
        stroke(0)
        ellipse(this.x,this.y,48)
    }

    step(){
        let nx = noise(this.tx)
        let ny = noise(this.ty)

        this.x = map(nx,0,1,0,width)
        this.y = map(ny,0,1,0,height)

        this.tx = this.tx+0.01
        this.ty = this.ty+0.01

    }
}


/* 
1. ONE DIMENSION PERLIN NOISES can be thought of as a linear
sequence of values over time:

Time	Noise Value
0	     0.365
1	     0.363
2	     0.363
3	     0.364
4	     0.366

to access a particular noise value we have to choose a 'moment in time'
and pass it to the noise() function. ex:

let n = noise(3)

according to the table noise(3) returns 0.364. the next step 
is to use a variable for time and ask for a noise value continously in draw()

    let t=0

    function draw(){
        let n = noise(t)

        t = t+ 0.01
    }


 this increment value will affect the smoothness of the noise. larger jumps
 in time that skip ahead through the noise space produce values that are less smooth
 and more random.

 2. NOISE RANGES

 once we have noise values that range from 0 to 1 we have to map that range
 to whatever size suits our purpose. we can use p5js map() function to do this. this function takes
 5 arguments

 map(value,start1, stop1, start2, stop2,[withinBounds])

 value - the number we want to convert
 start1 and stop1 - the input range
 start 2 and stop2 - the output range
 withinBounds (optional) =
    true -> clamps the result inside output range
    false(default) -> allows overflow
*/

// let walkers = []

// function setup(){
//     createCanvas(windowWidth,windowHeight,WEBGL)
//     background(255);

//     brush.add("myBrush", {
//   type:    "default",
//   weight:  1.4,
//   scatter: 1.7,
//   sharpness: 0.47,
//   grain:     0.66,
//   opacity: 255,
//   spacing: 0.57,
//   noise:   1,
//   pressure: [1.1, 0.9],
//   rotate:  "natural",
// });
// }

// function draw(){
//     translate(-width/2, -height/2)

    
//     for (let w of walkers){
//         brush.set("myBrush");
//         w.step()
//         w.show()
//     }
    
// }

// function mousePressed(){
//    let walker = new Walker(mouseX,mouseY)
//    walkers.push(walker)
// }


// class Walker {
//     constructor(x,y){

//         this.tx = random(1000)
//         this.ty = random(1000)

//         this.x = x
//         this.y = y

//         this.x0=x
//         this.y0=y

//     }

//     show() {
//         brush.stroke(0)
//         brush.strokeWeight(1)
//         brush.mass("pastel", "#bb2727", {
//         precision: 0.55,
//         strength: 0.9,
//         gradient: 0.35,
//         outline: true,
//         });
//         brush.circle(this.x, this.y,48)
//     }

//     step(){
//         let nx = noise(this.tx)
//         let ny = noise(this.ty)

//         this.x = map(nx,0,1,0,width)
//         this.y = map(ny,0,1,0,height)

//         this.tx = this.tx+0.01
//         this.ty = this.ty+0.01

//     }
// }