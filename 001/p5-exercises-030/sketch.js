let boxes = [];
let running = true;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes({ antialias: true });
}

function draw() {
  background("#fffceb");

  orbitControl();

  if (running) {
    boxes.push({
      x: customRandom(-400,400),
      y: customRandom(-400,400),
      z: customRandom(-400,400),
      size: random(10, 35)
    });
  }

//   fill("rgba(255, 17, 0, 0.14)");
  noFill()
  stroke('rgba(255, 17, 0, 0.25)')

  for (let b of boxes) {
    push();
    translate(b.x, b.y, b.z);
    box(b.size);
    pop();
  }
}

function mousePressed() {
  running = !running;
}
/** 
 * o que acontece nesse algoritmo acceptReject é que se utiliazmos a parte da probabilidade porque apenas comparar r1 e r2 não daria em nada.
 * quando colocamos a probabilidade dessa forma estamos dizendo que quanto maior ou menor o valor de r1 maior a constante que vamos mandar poara comparar com r2, portanto
 * se r1 = 1 colocamos a probabilidade 1 e dificilmente r2 sera maior portanto o valor de r1 retornará, o mesmo vale para o valor 0 de r1, apesar de ser 0 ser o valor retornado
 * na comparação com r1 ele vai ser 1 e não zero e por isso zero sera retornado.
 */
function acceptReject(){
    while (true) {
        let r1 = random(1)
        let probability = abs(r1 - 0.5) *2 // se r1 = 0 -> 1 se r1 = 1 -> 1 se r1=0.5 -> 0
        let r2 = random(1)

        if (r2<probability){
            return r1
        }
    }
}

function customRandom(min,max){
    return map(acceptReject(),0,1,min,max)
}
