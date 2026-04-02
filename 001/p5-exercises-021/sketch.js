let url = './assets/DepartureMono-Regular.otf'
// let url = "https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"

let font, allPoints


async function setup() {
    createCanvas(windowWidth, windowHeight);
    font = await loadFont(url)
    textFont(font)

    textSize(60)
    textAlign(CENTER,CENTER)
    // text('circuladô de fulô',width/2,height/2)
     let options = {
        sampleFactor:0.1,
        // simplifyThreshold:0.01,
    }
    
    allPoints = font.textToContours('circuladô de fulô',width/2,height/2,options)
   
}

function draw() {
    background(255)
//TEXT TO CONTOURS
    for (let i = 0;i<allPoints.length;i++){
        let letterPoints = allPoints[i]
        for (let j = 0; j<letterPoints.length;j++){
            let pt = letterPoints[j]
            strokeWeight(2);
            noStroke();
            fill(0);
            rectMode(CENTER);
            rect(pt.x,pt.y,4,8)
            // point(pt.x,pt.y)
        }
    }

    //nice to check also the angle property inside options

     // USING BEGINSHAPE AND ENDSHAPE TO DRAW THE LETTERS
    // for (let i = 0;i<allPoints.length;i++){
    //     let letterPoints = allPoints[i]
    //     beginShape()
    //     for (let j = 0; j<letterPoints.length;j++){
    //         let pt = letterPoints[j]
    //         strokeWeight(1)
    //         vertex(pt.x,pt.y)
    //     }
    //     endShape()
    // }
    
    
}


/*
    1. sin() - é simplesmente uma função que recebe um angulo e retorna um valor entre -1 e 1 [preciso revisar um pouco de seno/coseno]


    let url = "https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"
    let angle = 0;

    async function setup() {
        createCanvas(windowWidth, windowHeight);
        let font = await loadFont(url)
        textFont(font)
    }

    function draw() {
        background(255);
        let w = map(sin(angle),-1,1,100,900)

        textSize(60)
        textWeight(w)
        textAlign(CENTER,CENTER)
        text('circuladô de fulô',width/2,height/2)

        angle = angle + 0.1
}




*/