// let walker;

// function setup(){
//     createCanvas(windowWidth, windowHeight)
//     walker = new Walker()
//     background(255)
// }

// function draw(){
//     walker.show()
//     walker.step()
// }

// class Walker{
//     constructor(){
//         this.x=width/2
//         this.y=height/2
//     }

//     show(){
//         stroke(0)
//         point(this.x,this.y)

//     }

//     step(){
//         let r=random(1)
//         let xstep, ystep

//         if(r<0.01){
//             xstep = random(-100,100)
//             ystep = random(-100,100)
//         } else {
//             xstep = random(-1,1)
//             ystep = random(-1,1)
//         }

//         this.x = this.x + xstep
//         this.y = this.y + ystep
//     }
// }

/* levy flight kinda. we have here a 1% change for the walker jumping to another place what helps avoid oversampling

but this reduces the possibilities to two, a 99% small step and a 1% large step, this is called DISCRETE DISTRIBUTION. what if we wanted to make a more general rule
like 'the higher the number, the more likely to be picked?'. instead of choosing between fixed options, WHAT IF
EVERY NUMBER HAD ITS OWN PROBABILITY?

SOLUTION #1

here we pick two random numbers instead of one. the first is a random number and the second is a QUALIFYING RANDOM VALUE.
this value is used by the program to decide whether to use that first number or throw it away and pick another.

    Pick a random number: r1.
    Compute a probability p that r1 should qualify. Let’s try: p = r1.
    Pick another random number: r2.
    If r2 is less than p, you’ve found your number: r1!
    If r2 isn’t less than p, go back to step 1 and start over.

    while (true) {
        let r1 = random(1)
        let probability = r1
        let r2 = random(1)

        if(r2<probability){
            return r1
        }
       }

so, what we have here for example is that: if the r1 is lets say 0.9, it has 90% per cent of survival chance. in the long 
term we will have a distribution each time closer to this percentages values.

    let r1 = random(1)

aqui estamos criando um valor randomico entre 0 e 1

    probability = r1

aqui estamos dizendo que a probabilidade é igual ao valor de r1. é como se dessemos uma probabilidade para aceitar esse valor r1
por exemplo, um valor alto, teria aqui uma probabilidade alta. se por acaso r1=0.9 é como se estivessemos dizendo, a probabilidade
de aceitar r1 é de 90%.

    let r2 = random(1)

aqui estamos gerando outro valor randomico entre 0 e 1 que será colocando contra a probabilidade de r1

    if (r2<probability){
    return r1}

o que estamos dizendo é, se r2 for menor que a probabilidade de aceitarmos r1, retorne o valor de r1. se não for, não faça nada e gere novos numeros.
a ideia aqui é que quando r2 tiver uma probabilidade menor que r1, o valor r1 sera retornado. quando não tiver, vamos reiniciar. dessa forma quanto maior o valor
mais chances dele ser retornado.

OUTROS VALORES DE PROBABILIDADE

    ITERA 1. 

    probability = 0.5 

    r1 = 0.2
    r2 = 0.3

    0.3<0.5 ACEITA E RETORNA 0.2

    ITERA 2.

    r1 = 0.9
    r2 = 0.7
    0.7 < 0.5 REJEITA

    ITERA 3.

    r1 = 0.8
    r2 = 0.1
    0.1<0.5 ACEITA, retonra 0.8

NESSE CASO TODOS OS NUMEROS TEM 50% DE CHANCE, independentemente do valor. 

    probability = 1 - r1

    ITERA 1

    r1 = 0.9 
    prob = 0.1
    r2 = 0.2

    0.2<0.1 REJEITA

    ITERA 2

    r1 = 0.2
    prob = 0.8
    r2 = 0.5

    0.5<0.8 ACEITA, RETORNA 0.2

AQUI OS VALORES MENORES TEM MAIS CHANCE, TEREMOS MAIS VALORES PROXIMOS DE 0

    probability = r1 * r1

    ITERA 1

    r1 = 0.3
    prob = 0.09
    r2 = 0.2

    0.2 < 0.09 REJEITA

    ITERA 2

    r1 = 0.8
    prob = 0.64
    r2 = 0.5

    0.5<0.64 ACEITA -> RETORNA 0,.8

AQUI NOS PUNIMOS AINDA MAIS OS VALORES PEQUENOS. VALORES PEQUENOS QUASE NUNCA PASSAM, VALORES GRANDES AINDA PASSAM.
O RESULTADO É AINDA MAIS CONCENTRADO PERTO DE 1

| função `probability` | efeito                             |
| -------------------- | ---------------------------------- |
| constante            | uniforme                           |
| cresce com r1        | puxa pra direita (valores altos)   |
| decresce com r1      | puxa pra esquerda (valores baixos) |
| pico no meio         | concentração no centro             |



ISSO É MUITO DIFERENTE DO QUE APLICAMOS EM OUTROS MOMENTOS DO STEP COMO

step(){
        
        let r = random(1)

        if (r<0.5){ // 50% chance
            if (random(1)<0.5){
                this.x += (mouseX> this.x) ? 1:-1
            } else {
                this.y += (mouseY>this.y)? 1: -1
            }
        } else if (r<0.6){ //20% chance
            this.x = this.x-1
        }else if(r<0.8){ //20% chance
            this.y = this.y+1
        }else{
            this.y = this.y -1 //10% chance
        }

    }


accept-reject -> nos geramos e filtramos valores
o exemplo acima -> escolhemos ações com probabilidades fixas (amostragem direta)

em um nos definimos a probabilidade de algo acontecer de forma fixa. no outro nos estabelecemos uma regra, não porcentagens exatas
*/


let walker;

function setup(){
    createCanvas(windowWidth, windowHeight)
    walker = new Walker()
    background(255)
}

function draw(){
    walker.show()
    walker.step()
}


function acceptReject(){
    while(true){
        let r1 = random(1)
        let probability = r1*r1 //estabelecendo uma função-relação. p = r1 * r1, isso significa diminuir a chance de pqeunos valores acontecerem ainda mais
        let r2 = random(1)

        if(r2<probability){
            return r1
        }
    }
}

class Walker{
    constructor(){
        this.x=width/2
        this.y=height/2
    }

    show(){
        stroke(0)
        point(this.x,this.y)

    }

    step(){
        
        let step = 5
        let xstep = acceptReject() * step;

        if(random([false,true])){
            xstep = xstep * -1;
        }

        let ystep = acceptReject() * step;

        if(random([false,true])){
            ystep = ystep * -1;
        }

        this.x = this.x + xstep
        this.y = this.y + ystep
}}