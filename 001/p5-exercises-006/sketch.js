let pg;

function setup() {
    createCanvas(windowWidth, windowHeight,);
    pg = createGraphics(width,height)
}

function draw() {
    background(220);
    fill(144, 34, 28)
    circle(mouseX,mouseY,40,40)
    
    pg.fill(255)
    pg.circle(random(width),random(height),60,60)
    image(pg,0,0)
}
