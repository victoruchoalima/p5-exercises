let points=[]

const POINT_COUNT = 200;
const CONNECTION_DISTANCE=200;


function setup() {
    createCanvas(windowWidth, windowHeight);
    createPoints()
    // background(0);
}

function draw() {
     background(0);

     let mousePoint = new Point (mouseX,mouseY);

     for (let p of points){
        p.drawPoints();

        if (p.isNear(mousePoint, CONNECTION_DISTANCE)){
            p.drawConnectionTo(mousePoint)
        }
     }
    
}

function createPoints(){
    points = [];

    for (let i=0; i< POINT_COUNT; i++){
        let x = random(width);
        let y = random(height);

        points.push(new Point(x,y))
    }
}

class Point{
    constructor(x,y){
        this.x=x
        this.y=y
    }  
    drawPoints(){
        stroke(255);
        strokeWeight(1);
        point(this.x,this.y)
    }

    distanceTo(other){
        return dist(this.x,this.y,other.x,other.y)
    }

    isNear(other, threshold){
        return this.distanceTo(other) < threshold;
    }

    drawConnectionTo(other){
        line(this.x,this.y,other.x,other.y)
    }
}


/*STRUCTURING

the idea here was to organize the code in a way that we could get rid of that code where everything was being done in the same place.

the first step is to define:

    what exists -> o que existe?
    what happens - > o que acontece?
    how it is shown -> como aparece?

1.
    we need to avoid mixing responsabilities. it is dificult to read a code where the same área responds to a lot of different questions.

    TRY TO THINK THE QUESTIONS AND ANSWER THEM SEPARATELY (how to create points? how to draw points? how to know if two points are close? how to draw the connections?)

    obs. always important to remember, one thing is to create something, another thing is to draw this something

2. NIVEIS - LEVELS

    LEVEL 1, STATE. 
        what is the actual situation of the system? in our code:
            where are the points
            how many points existe
            where the mouse is?

        on our code we have - > points = [] / point.x / point. y
    
    LEVEL 2, RULES OF THE SYSTEM.
        what the system does with this state?
            create more points
            interate through all points
            deciding if a point is near the mouse cursor
        
        normally, those parts turn into global functions, because they belong to the whole system, not to a single point
    
    LEVEL 3, OBJECT BEHAVIOR
        what a point knows to do by itself?
            draw itself
            measure the distance to another point
            say if it is near another point
            draw a line to other point
        
        those parts makes sense as methods of a class

3. WHY SOME THINGS TURNS TO METHODS AND OTHERS TURNS TO GLOBAL?

    the question to ask is: DOES THIS BELONG TO AN INDIVIDUAL OBJECT, OR DOES IT BELONG TO THE WHOLE SYSTEM?

when the behavior is from the instance itself it turns to method:
    distanceTo(other)
    isNear(other,threshold)
    drawConnectionTo(other)

those methods makes sense inside Point, because they are things that a point does in relation to another.

when is a behavior from the group, the scene or the general logic it turns to global function:
    createPoints()

this function doenst belong to an isolated point. it belongs to the system that creates the whole collection.

    drawConnectionsToMouse()

for example, could be global, because it involves a lot of points at the same time and its relation to the mouse.

4. 

    on our code the class Point concentrates what means to be a point. the code asks the point to do things.

5. RULES FOR ANALYSIS

    STEP 1.

        IDENTIFY THE STATE - asking: what are the persistent data?

            in our case is points, POINT_COUNT,CONNECTION_DISTANCE
        
        those elements exist outside the draw() loop because they define the system,
    
    STEP 2. 

        ISOLATE WHAT HAPPENS ONCE FROM WHAT HAPPENS ALWAYS - asking: this loops once? this loops every frame?
    
    STEP 3. 
        ISOLATE LOCAL BEHAVIOR FROM GLOBAL BEHAVIOR - asking: is this a thing from a single object? or involves various objects?
    
    STEP 4. 
        TRANSFORM REPEATING ACTIONS IN METHODS

            example from our code:
                point(p.x,p.y)

            if all points will need to be drawn it is better to have a function p.drawPoints()

6. THE IMPORTANCE OF SEPARATING CREATION FROM DRAWING LOGIC

    in our project, createPoints generates a list of points. and this is good because we can

        call createPoints() again to reset
        change the quantity of points
        create different groups of points
        produce new layouts

    it is a step of the construction of STATE, not exhibition (drawing)




*/