let ball = {
    x:300,
    y:200,
    xspeed:4,
    yspeed:-3
}

function setup() {
    createCanvas(600, 400);
    // background(0);
}

function draw() {  
    background(0);  
    display(random(255),random(255),random(255))
    direction()
    move()
}


function move(){
    ball.x = ball.x + ball.xspeed
    ball.y = ball.y + ball.yspeed
}

function direction(){
     if(ball.x > width || ball.x <0){
        ball.xspeed = ball.xspeed * -1;
    }

    if(ball.y>height || ball.y<0){
        ball.yspeed = ball.yspeed * -1;
    }
}

function display(r,g,b){
    stroke(255),
    strokeWeight(4);
    
    if(arguments.length>0){
        fill(r,g,b)
    }else{
        noFill()
}

    ellipse(ball.x, ball.y, 24,24)

}


/* notas

é importante entender as partes do codigo

    background(220);

    background(0),
    stroke(255),
    strokeWeight(4);
    noFill();
    ellipse(ball.x, ball.y, 24,24)

aqui temos definições sobre o canvas e a bola

    if(ball.x > width || ball.x <0){
        ball.xspeed = ball.xspeed * -1;
    }

    if(ball.y>height || ball.y<0){
        ball.yspeed = ball.yspeed * -1;
    }

aqui estamos tuilizando ball speed para definir troca de direções

    ball.x = ball.x + ball.xspeed
    ball.y = ball.y + ball.yspeed
}

aqui estamos construindo a força que movimenta a bola

é importante sempre que possivel tentar compreender essa lógica que constitui
os codigos.


*/