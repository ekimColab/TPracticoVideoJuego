 const canvas = document.querySelector('#game');
 const game = canvas.getContext('2d');
 let canvasSize;
 let elementSize;

 // Este es el orden correcto para que el render no borre las bombas y ordenar los procesos en funciones
 window.addEventListener('load', setCanvasSize);
 window.addEventListener('resize', setCanvasSize);


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

    for (let row = 1;  row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game.fillText ( emojis[mapRowCols[row -1 ][col -1]], elementSize * col, elementSize * row ) ;
        }
    }
    console.log({map, mapRows, mapRowCols}); 
    //console.log({canvasSize, elementSize, map});
}