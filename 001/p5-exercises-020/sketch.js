let points = []
let spacing =100

function setup(){
  createCanvas(windowWidth, windowHeight,WEBGL);
  brush.field('hand')
  brush.scaleBrushes(1)
  let listFieds = brush.listFields()
  console.log(listFieds)

  for (let k =0; k<10;k++){
    let x = random(0,width)
    let y = random(0,height)

    points.push([x,y])
  }
}

function draw(){
  background("#f5f0e0");
  translate(-width / 2, -height / 2);

  // randomSeed(1)
  frameRate(10)
  // let points = [[30, height/2], [150, 20, 1.5], [130, 400], [width - 300, 50]];
  

  brush.set('charcoal','#002185', 2)
  // brush.strokeWeight(1)

  for (let j = 0; j<10;j++){

    brush.beginStroke("curve", 0, j*100);
    brush.move(0, width/2, 0.6);
    brush.move(0, width/2, 1.5);
    brush.endStroke(0, 0.6);

  }

  brush.set('charcoal','#851400', 2)
  for (let i=0; i<10;i++){
    brush.flowLine(0,i*90,width,0)
  }
  brush.set('pastel','#00855d', 3)
  brush.noWash()
  brush.spline(points, 0);

  brush.set('marker','#ece919', 4)
  brush.strokeWeight(2)
  brush.wash('#ece919',120)

  for (let l=0;l<3;l++){

    let offsetX = l*spacing
    // Begin defining a custom shape with a specified curvature
      brush.beginShape(0.3);
      // Add vertices to the custom shape
      brush.vertex(50 + offsetX, 100);
      brush.vertex(100 + offsetX, 50);
      brush.vertex(150 + offsetX, 100);
      // Finish the custom shape and close it
      brush.endShape(true);
  }
  
  


}


// function setup() {
//     createCanvas(windowWidth, windowHeight,WEBGL);
//     let brushes = brush.box() // RETURNS AN ARRAY WITH THE NAME OF ALL AVAILABLE BRUSHES
//     // brush.field('seabed')
//     brush.wiggle(3)
//     // brush.scaleBrushes(1)
//     console.log(brushes)

// }

// function draw() {
//     background("#f5f0e0");
//     translate(-width / 2, -height / 2);
//     randomSeed(1)
//     // frameRate(10)
//     // brush.refreshField(frameCount/10)



//     //   brush.mass("charcoal", "#4b6cb7", {
//     //   precision: 0.5,
//     //   strength: 0.5,
//     //   gradient: 0.3,
//     //   outline: true,
//     // });
//     // brush.hatchStyle("rotring", "red", 10);
//     // brush.hatch(10,90,{
//     //   rand:0.1,
//     //   continuous:false,
//     //   gradient:1
//     // })
//     // brush.fillTexture(0.5,0.5,true)
//     // brush.fillBleed(0.4,'out',0.1)
//     // brush.fill("#002185", 110);
//     // brush.wash("#f7e4a0", 255);
//     brush.set('spray', '#002185', 1)
//     brush.line(200,400,400,600)
//     brush.circle(100,400,120)
//     brush.pick('2B')
//     brush.circle(400,400,120)
//     brush.pick('pastel')
//     brush.circle(700,400,120)
//     brush.flowLine(150, 300, 700, 0);
//     brush.line(150, 400, 900, 400);

   
// }


