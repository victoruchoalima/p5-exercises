let font;
let contours;
let allContours=[]
let text = 'nada'



async function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL)
  font = await loadFont('./assets/Junicode.ttf')
  textSize(400)
  textAlign(CENTER,CENTER)
  
  brush.set("2B", "#002185", 2);
  // noLoop()
  allContours=[]
  
  for (let i=0; i<text.length;i++){
    let ch = text[i]


    let contour = font.textToContours(ch,width/2,height/2,{
      sampleFactor:0.3
    })
  
    allContours.push(contour)
  
  }
}

function draw(){
  background(255)
  // noFill()
  translate(-width/2, -height/2);
 

  for (let i = 0; i < allContours.length; i++) {
    let letter = allContours[i];
    
    for(let j=0;j<letter.length;j++){
      let idvContour = letter[j]
      beginShape()

      for(let k=0; k<idvContour.length;k++){
        let v = idvContour[k];
        vertex(v.x,v.y)
      }
      endShape()
    }
}
 
}

// for the future. this is interesting in the forming of shapes by word, but i need to solve yet the problem of spacing and kerning.