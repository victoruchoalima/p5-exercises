// let x,y;

// function setup() {
//     createCanvas(windowWidth, windowHeight, WEBGL);
    
//    brush.add("myBrush", {
//   type:    "default",
//   weight:  1.68,
//   scatter: 3.9,
//   sharpness: 1,
//   grain:     1,
//   opacity: 255,
//   spacing: 0.07,
//   noise:   1,
//   pressure: [1.1, 0.9],
//   rotate:  "natural",
// });
// background(141, 188, 232);
// }

// function draw() {
// // background(141, 188, 232);
//   // randomSeed(1);
//   // noiseSeed(1);

//     x = mouseX - width/2
//     y = mouseY - height/2

//     brush.set('myBrush','#f0260e',1)
    
//     brush.line(x,y,400,300)
//     brush.rect(100,100,300,100)
// }

// ============================================================
// Seed-based approach:
// Runs at 60fps for smooth movement. Brush lines are drawn
// every frame (no blinking), but randomSeed/noiseSeed only
// changes every N frames — so the brush "jitter" updates at
// ~10fps while positions track the mouse at 60fps.
// ============================================================

let points=[]

const POINT_COUNT = 200;
const CONNECTION_DISTANCE=200;

let brushSeed = 0;
let brushFrameInterval = 6; // change brush look every 6 frames (~10fps)

function setup() {
   createCanvas(windowWidth, windowHeight, WEBGL);
   // 60fps (default) — no frameRate(10)

 brush.add("myBrush", {
  type:    "default",
  weight:  2.31,
  scatter: 3.9,
  sharpness: 1,
  grain:     1,
  opacity: 255,
  spacing: 0.06,
  noise:   1,
  pressure: {
    mode: "gaussian",
    curve: [0.22, 0.17],
    min_max: [0.55, 1],
  },
  rotate:  "natural",
});
    createPoints()
}

function draw() {
    background(141, 188, 232);
    translate(-width/2, -height/2);

    // Update the seed only every N frames → brush re-randomizes at ~10fps
    if (frameCount % brushFrameInterval === 0) {
        brushSeed = frameCount;
    }

    randomSeed(brushSeed);
    noiseSeed(brushSeed);

    brush.set('myBrush','#f0260e',1);

    let mousePoint = new Point(mouseX, mouseY);

    for (let p of points){
        p.drawPoints();

        if (p.isNear(mousePoint, CONNECTION_DISTANCE)){
            p.drawConnectionTo(mousePoint)
        }
    }
}


function createPoints(){
    points = [];

    for (let i=0; i< POINT_COUNT; i++){
        let x = random(width);
        let y = random(height);

        points.push(new Point(x,y))
    }
}

class Point{
    constructor(x,y){
        this.x=x
        this.y=y
    }  
    drawPoints(){
        stroke(241, 39, 15);
        strokeWeight(2);
        point(this.x,this.y)
    }

    distanceTo(other){
        return dist(this.x,this.y,other.x,other.y)
    }

    isNear(other, threshold){
        return this.distanceTo(other) < threshold;
    }

    drawConnectionTo(other){
        brush.line(this.x,this.y,other.x,other.y)
       
    }
}

