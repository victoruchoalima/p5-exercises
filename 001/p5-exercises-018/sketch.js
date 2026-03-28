let circles = []
let brushSeed = 0;
let brushFrameInterval = 6; // change brush look every 6 frames (~10fps)

function setup() {
    createCanvas(windowWidth, windowHeight,WEBGL);

  brush.add("myBrush", {
  type:    "default",
  weight:  0.9,
  scatter: 1.8,
  sharpness: 0.3,
  grain:     0.9,
  opacity: 170,
  spacing: 0.3,
  noise:   1,
  pressure: {
    mode: "gaussian",
    curve: [0.15, 0.2],
    min_max: [1.1, 0.9],
  },
  rotate:  "natural",
});
createCircles(30)
}

function draw() {
    background('#fffceb');
    translate(-width/2, -height/2);
    
    //  // Update the seed only every N frames → brush re-randomizes at ~10fps
    // if (frameCount % brushFrameInterval === 0) {
    //     brushSeed = frameCount;
    // }

    // randomSeed(brushSeed);
    // noiseSeed(brushSeed);
    
    brush.hatch(5, 30, {rand: 0.1, continuous: false, gradient: 0.8});
    
   
   for (i=0;i<circles.length;i++){
        if (i%2===0){
            brush.set('myBrush','#f0260e',1);
            circles[i].show()
        } else {
            brush.set('myBrush','#8dbce8',1);
            circles[i].show()
        }
   }

}

function createCircles(r){
    circles = [ ];
    let step = r*2;

    for(let x=0;x<width;x=x+step){
        for (let y=0;y<height;y=y+step){
            circles.push(new Circle(x,y,r))
        }
    }
}

class Circle{
    constructor(x,y,r){
        this.x=x
        this.y=y
        this.r=r
    }
 show(){
    noFill()
    brush.circle(this.x,this.y,this.r)
 }
}


//TIPS FOR THE FUTURE: e se as cores mudassem ao clicar num circulo? 