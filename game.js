const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvasSize;
let elementSize;
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

const playerPosition = {
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
    canvasSize = Math.min(canvasSize = window.innerHeight *.8, canvasSize = window.innerWidth *.8);
    canvas.setAttribute( 'width', canvasSize );
    canvas.setAttribute( 'height', canvasSize);
    // dividinos el canvas entre 10 
    elementSize = canvasSize /10;

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
    const map = maps[2];
    // lo trasformo en renglones
    const mapRows = map.trim().split('\n'); // limpio los inicions con split genero los row
    const mapRowCols = mapRows.map( row => row.trim().split('') );


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
                    //console.log();
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                
                }
            }
        })

        movePlayer();
    });

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
    game.fillText( emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveUp(){
    console.log('mover arriba');
    playerPosition.y -= elementSize;
    //movePlayer();
    startGame()
}

function moveLeft(){
    console.log('mover Izquierda');
    playerPosition.x -= elementSize;
    //movePlayer();
    startGame()
}

function moveRight(){
    console.log('mover Derecha');
    playerPosition.x += elementSize;
    //movePlayer();
    startGame()
}

function moveDown(){
    console.log('mover Abajo');
    playerPosition.y += elementSize;
    //movePlayer();
    startGame()
}