/*P5 BRUSH MANAGEMENT

essas são funções para admnistrat comportamentos e propriedades das brushes

    1. brush.box() - retorna um array com os nomes de todas as brushes disponiveis. os padrões:

        0: "pen"​
        1: "rotring"
        2: "2B"
        3: "HB"
        4: "2H"
        5: "cpencil"
        6: "pastel"
        7: "crayon"
        8: "charcoal"
        9: "spray"
        10: "marker"

    2. brush.add(name,params) - cria uma nova brush com nossas proprias definições. uma vez definida é possivel utiliza0la com brush.set(). parametros:

         name (String)
         → Name of your brush (anything you want)

         params (Object)
         → Configuration object for the brush


         ------------------------------
         🧱 BASIC PROPERTIES
         ------------------------------

         type
         → Brush tip type:
           "default"  → pencil-like
           "spray"    → scattered dots
           "marker"   → solid flat stroke
           "custom"   → user-defined tip
           "image"    → image-based tip

         weight
         → Thickness of the brush (in canvas units)

         scatter
         → Sideways randomness / wobble
           higher = more spread

         opacity
         → Transparency per mark (0–255)
           affected by pressure too

         spacing
         → Distance between tip stamps
           1   = no overlap
           <1  = denser stroke


         ------------------------------
         ✏️ DEFAULT / SPRAY ONLY
         ------------------------------

         sharpness (0 → 1)
         → Edge softness
           lower = softer / blurrier
           (only for "default")

         grain
         → Texture density
           higher = smoother / more continuous
           (for "default" and "spray")


         ------------------------------
         💪 PRESSURE (VERY IMPORTANT)
         ------------------------------

         Controls size variation along stroke

         Simple modes:

         [start, end]
         → e.g. [2, 0.5]
           starts thick → ends thin

         [start, middle, end]
         → e.g. [0.5, 2, 0.5]
           thin → thick → thin

         Function:
         (t) => value
         → t goes from 0 → 1
         → full control over stroke profile

         NOTE:
         → includes subtle randomness automatically
         → helps avoid mechanical repetition


         ------------------------------
         🧠 ADVANCED PRESSURE (GAUSSIAN)
         ------------------------------

         {
           mode: "gaussian",
           curve: [0.15, 0.2],           shape + asymmetry
           min_max: [1.1, 0.9]           pressure range
         }

         → used internally by built-in brushes
         → more organic / natural strokes


         ------------------------------
         🖌️ CUSTOM TIP (type: "custom")
         ------------------------------

         tip: (_m) => { ... }

         → function that draws the brush tip
         → drawn in a 100x100 space (centered)
         → darker = more opacity
         → lighter = more transparent


         ------------------------------
         🖼️ IMAGE TIP (type: "image")
         ------------------------------

         image: {
           src: "./tip.jpg"
         }

         → uses an image as brush tip


         ------------------------------
         🔄 ROTATION
         ------------------------------

         rotate:
           "none"     → fixed orientation
           "natural"  → follows stroke direction
           "random"   → random rotation


         ------------------------------
         ✒️ MARKER TIP BEHAVIOR
         ------------------------------

         markerTip (boolean)
         → only for: "marker", "custom", "image"

         true  → soft buildup at start/end (default)
         false → clean edges


         ------------------------------
         🎲 NOISE (PER-STROKE VARIATION)
         ------------------------------

         noise (0 → 1)

         → random opacity variation per stroke
         → 0   = identical strokes
         → 1   = maximum variation
         → default = 0.3

         helps strokes feel more organic


    3. brush.clip(clippingRegion) - it is a way the render something only inside an area:
        draw textures inside shapes
        simulate fill regions manually
        create architectural diagrams
        constrain generative


    STROKE OPERATIONS

    1. brush.set(brushName, color, weight) - selects and sets up the current brush with a specific name, color and weight.
        brushName- string, name of the brush to be used
        color - Stringlp5.Color : the color of the brush which can be hex OR P5.cOLOR OBJECT
        weight - number, the weight or size of the brush

    2. brush.pick(brushName) - seleciona um brush baseeado no nome dado. é usada para mudar de brush type sem alterar cor e peso.
    3. brush.stroke(r,g,b) or brush.stroke(color) - sets the color of the current brush
    4. brush.noStroke() - creating drawings where only fill and no outline is desired
    5. brush.strokeWeight(weight) - sets the wieght or size of the current brush. THE SPECIFIED WEIGHT ACTS AS A MULTIUPLIER TO THE BASE SIZE OF THE BRUSH

    VECTOR FIELDS
    allow for dynamic control over brush stroke behavior, enabling the creating of complex and fluid motion within sketches.
    um vector field é um mapa onde cada ponto do espaço tem uma direção.

    1. brush.field(name) - activates a named vector fied. when a vector field is active, it influences the flow and direction of the brush strokes for shapes drawn tehreafter. 
    some shapes may be exempt from this influence; PARAMETERS:
        name: string, the identifier for the vector field to be activated. this can be a name of the predefined fields of a custom field created with brush.addField().
        
        built-in fields: hand, curved, zigzag, waves, seabed, spiral, columns
    2. brush.noField() - deactivate the currently active vector field
    3. brush.wiggle(wiggle) -activate the builtin hand vector field with a given wiggle intensity. 1-10
    4. brush.refreshField(time) - updates the current vector field values using its time-dependent generator function. ideal for animations that require the vector field to
    change over time, influencing the movement of strokes and shapes in a natural way.
    5. brush.listFields() - retrieve an array containing the anmes of all available vector fields

    6. brush.addField(name,generatorFunction,options) - create our custom vector field. a vector field is just a grid of angles - each cell tells the brush 'point in this direction'
    we give the field a name and a function that fills the grid. once added, we activate it with brush.field(name.)
        a. name, string - any name we want
        b. generatorFunction - a function (t,field) => field that fills every cell of the grid with an angle and returns it. t is a time value we can use for animation (pass it via brush.refreshField(t))
        c. options (optinal) - object, optional config for custom field angles
            angleMode: degrees or radians.

        how the grid works: field is a 2D array - field[column][row]. we loop through every column and row and set each cell to an angle. by default those angles are interpreted as degrees.
        small angles make subtle curves, large ones make dramatic bends

    CONFIGURATION - initializing the drawing system and configuring how the library behaves in our sketch. in particular brush.scaleBrushes().

    seeding: p5.brush automatically hooks into p5s randomSeed() and noiseSeed().Calling either of those functions seeds both p5 and the library simultaneously - no separate brush.seed() call 
    is needed.

    1. brush.load(buffer) - redirects brush drawing to a secondary canvas target. pass a p5.Graphics buffer or an active p5.Framebuffer to draw into that target instead. call brush.load()
    with no argument to switch back to the main canvas.

    How to use it:

    p5.Graphics: create it with WEBGL, call brush.load(pg), draw with brush functions, then call brush.load() to restore the main canvas before presenting it with image(pg, ...).
    p5.Framebuffer: create it from the main sketch with createFramebuffer(...), enter its draw() or begin() / end() scope, call brush.load(fb) while it is active, draw with brush functions, then call brush.load() again after leaving the framebuffer scope.
    brush.load(...) only changes the target used by p5.brush. If you also use native p5 drawing calls, call them on the same target yourself, for example pg.background(...) for p5.Graphics.
    pg.createFramebuffer() is not supported.

    2. brush.scaleBrushes(scale) - adjusts the global scale of all currently registered brush parameters, including weight, scatter, and spacing, based on the given scaling factor.abs(
        scale, number, the scaling factor to be applied to the brush parameters.


    FILL OPERATIONS

    1.brush.fill(a,b,c,d) or brush.fill(color,opacity) - sets the fill color and opacity for subsequent shapes.
    2.brush.wash(color,opacity) - enables a fast solid fill, unlinke fill wash does not simulate watercolor bleed or texture.
    3.brush.fillBleed(strenght,direction) - adjusts the bleed intensity for the fill operation, mimicking the edge diffusion of watercolor paints
      strength: number, the intensity of the bleed effect, 0-1
      direction: string, 'out' or 'in' defines the direction of the bleed effect
      borderIntensity: number, the intensity of the border watercolor effect, 0-1
    4.brush.fillTexture(textureStrength, borderIntensity,scatter) - adjusts the texture levels for the fill operation, mimicking the behavior of watercolor paints
      strength: number, the texture of the fill effect, 0-1
      borderintensity: number, the instensity of the border watercolor effect, ranging from 0-1
      scatter:boolean, default true, whether to draw the sparse scattered polygon layers that add edge texture noise. set to false for a cleaner gradient trim effect

    HATCH OPERATIONS

    1.brush.hatch(dist, angle, options) - activates hatching with specified parameters. enables the drawing of hatching patterns with controlled line spacing, angle, and additional stylistic options
      dist: number, the distance between hatching lines, in canvas units
      angle: number, the angle at which hatching lines are drawn. it is interpreted using p5s current angleMode when brush.hatch is called.
      options: object, optional, optainl settings for hatching style
        rand: randomness in line placement 0 to 1 or false
        continous: whether to connect the end of a line with the start of the next
        gradient: modifies the distance between lines to create a gradient effect (0 to 1 and false)
    2. brush.hatchStyle(brushName, color, weight) - set the brush type, color, and weight specifically for hatching
      brushName: string: the name of the brush to use for hatching
      color:
      weight:number

    3. brush.mass(brushName,color,options) - enables massing. massing builds layered hand-filled value using internally generated hatch geometry and curved gestures rather than explicit watercolor fills.abs(
       brushName: string, brush used for the mass strokes
       color
       options: object: optional settings
        precision:0 to 1. higher values reduce jitter and randomness
        strenght: 0 to 1. controls how many of the three internal layers are drawn
        gradient: 0 to 1. passed thrgough to hatch generation for spacing variation
        outline: boolean, if true, the first polygon is also outlined
    4. in essence the hatching system activates hatches for subsequent shapes. however we can also directly hatch multiple objects at once, including their intersections.

    brush.hatchArray(polygons) - creates a hatching pattern across specified polygons. this function applies the set hatching parameters to a single polygon or an array of polygons
      polygons: array/object, the polygons to apply the hatching can be a single polygon object or an array of polygon objects


      PRIMITIVES, ONLY THE ONES I DONT KNOW

      1. flowLine - draws a flowline that adheres to the currently selected vector field. flow lines are defined by a starting point, lenght, and direction. they are useful for creating strokes that dynamically
      follow the flow of the vector field
        x? number, x starting point
        y: number, y, starting point
        lenght: number, the length of the line
        dir: number, the direction in which to draw the line, measured anticlokwise from the x axis and itnerpreted using the current p5 angleMode

      2. beingStroke, move, endStroke

      these three functions provide advanced control over the creation of strokes/paths, allowing for custom pressure
      and direction at different points along the path. think of them as bodily movements performed with the hands. you can create two types of strokes:
      'curve' or 'segments'. for curved strokes, the curvature at any point is interpolated between the nearest control points.

        brush.beginStroke(type,x,y) initializes a new stroke, setting the type and starting position. the type determines the kind of plot to create
        either a 'curve' or 'segments'

          type: string, the type of the stroke, either curve, or segments
          x : number, the x coordinate of the starting point of the stroke
          y : the y coordinate of the starting point of the stroke

        brush.move(angle, length, pressure) - add a segment to the stroke, defining its path by specifying the angle, lenght and pressure.
        use between brush.beginStroke() and brush.endStroke() to outline the strokes trajectory and characteristics.abs(
          angle: number, the initial angle of the segment, relative to the canvas, measured anticlockwise the the x-axis
          lenght: the lenght of the segment
          pressure: the pressure at the start of the segment, influencing properties like width
        
        brush.endStroke(angle,pressure) - completes the stroke path and triggers its rendering.
          angle:number, the angle of the curve at the end point of the stroke path
          pressure:number: the pressure at the end of the stroke

      3. brush.spline(array_points, curvature) - draw a spline curve through a series of control points. the curve connects the start and end points directly
      using intermediate points to shape the path. these splines are segmented paths with rounded corners
          array_points: (array) an array of points where each points is [x.y] or [x,y,pressure]. the optional pressure value at each points influences brush width along the curve
          curvature: number, the curvature of the spline ranging from 0 to 1

          this is a simplified alternativa to beginShape() - endShape() operations, useful for certain stroke() applications


        SHAPES AND POLYGONS (so o que não conheço)

      1. beginShape(), vertex(), endShape()

      these three functions perform similarly to the p5js functions, although their curvature calculation is very different.
      they allow to draw custom shapes with fine control over brush pressure at different points of the perimeter

        beginShape(curvature) - initiates the creation of a custom shape by starting to record vertices. an optional curvature can eb defined for the vertices
          curvature: number, a value 0-1 that defines the curvature of the shapes edges
        
        brush.vertex(x,y,pressure) - adds a vertex to the custom shape currently being defined. the function is used between beginShape and endShape calls.
          x: number, x coordinate of the vertex
          y: number, y coordinate of the vertex
          pressure: number, the pressure at the vertex

        brush.endShape(a) - complete de custom shape, finalizing the recording of vertices, and render it with the current stroke, fill, and hatch settings
          a: boolean, pass true to close the shape

      2. brush.polygon(pointsArray) - creates and draws a polygon based on a provided arrays of points. this function is useful for drawing shapes that are not affected 
      by vector fields, offering alternative to the beginShape and endShape approach. this is a sinmplified alternative to begind and endshape operations, useful for certain fill and hatch applications.
*/

