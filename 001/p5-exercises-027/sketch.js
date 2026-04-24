let font
// let text = 'oooooooooooooooo\nooonadaonuncaooo\nooodesapareceuooo\noocompletamenteoo\noooooooooooooooo'
let text = 'nada nunca\ndesapareceu\ncompletamente'
let contours


async function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    font = await loadFont('./assets/Junicode.ttf')
    textFont(font)
    textSize(80)
    textAlign(CENTER,CENTER)
    pixelDensity(window.devicePixelRatio);

    
    contours = font.textToContours(text, width/2,height/2,{
        sampleFactor:0.8
    })
    // noLoop()

   
}

function draw() {
  
    background("#ff2911");
    translate(-width/2, -height/2)
 
    frameRate(10)
    brush.noStroke()
   
    brush.hatch(5, 0, {rand: 0.1, continuous: false, gradient: 0.01});
    brush.hatchStyle("pastel", "#000000",4);

    for (let contour of contours){
       brush.beginShape()
       
        for(let p of contour){
            brush.vertex(p.x,p.y)
        }
        brush.endShape()
    }
    
}

