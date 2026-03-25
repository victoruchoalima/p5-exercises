let words = ['eu','quero','ver','você','dizer','que','eu','sou','ruim']
let index = 0
let myFont;
let showAll = false;

async function setup() {
    createCanvas(800, 600);
    myFont = await loadFont('assets/DepartureMono-Regular.otf');
}

function draw() {
    background(255);
    textFont(myFont)
    textSize(32)

    if (showAll) {
        for(let x=0; x<words.length;x++){
            text(words[x],12,100 + x*50)
        } 
    }else {
        text(words[index],12,200)
    }
}

function mousePressed(){
    index = index+1

    if (index===words.length){
        showAll=true    
    } else if (index>words.length) {
        showAll=false
        index=0
    }
}