let circleX = 0
let circleY = 0
let circleSize;
let params = {
    lineWidthMin:5,
    lineWidthMax:50,
    circleSizeMin:6,
    circleSizeMax:300,
    strokeAlpha:10,
    fillAlpha:10
}

function setup() {
    createCanvas(800, 800);
    background(34, 45, 99)

    const gui = new GUI()
    gui.add(params,'lineWidthMin',1,100)
    gui.add(params, 'lineWidthMax', 1, 300)
    gui.add(params, 'circleSizeMin', 1, 500)
    gui.add(params, 'circleSizeMax', 1, 500)
    gui.add(params,'strokeAlpha',0,255)
    gui.add(params,'fillAlpha',0,255)
}

function draw() {

    // background(255);
    // noStroke()
    // stroke(255,255,255) //versão sem smooth
    // fill(255,0,0)
    stroke(144, 34, 28,params.strokeAlpha)
    fill(239, 139, 29,params.fillAlpha)
    strokeWeight(random(params.lineWidthMin, params.lineWidthMax))
    circleSize = random(params.circleSizeMin, params.circleSizeMax)
    circle(circleX,circleY,circleSize)
    circle(400,400,circleSize)

    circleX = circleX + 2
    circleY = circleY + 2
}

function mousePressed(){
    circleX=0
    circleY=0
}

