 const canvas = document.querySelector('#game');
 const game = canvas.getContext('2d');
 let canvasSize;
 let elementSize;

 // Este es el orden correcto para que el render no borre las bombas y ordenar los procesos en funciones
 window.addEventListener('load', setCanvasSize);
 window.addEventListener('resize', setCanvasSize);


 function setCanvasSize(){
    // para hacer que el canvas adopte el tamaño de la ventana html se requiere de realizar los siguientes comandos
    
    canvasSize = Math.min(canvasSize = window.innerHeight *.7, canvasSize = window.innerWidth *.7);
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
    for (let x = 0; x < 10; x++) {
        for (let y = 1; y <= 10; y++) {
            game.fillText ( emojis['X'], elementSize * x, elementSize * y ) ;
        }
    } 
    console.log({canvasSize, elementSize});
}