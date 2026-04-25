// let x

// function setup() {
//     createCanvas(windowWidth, windowHeight,WEBGL);
//     setAttributes({ antialias: true });
//     background("#fffceb");
// }

// function draw() {
//     // translate(-width/2,-height/2)
//     orbitControl()
//     // frameRate(10)

//     x = randomGaussian(0,200)
//     y = randomGaussian(0,100)

//     fill("rgba(0, 191, 255, 0.14)")
//     stroke("rgba(255, 255, 255, 0.23)")
//     circle(x,y,50,50)
// }
// let x


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
      x: randomGaussian(0, 200),
      y: randomGaussian(0, 100),
      z: randomGaussian(0, 200),
      size: random(10, 35)
    });
  }

  fill("rgba(255, 17, 0, 0.14)");
  stroke("rgba(255, 255, 255, 0.12)");

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