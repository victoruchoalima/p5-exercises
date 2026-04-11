let pos 
let color
let frameControl
function setup() {
createCanvas(windowWidth, windowHeight, WEBGL)
  pos = {
    x:width/2,
    y:height/2
  }

  color={g:0}

  frameControl={fC:10}

  brush.load()

  gsap.to(pos, {
    x: () => Math.random() * width,
    y: () => Math.random() * height,
    duration: 5,
    repeat: -1,
    // yoyo: true,
    repeatRefresh:true,
    ease: "power1.inOut", 

    onRepeat:()=>{
        color.g=Math.random()*255
        frameControl.fC=Math.floor(random(10,60))
        frameRate(frameControl.fC)
        console.log(`right now frameRate is ${frameControl.fC}`)
    }
  })

  
  //  background(255)
  background("#fffceb")
}

function draw() {
    translate(-width / 2, -height / 2)
    let g = Math.floor(color.g)
//   randomSeed(1)
// frameRate(frameControl.fC)
brush.set("HB", `rgb(${g}, ${g}, ${g})`, 1)
brush.strokeWeight(2)
brush.circle(pos.x, pos.y, 80)
}

/**
 * 
 * funcionamento
 * 
 * Claro — vou estruturar em um tom mais acadêmico, separando claramente os conceitos e os níveis de operação:

---

### Estrutura Temporal e Amostragem

O sistema é organizado em ciclos de duração fixa (5 segundos), dentro dos quais se estabelece uma relação entre um processo contínuo de animação e sua amostragem discreta. A cada ciclo, um valor de *frame rate* é definido de forma aleatória, determinando a frequência com que o método `draw()` é executado. Como cada execução de `draw()` resulta no traçado de um círculo, o número total de círculos produzidos em um ciclo corresponde aproximadamente ao produto entre o *frame rate* e a duração do ciclo.

Dessa forma, o *frame rate* atua como um parâmetro de resolução temporal: ele define quantas amostras do processo contínuo serão capturadas e materializadas ao longo do tempo.

---

### Interpolação Contínua no GSAP

A animação dos valores de posição (`x` e `y`) é realizada por meio de interpolação contínua ao longo do tempo. Em vez de gerar previamente uma sequência discreta de valores, o sistema calcula, a cada instante, a posição correspondente dentro de um intervalo temporal fixo. Esse processo pode ser entendido como uma função contínua que mapeia o tempo em valores espaciais.

Assim, a trajetória entre um estado inicial e um estado final não é composta por pontos predefinidos, mas por uma variação contínua que só se torna observável quando amostrada.

---

### Função de Easing como Modulação Temporal

O *easing* atua como uma função de transformação do tempo, modulando a taxa de variação dos valores ao longo do intervalo definido. Em termos formais, ele altera o mapeamento entre o tempo linear e o progresso da interpolação.

Nos casos de *easing* contínuo (como `power`, `expo` ou `sine`), essa modulação introduz variações de velocidade ao longo da trajetória. Em um `power1.inOut`, por exemplo, a velocidade é reduzida nas extremidades do intervalo e ampliada na região central. Como a amostragem realizada pelo `draw()` ocorre em intervalos regulares de tempo, essa variação de velocidade resulta em diferentes distribuições espaciais dos pontos: regiões de menor velocidade produzem maior proximidade entre amostras sucessivas, enquanto regiões de maior velocidade produzem maior espaçamento.

Importante notar que o *easing* não altera nem a duração total da animação nem o número de amostras realizadas, mas apenas a distribuição espacial dessas amostras.

---

### Discretização por Steps

No caso de `steps(n)`, a interpolação contínua é substituída por uma discretização explícita em um número finito de estados. O intervalo de variação é dividido em *n* segmentos, e a posição permanece constante dentro de cada segmento, sofrendo transições abruptas entre eles.

Esse comportamento introduz uma estrutura temporal descontínua, na qual a trajetória é composta por uma sequência de estados estáticos seguidos de saltos discretos. O efeito visual resultante depende da relação entre o número de *steps* e a frequência de amostragem:

* Quando o número de frames por ciclo é maior que o número de *steps*, cada estado é amostrado múltiplas vezes, gerando repetição e densidade local.
* Quando o número de *steps* excede o número de frames, múltiplas transições ocorrem entre amostragens consecutivas, fazendo com que parte dos estados não seja observada. Nesse caso, a trajetória aparenta saltos mais amplos e uma perda de resolução.

---

### Síntese

O sistema pode ser compreendido como a articulação entre três níveis distintos:

1. **Interpolação contínua (GSAP):** define uma trajetória no tempo, entendida como uma função contínua de posição.
2. **Modulação temporal (easing):** altera a forma dessa trajetória, introduzindo variações na taxa de mudança.
3. **Amostragem discreta (p5.js / `draw()`):** converte essa trajetória em uma sequência de eventos discretos, cuja densidade é controlada pelo *frame rate*.

A interação entre esses níveis resulta em uma tradução do tempo em estrutura espacial, na qual características temporais — como velocidade, continuidade ou discretização — são materializadas como padrões de densidade, repetição e espaçamento entre elementos gráficos.


 */