//perlin noise 1 direction

let time

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    setAttributes({ antialias: true });
    time=0;
}

function draw() {
    background("#fffceb");
    
    orbitControl()
    
    let x = map(noise(time),0,1,-300,300)
    
    scale(0.5)

    noFill()
    stroke('rgba(0, 0, 0, 0.09)')
    
    push()
    translate(x-100,-150,0)
    sphere()
    stroke('rgba(255, 0, 0, 0.09)')
    translate(x,150,0)
    sphere()
    pop()

    push()
    translate(x + 200,-150,0)
    sphere()
    stroke('rgba(255, 0, 0, 0.09)')
    translate(x,150,0)
    sphere()
    pop()
    
    push()
    translate(x + 500,-150,0)
    sphere()
    stroke('rgba(255, 0, 0, 0.09)')
    translate(x,150,0)
    sphere()
    pop()
    
    push()
    translate(x -400 ,-150,0)
    sphere()
    stroke('rgba(255, 0, 0, 0.09)')
    translate(x,150,0)
    sphere()
    pop()
    
    
    
    time=time+0.01
}
