function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1)
}

function draw() {
    background(0);

    /**
     * coloring each pixel of a canvas with random values
     */
    // loadPixels();
    // for (let x = 0; x < width; x++) {
    //   for (let y = 0; y < height; y++) {
    //     let index = (x + y * width) * 4;
    //     // A random brightness!
    //     let bright = random(255);
    //     // Set the red, green, and blue values.
    //     pixels[index] = bright;
    //     pixels[index + 1] = bright;
    //     pixels[index + 2] = bright;
    //     // Set the alpha value to 255 (no transparency).
    //     pixels[index + 3] = 255;
    //   }
    // }
    // updatePixels();

    loadPixels();
    let xoff = 0.0;

    for (let x=0;x<width;x++){

        let yoff = 0.0;

        for(let y=0;y<height;y++){
            let index = (x + y*width) *4
            //random brightness
            let bright = map(noise(xoff,yoff),0,1,0,255);

            pixels[index]=bright
            pixels[index+1]=bright
            pixels[index+2]=bright

            pixels[index+3]=255

            yoff += 0.01
        }
        xoff += 0.01
    }
    updatePixels()
}
