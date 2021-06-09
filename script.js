let canvas; 
let context; 
let gameLoop;

const boardX = 300; 
const boardY = 300; 
const paddleH = 10;
const paddleD = boardY - paddleH; 
const paddleW = 150;

let paddleX = 150; //La paleta solo se mueve horizontalmente
let ballX = 150; //La bola va a empezar en la mitad del juego
let ballY = 150; 
let ballDX = 2; //Acelarion en el eje X  
let ballDY = 4; //Aceleracion en el eje y


function drawGameCanvas(){

    canvas = document.getElementById('gameBoard');

    if (canvas.getContext) {

        context = canvas.getContext('2d'); //dos dimensiones 

       gameLoop = setInterval(draw, 16); // estoy llamando mi funcion draw cada 16 milisegundos con el setInterval
       
       window.addEventListener('keydown', keyInput, true);//llamando la funcion de mover las teclas  
    } 

}


function draw() {

    //Aqui dibujo el cuadro 
    context.clearRect(0, 0, boardX, boardY); //limpia un rectanngulo 

    context.fillStyle = 'thistle'; //prepare el color 
    context.beginPath(); //dibujar un path 
    context.rect(0, 0, boardX, boardY); // hacer una recta 
    context.closePath(); // cerrar el path 
    context.fill(); // aplicar el contexto

    //Aqui dibujo la bola
    context.fillStyle = 'tomato'; 
    context.beginPath(); 
    context.arc(ballX, ballY, 15, 0, Math.PI * 2, true); //primero el punto de anclaje, radio, donde inicia, angulo final al darle la vuelta entera 2 pi es el circulo completo
    context.closePath();
    context.fill(); //si no hago esto no me muestra el circulo, no me llena el objecto creado

    //dibujar la paleta
    context.fillStyle = 'navy'; 
    context.beginPath(); 
    context.closePath();
    context.rect(paddleX, paddleD, paddleW, paddleH);// no ocupo y ya que la paleta solo se mueve horizontalmente, paddleD es la distan. del borde superior
    context.fill();

    //cambiar la posicion 
    ballX += ballDX; //posicion actual de eje x 
    ballY += ballDY; 
    
    //15 es el dario de la bola y aqui estamos poniendo a rebotar la bola
    if (ballX + ballDX > boardX - 15 || ballX + ballDX < 15) {

        ballDX = -ballDX;
        
    }

    if (ballY + ballDY < 15) {

        ballDY = -ballDY;
        
    } else if (ballY + ballDY > boardY - 15 ) { //aqui idicamos si la bola toco el fondo y no la paleta 

        if (ballX > paddleX && ballX < paddleX + paddleW) { // si x es mayor a la paleta y x es mayor al ancho de la paleta entonces toco el fondo

            ballDY = -ballDY;
            
        } else {

            clearInterval(gameLoop); // aqui detengo el setInterval

            alert('Game Over');
        }

    }

}

function keyInput(e) {

    switch (e.keyCode) {//keycode me devuelve cualquier valor del codigo ascii, el 37 izquierda y 39 derecha

        case 37:
            
            paddleX -= 20;
            if(paddleX < 0 ){
                paddleX = 0;
            }

        break;

        case 39: 

        paddleX += 20; 
        if(paddleX > boardX - paddleW){
            paddleX = boardX - paddleW;
        }        

        break;
       
    }

}

drawGameCanvas();