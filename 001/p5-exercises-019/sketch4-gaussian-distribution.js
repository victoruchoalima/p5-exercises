function setup(){
    createCanvas(windowWidth, windowHeight)
    background(255)
    
    
}

function draw(){
    let x = randomGaussian(320,50)
    // let y = randomGaussian(320,30)
    noStroke()
    fill(0,10)
    circle(x,height/2,16)

}