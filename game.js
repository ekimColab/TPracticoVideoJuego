 const canvas = document.querySelector('#game');
 const game = canvas.getContext('2d');


 window.addEventListener('load', startGame);
 function startGame(){
    //game.fillRect(0,0,100,1000);
    //game.cleanRect(50,50,50,50);
    //game.cleanRect();
    //game.cleanRect(50,50,50,50);

    //game.font - '25px Vernada';
    //game.fillStyle = 'purple';
    //game.textAlign = 'left';
    //game.fillText( 'Pandamonio', 25, 25); 


    canvas.setAttribute( 'width', window.innerWidth *.75 );
    canvas.setAttribute( 'height', window.innerHeight *.5);

    
 }