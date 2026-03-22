function setup() {
    createCanvas(600, 600);
    pixelDensity(window.devicePixelRatio)
}

function draw() {
    background(220);
    
    triangle(300,300,0,0,600,0)
    
    line(0,0,600,600)
    line(600,0,0,600)
    
    quad(100,100,500,100,500,500,100,500)
    
    rectMode(CENTER)
    rect(300,330,150,300,30)
    
   
    square(300,330,120,30)
    circle(260,300,15)
   
    // ellipse(300,340,40,20)
    // point(300,300)



}

// new p5((p)=>{
//     p.setup = function (){
//         p.createCanvas(600,600,p.WEBGL)
//     }

//     p.draw = function(){
//         p.background(220)
//         p.rect(0,0,50,50)
//     }
// })