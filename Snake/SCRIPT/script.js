let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let score = 0;
let snake = []; //Array de coordenadas da cobra
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right"; //A cobra ira começar andando para direita

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() { //Function que executa o backgroud no HTML
    context.fillStyle = "#D4E6F1"; //context preenchido em azul
    context.fillRect(0, 0, 16 * box, 16 * box); //fillRect desenha o retangulo onde executará o game --- 4 parametros (posições x,y,alt,larg)
}

//A cobra irá funcionar em um array de coordenadas

function createSnake() {
    for (let i = 0; i < snake.length; i++) { //For que irá percorrer todo o array
        context.fillStyle = "#82E0AA"; //Cor da cobra
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function foodPoint() { //Function que exibe o ponto de comida da cobra em lugares aleatorios dentro do canvas
    context.fillStyle = "#E74C3C"; //Cor da comida
    context.fillRect(food.x, food.y, box, box);
}

//Evento de clique
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && event.keyCode != "right") { //37 - Codigo de evento que indica a tecla "Esquerda"
        direction = "left";
    }
    if (event.keyCode == 38 && direction != "down") { //38 - Codigo de evento que indica a tecla "Cima"
        direction = "up";
    }
    if (event.keyCode == 39 && direction != "left") { //39 - Codigo de evento que indica a tecla "Direita"
        direction = "right";
    }
    if (event.keyCode == 40 && direction != "up") { //40 - Codigo de evento que indica a tecla "Baixo"
        direction = "down";
    }
}

function startGame() {

    //Condicionais que permitem a cobra atravessar os limites do canvas
    if (snake[0].x > 15 * box && direction == "right") {
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == "left") {
        snake[0].x = 16 * box;
    }
    if (snake[0].y > 15 * box && direction == "down") {
        snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == "up") {
        snake[0].y = 16 * box;
    }

    for (let j = 1; j < snake.length; j++) {
        if (snake[0].x == snake[j].x && snake[0].y == snake[j].y) { //Condicional que se a cobra atingir seu prorpio corpo, o jogo acaba.
            clearInterval(refreshGame);
            alert('Fim de jogo!');
            alert('Seu score foi de: ' + score + ' pontos!');
            alert('Reinicie a pagina para recomeçar o jogo.')
        }
    }

    createBG();
    createSnake();
    foodPoint();

    //Ponto de partida
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Parametros de movimentação da cobra

    if (direction == "right") {
        snakeX += box;
    }
    if (direction == "left") {
        snakeX -= box;
    }
    if (direction == "up") {
        snakeY -= box;
    }
    if (direction == "down") {
        snakeY += box;
    }

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //Condição em que se a posição da cobra for diferente da comida, ele irá decrementar o array da cobra (a cobra nao aumenta)
    } else { //Condição em que a comida recebe uma posiçaõ aleatoria caso a comida seja alcançada
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
    }

    //Cabeça da cobra
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let refreshGame = setInterval(startGame, 100);