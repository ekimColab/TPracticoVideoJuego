const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvasSize;
let elementSize;

let level = 0;
let lives = 3;

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spamLives = document.querySelector('#spanLives')

let mapRowCols =[];
const playerPosition = {
    x: undefined,
    y: undefined,
}

const gitPosition ={
    x: undefined,
    y: undefined,
}

// Este es el orden correcto para que el render no borre las bombas y ordenar los procesos en funciones
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

window.addEventListener('keydown', moveByKeys);//ArrowUp
window.addEventListener('keydown', moveByKeys);//ArrowLeft
window.addEventListener('keydown', moveByKeys);//ArrowRight
window.addEventListener('keydown', moveByKeys);//ArrowDown

 btnUp.addEventListener( 'click', moveUp );
 btnLeft.addEventListener( 'click', moveLeft );
 btnRight.addEventListener( 'click', moveRight );
 btnDown.addEventListener( 'click', moveDown );

 function setCanvasSize(){
    // para hacer que el canvas adopte el tamaño de la ventana html se requiere de realizar los siguientes comandos
    elementSize = Math.round((Math.min(canvasSize = window.innerHeight *.8, canvasSize = window.innerWidth *.8)) /10);
    canvasSize = elementSize*10;

    canvas.setAttribute( 'width', canvasSize );
    canvas.setAttribute( 'height', canvasSize);

    startGame()
 }

 function startGame(){
    //game.fillRect(0,0,100,1000);
    //game.cleanRect(50,50,50,50);
    //game.cleanRect();
    //game.cleanRect(50,50,50,50);

    //game.font - '25px Vernada';
    //game.fillStyle = 'purple';
    //game.textAlign = 'left';
    //game.fillText( 'Pandamonio', 25, 25);

    game.font = elementSize + 'px Verdana'; // debemos de poner tanto tamaño y tipo de fuente
    game.textAlign = 'end';

    // obtengo el primer mapa
    const map = maps[level];

    if( !map){
        //gameWin();
        return;
    }

    showLives()

    console.log({lives, level, });
    // lo trasformo en renglones
    const mapRows = map.trim().split('\n'); // limpio los inicions con split genero los row
    mapRowCols = mapRows.map( row => row.trim().split('') );


    // vamos a borrar todo el mapa por cada movimiento del player
    game.clearRect(0,0, canvasSize, canvasSize);

    // refactorizar el metodo con el uso de doble for
    mapRowCols.forEach( (row, rowI) => {
        row.forEach( ( valor, colI) =>{
            const emoji = emojis[ valor ];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);
            game.fillText( emoji, posX, posY);
            //console.log({valor, colI, rowI});

            if( valor == 'O' ){
                if( !playerPosition.y && !playerPosition.y){
                    //console.log({elementSize, canvasSize, playerPosition});
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            }else if( valor == 'I'){
                gitPosition.x = posX;
                gitPosition.y = posY;
            }
        })
    });

    movePlayer();
    /*
    for (let row = 1;  row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText ( emojis[mapRowCols[row -1 ][col -1]], elementSize * col, elementSize * row ) ;
        }
    }
    */
    //console.log({map, mapRows, mapRowCols}); 
    //console.log({canvasSize, elementSize, map});
}

// recive el evento de lo que esta pasando
function moveByKeys(event){
    //console.log(event);
    if( event.key == 'ArrowUp')
        moveUp();
    else if( event.key == 'ArrowLeft')
        moveLeft();
    else if( event.key == 'ArrowRight')
        moveRight();
    else if( event.key == 'ArrowDown')
        moveDown();
}

function movePlayer(){

    const posiX = (playerPosition.x/elementSize)-1;
    const posiY = (playerPosition.y/elementSize)-1;

    if( playerPosition.x == gitPosition.x && playerPosition.y == gitPosition.y){
        //console.log('encontro el bambu');
        levelWin();
    }else if( mapRowCols[posiY][posiX] == 'X' ){
        //console.log('Hay una bomba X'); 
        levelFail();
    } else {
        console.log('Ok');
    }

    game.fillText( emojis['PLAYER'], playerPosition.x, playerPosition.y);
    //console.log( {elementSize, mapRowCols, playerPosition, posiX ,posiY} );
    
}

function levelWin(){
    console.log('Subiste de Nivel');
    level++;
    startGame();
}

function gameWin(){

}

function levelFail(){
    lives --;
    if( lives <= 0 ){
        console.log('Perdiste una vida ')
        level = 0;
        lives = 3;
    } 
    //modal.style.display = "block";
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame(); 
}


function showLives(){
    spamLives.innerHTML='';
    const heartsArray = Array(lives).fill(emojis['HEART']);
    heartsArray.forEach( heart => spamLives.append(heart));
}

function moveUp(){
    
    const X = playerPosition.x;
    const Y = playerPosition.y;
    //console.log({elementSize, canvasSize, X, Y});
    if( Math.floor(playerPosition.y) > Math.floor(elementSize) ){
        playerPosition.y -= elementSize;
        //movePlayer();
        //console.log('mover arriba');
        startGame()
    }
}

function moveLeft(){
    //console.log('mover Izquierda');
    const X = playerPosition.x;
    const Y = playerPosition.y;
    //console.log({elementSize, canvasSize, X, Y});
    if( Math.floor(playerPosition.x) > Math.floor(elementSize) ){
        playerPosition.x -= elementSize;
        //movePlayer();
        startGame()
    }
}

function moveRight(){
    //console.log('mover Derecha');
    const X = playerPosition.x;
    const Y = playerPosition.y;
    //console.log({elementSize, canvasSize, X, Y});
    if( Math.floor(playerPosition.x + elementSize) <= Math.floor(canvasSize ) ){
        playerPosition.x += elementSize;
        //movePlayer();
        startGame()
    }
}

function moveDown(){
    //console.log('mover Abajo');
    const X = playerPosition.x;
    const Y = playerPosition.y;
    //console.log({elementSize, canvasSize, X, Y});
    if( Math.floor(playerPosition.y + elementSize) <= Math.floor(canvasSize ) ){
        playerPosition.y += elementSize;
        //movePlayer();
        startGame()
    }
}