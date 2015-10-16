////////////////////////////////////////////////////////
//     ENDGAME FUNCTIONS

var getWinner = function getWinner() {
  if(!remote){
    if (winnerIs('x')) {
      ++wins;
      $('.wins').text(wins);
      showButtons();
      $('.turn_banner').text("X's WIN - Gimmie some skin!");
      $(".square").css("pointer-events", "none");
    //  markGameOver();
    }
    if (winnerIs('o')) {
      ++losses;
      $('.losses').text(losses);
      showButtons();
      $('.turn_banner').text('O won, kind of a pun!');
      $(".square").css("pointer-events", "none");
    //  markGameOver();
    }
  } else{
    if (winnerIs('x')) {
      ++wins;
      $('.wins').text(wins);
      showButtons();
      $('.turn_banner').text('winnawinna, chiqin dinnah!');
      $(".square").css("pointer-events", "none");
    //  markGameOver();
    }
    if (winnerIs('o')) {
      ++losses;
      $('.losses').text(losses);
      showButtons();
      $('.turn_banner').text('loser, boozer?');
      $(".square").css("pointer-events", "none");
    //  markGameOver();
    }
    return null;
  }
}

var getTie = function getTie(){
  if(totalMoves == 9){
    $('.turn_banner').text('A tie, sigh');
    $(".square").css("pointer-events", "none");
    showButtons();
  }
  //  markGameOver();
}
