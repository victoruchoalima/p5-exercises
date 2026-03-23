let squareX;
let squareY;

let stepSize = 100;
let half;

let directions = ['left','right','up','down'];
let direction = 'left';

let stepCount = 0;
let stepsPerDirection = 2;

let showGrid = true;

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(10);

    half = stepSize / 2;

    // grid dimensions
    let cols = floor(width / stepSize);
    let rows = floor(height / stepSize);

    // start in center cell
    let col = floor(cols / 2);
    let row = floor(rows / 2);

    squareX = col * stepSize + half;
    squareY = row * stepSize + half;

    background(144, 34, 28); // trails
}

function draw(){

    //  draw grid (optional)
    if (showGrid) drawGrid();

    //  draw centers (optional)
    if (showGrid) drawCenters();

    //  draw square
    fill(239, 139, 29);
    noStroke();
    rectMode(CENTER);
    square(squareX, squareY, stepSize);

    // 1. compute next position
    let nextX = squareX;
    let nextY = squareY;

    if (direction === 'left') nextX -= stepSize;
    if (direction === 'right') nextX += stepSize;
    if (direction === 'up') nextY -= stepSize;
    if (direction === 'down') nextY += stepSize;

    // 2. validate movement
    if (
        nextX >= half &&
        nextX <= width - half &&
        nextY >= half &&
        nextY <= height - half
    ) {
        squareX = nextX;
        squareY = nextY;
    } else {
        // pick a valid direction if blocked
        let validDirs = directions.filter(dir => {
            if (dir === 'left' && squareX - stepSize < half) return false;
            if (dir === 'right' && squareX + stepSize > width - half) return false;
            if (dir === 'up' && squareY - stepSize < half) return false;
            if (dir === 'down' && squareY + stepSize > height - half) return false;
            return true;
        });

        direction = random(validDirs);
        return;
    }

    // 3. count steps
    stepCount++;

    // 4. change direction after N steps
    if(stepCount >= stepsPerDirection) {
        stepCount = 0;

        let validDirs = directions.filter(dir => {
            if (dir === 'left' && squareX - stepSize < half) return false;
            if (dir === 'right' && squareX + stepSize > width - half) return false;
            if (dir === 'up' && squareY - stepSize < half) return false;
            if (dir === 'down' && squareY + stepSize > height - half) return false;
            return true;
        });

        direction = random(validDirs);
    }
}

//
// GRID LINES
//
function drawGrid() {
    stroke(32, 44, 96);
    noFill();

    for (let x = 0; x <= width; x += stepSize) {
        line(x, 0, x, height);
    }

    for (let y = 0; y <= height; y += stepSize) {
        line(0, y, width, y);
    }
}

//
// CELL CENTERS
//
function drawCenters() {
    fill(0, 0, 0);
    noStroke();

    for (let x = half; x < width; x += stepSize) {
        for (let y = half; y < height; y += stepSize) {
            circle(x, y, 5);
        }
    }
}

//
// TOGGLE GRID
//
function keyPressed() {
    if (key === 'g' || key === 'G') {
        showGrid = !showGrid;
    }
}