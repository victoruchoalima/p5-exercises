// IDEIAS GERAIS SOBRE P5JS

1. 

    há duas formas de utilizar o p5.js: global mode e instance mode:

    GLOBAL MODE:

    no navegador WINDOW é o objeto global. isso significa por exemplo que quando criamos uma função é como se estivessemos chamando um método do objeto global window:

        function test() {} é o mesmo que

        window.test = function () {}

    ou seja, quando criamos uma função test é como se estivessemos criando uma propriedade no objeto window onde test -> chave e function() {} -> valor. o window é só um objeto gigante:

        window = {
        alert: function() {},
        console: {...},
        document: {...},
        // e MUITO mais...
        }

    quando fazemos algo como 
    
        window.test = function(){
            console.log('hello)
        }

    o objeto window se torna:

        window = {
        alert: function() {},
        document: {...},
        test: function() {
            console.log("hello");
         }
        }

    IMPORTANTE: isso no entanto só acontece quando estamos no escopo GLOBAL. se estamos dentro de um bloco ou modulo ou em arquivos com type='module' então não estamos mais trabalhando dentro do objeto window.

    retomando o p5 js... 

    QUANDO INCLUIMOS p5 por meio de CDN, p5.js roda antes do resto do código e faz algo como:

        window.createCanvas = function(w,h){
            //lógica interna p5
        }

        window.background = function(color){
            //lógica interna p5
        }

    literalmente injetando funções no escopo global. apesar de por um lado facilitar as coisas. isso é também um pouco bagunçado e pode fazer com que sobrescrevamos funções sem querer. e é por isso que possuímos também uma segunda opção, o chamado 
    
    INSTANCE MODE:

        new p5((p) => {
        p.setup = function() {
            p.createCanvas(600, 600);
        };

        p.draw = function() {
            p.background(220);
        };
        });

    nesse caso p5 se torna uma função construtora/classe. portanto utilizamos a palavra-chave NEW para criar uma nova instancia, um novo objeto da classe p5. poderiamos por exemplo fazer:

        const pimpim = new p5()

    e pimpim seria algo como:

        pimpim.createCavas(...)
        pimpim.background(...)
    
    MAS AQUI VEM O PULO DO GATO. o p5 foi projetado para receber uma função logo no momento da criação. é como se criassemos o objeto já o configurando.

    o p é o mesmo que pimpim:

        const pimpim = new p5() 
    
    e o mesmo que

        new p5((pimpim)=>{
            //aqui usamos o objeto
        })

    a unica diferença é que aqui não precisamos criar uma variável fora - o p5 já entrega ela dentro da função. se prosseguimos com a versão pimpim:

        const pimpim = new p5();

        pimpim.setup = function () {
            pimpim.createCanvas(600,600);
        }

    é igual a:

        new p5((p) => {
                p.setup = function () {
                p.createCanvas(600,600)
            }
        })
    

2. 

SOBRE SETUP() E DRAW()

setup e draw na veradde são funções internas do p5 e nos ajudam a entender o lifecycle do p5js.

    setup()

        roda uma vez no inicio e é utilizado para inicialização (canvas, variaveis, assets,etc)

    draw() 

        roda continuamente, mais ou menos 60 vezes por segundo, e utilizado para animações, updates

e aqui a grande questão. p5js é projetado como um RENDER LOOP SYSTEM, não um script que roda uma unica vez. é como se o p5 não fosse um 'desenho final' ele é mais proximo de uma animação. por isso draw é projetado como um loop, porque o desenho pode mudar com o tempo (novos dados, interação, animação, etc)

    p5 não desenha imagens ele EXECUTA PROCESSOS DE DESENHO

não estamos dizendo 'desenhe algo' estamos dizendo 'a cada frame, faça isso'. nesse sentindo p5 esta basicamente fazendo algo assim internamente:

    function internalLoop(){
        draw();
        requestAnimationFrame(internalLoop)
    }

por partes, requestAnimationFrame é uma função que basicamente diz, antes do proximo frame, chame essa função. nesse caso a função chamada produz um loop eterno, portanto, a cada frame a função será novamente chamada e a função draw também, consequentemente

porque então num codigo como esse:

        function draw() {
        background(0);
        
        noStroke()
        fill(255)
        rectMode(CENTER)
        square(mouseX,mouseY,24)
    }

não temos um efeito de piscar? é preciso entender que p5 e o navegador ñao estão constantemente mostrando cada minima operação de desenho. eles primeiro renderizam para um buffer e depois mostram na tela o frame completo:

    background(0) não significa pisca uma tela preta, significa DEFINA O PIXEL BUFFER PARA PRETO ANTES DE DESENHAR O RESTO DO FRAME
    

3. 

LAYERS. a ordem em que inserimos formas na função draw é importante

4.

p5 tem funções evento para além de setup e draw. outro exemplo é a função evento mousePressed(). é preciso entender no entanto que não é que estamos chamando exatamente a função mousePressed. o que estamos fazendo ali é declarar uma callback que sera chamada caso ocorra um clique:

    function mousePressed(){
        console.log('clicked)
    }

é o equivalente em JS:

    function handleClick(){
        console.log('clicked)
    }

    canvas.addEventListener('mousedown', handleclick)

é preciso no entanto entender a distinção entre EVENT SYSTEM E RENDER LOOP. no exemplo a seguir o flickering em vermelho não esta ocorrendo direito:

    function setup() {
        createCanvas(800, 800);
    }

    function draw() {
        background(0);
        
        noStroke()
        fill(255)
        rectMode(CENTER)
        square(mouseX,mouseY,24)
    }

    function mousePressed(){
        background(255,0,0)
    }

temos aqui duas coisas independentes

    1. draw(), roda mais ou menos 60 vezes por segundo

        function draw() {
        background(0); // ← pinta o fundo de preto sempre
        square(mouseX, mouseY, 24);
    }

    2. mousePressed(),roda uma vez que nós clicamos

        function mousePressed(){
        background(255,0,0); // ← paints red ONCE
    }

há um conflito aqui. as vezes parece que vemos o flash, as vezes não porque o draw pinta de preto a tela antes de qualquer coisa. um ESTADO é a condição atual do programa, a informação que ele guarda entre momentos. EVENTO é algo que acontece num momento especifico, geralmente como uma reação.

    eventos acontecem - mudam o estado - draw() lê o estado e mostra