let font;
let textGeom

async function setup(){
    createCanvas(windowWidth,windowHeight,WEBGL)
    font = await loadFont('./assets/DepartureMono-Regular.otf')
    textFont(font)
    textSize(80)
    textAlign(CENTER,CENTER)
    fill(0,50)
    stroke(255)
    let options = {
        extrude:50,
        sampleFactor:0.5
        
    }
    textGeom = font.textToModel('chu',0,0,100,options)
}

function draw(){
    background(0)

    model(textGeom)
    orbitControl()
}