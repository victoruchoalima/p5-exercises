let font;


async function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL)
  font = await loadFont('./assets/Junicode.ttf')
  
  brush.set("HB", "#002185", 4);
  // noLoop()
}

function draw(){
  background(255)
  translate(-width/2, -height/2);
  textSize(100)
  textAlign(CENTER,CENTER)
  let contours = font.textToContours('nada nunca desapareceu completamente',width/2,height/2,{
    sampleFactor:1
  })
  console.log(contours)

  brush.beginShape()
  for (let contour of contours){
    // stroke(random(255), random(255), random(255));
    for(let points of contour){
    brush.vertex(points.x, points.y, 0.5)
  }
 }
 brush.endShape(true)
 
}
  
 
