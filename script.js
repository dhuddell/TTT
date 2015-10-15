// add local(2player) vs Remote
// align gameBoard with ajax array
// ajax
//      LOCAL AND REMOTE
//joinGame
//startGame


////////////////////////////////////////////////////////

//var foundOpponent = true;

//**NEED AJAX request for opponent AND changeState function **

'use strict';

var gameBoard = {
  'a': null,
  'b': null,
  'c': null,
  'd': null,
  'e': null,
  'f': null,
  'g': null,
  'h': null,
  'i': null
}

var game = {}
// game.token = abc123

var totalMoves = 0;
var remote = false;
var playerX = true;
var xToken = 'X';
var oToken = 'O';
var waiting;
var wins = 0;
$('.wins').text(wins);
var losses = 0;
$('.losses').text(losses);


////////////////////////////////////////////////////////
//    JQUERY
$(document).ready(function(){

//REGISTER
  $('#register_submit').on('click', function(){
   tttapi.register({
    "credentials": {
      "email": document.getElementById('user_email').value,
      "password": document.getElementById('user_pw').value,
      "password_confirmation": document.getElementById('user_pwc').value
    }},
   function(err, data){
      if (err) {
        console.error(err);
      }
      $('#register_form').hide();
    })
  });

//LOGIN
  $('#login_submit').on('click', function(){
   tttapi.login({
      "credentials": {
        "email": document.getElementById('login_email').value,
        "password": document.getElementById('login_pw').value
      }
    },
      function(err, data){
        if (err) {
          console.error(err);
        }
        console.log(data);
        game.token = data.user.token;
        $('.start').slideUp(400);
        $('.turn_banner').text("^ TicTacToe! Pick then Go. ^");

      }
    )
  });

//REMOTE GAME BOX CLICK HANDLER
  $('.remote').click(function(){
    remote = true;
    clearBoard();
    hideButtons();
    showSecondary();
  });
//LOCAL GAME BOX CLICK HANDLER
  $('.local').click(function(){
    remote = false;
    clearBoard();
    hideButtons();
    showSecondary();
  });

////////////////////////////////////////////////////////
//        SECONDARY BUTTONS->CREATE AND JOIN/ENTER

  $('.new_game').click(function(){
    tttapi.createGame(game.token, function(err, data){
      if (err) {console.error(err)}
      game.id = data.game.id;
    });
    hideSecondary();
    defineMove();
    $(".square").css("pointer-events", "auto");
    if(playerX === true){
      $('.turn_banner').text("X's turn, FLEX!");
    } else {
      $('.turn_banner').text("O's turn, YO!");
    }
  });

// JOIN CLICK HANDLER
  $('.join_game').click(function(){
    $('#game_id').show();
    $('.enter_game').show();
    hideSecondary();
  });

// ENTER GAME CLICK HANDLER
  $('.enter_game').click(function(){
    tttapi.joinGame(document.getElementById('game_id').value, game.token, function(err, data){
      if (err) {console.error(err)}
      game.id = data.game.id;
      console.log(game.id);
      console.log(data);
      gameBoard['a'] = data.game.cells[0];
      gameBoard['b'] = data.game.cells[1];
      gameBoard['c'] = data.game.cells[2];
      gameBoard['d'] = data.game.cells[3];
      gameBoard['e'] = data.game.cells[4];
      gameBoard['f'] = data.game.cells[5];
      gameBoard['g'] = data.game.cells[6];
      gameBoard['h'] = data.game.cells[7];
      gameBoard['i'] = data.game.cells[8];
      $('#a').html(gameBoard['a'].toUpperCase());
      $('#b').html(gameBoard['b'].toUpperCase());
      $('#c').html(gameBoard['c'].toUpperCase());
      $('#d').html(gameBoard['d'].toUpperCase());
      $('#e').html(gameBoard['e'].toUpperCase());
      $('#f').html(gameBoard['f'].toUpperCase());
      $('#g').html(gameBoard['g'].toUpperCase());
      $('#h').html(gameBoard['h'].toUpperCase());
      $('#i').html(gameBoard['i'].toUpperCase());
    });
    hideSecondary();
    defineMove();
    $(".square").css("pointer-events", "auto");
    if(playerX === true){
      $('.turn_banner').text("X's turn, FLEX!");
    } else {
      $('.turn_banner').text("O's turn, YO!");
    }

  });
});

var defineMove = function defineMove(){
  if(remote === true){
    $('.square').click(remoteMove);
  } else {$('.square').on('click', localMove)}
};

////////////////////////////////////////////////////////
//    LOCAL GAME MOVE FUNCTION
var localMove = function localMove(){
    if(gameBoard[this.id] === null){
      if(playerX === true){
        tttapi.markCell(game.id,
          {
            "game": {
              "cell": {
                "index": this.dataset.index,
                "value": "x"
              }
            }
          }, game.token, function(err, data){
            if(err){console.log(err)}
          });
        $(this).html(xToken);
        gameBoard[this.id] = 'x';
        ++totalMoves;
        playerX = false;
        $('.turn_banner').text("O's turn, YO!");
      } else{
        tttapi.markCell(game.id,
          {
            "game": {
              "cell": {
                "index": this.dataset.index,
                "value": "o"
              }
            }
          }, game.token, function(err, data){
            if(err){console.log(err)}
          });
        $(this).html(oToken);
        gameBoard[this.id] = 'o';
        ++totalMoves;
        $('.turn_banner').text("X's chance, FLEX!");
        playerX = true;
      }
    if (winnerIs('x')|| winnerIs('o')){
      getWinner()} else{getTie()}
    }

};

//    REMOTE GAME MOVE FUNCTION
var remoteMove = function remoteMove(){
  console.log("Index : " + this.dataset.index);
  if(gameBoard[this.id] === null){
    gameBoard[this.id] = 'x';
    $(this).html('X');
    ++totalMoves;
    if(getWinner()){
      getWinner()
    } else {getTie()}
  }
};
////////////////////////////////////////////////////////
//     MAKE A GAME: OVER

var markGameOver = function (){
  tttapi.endGame(
    game.id,
    {
      "game": {
        "over": true
      }
    },
    game.token,
    function(err, data){
      if(err){
        console.log(err);
      }
    }
  );
}
////////////////////////////////////////////////////////
//     REMOTE GAME (HERE PLEASE)


////////////////////////////////////////////////////////
//    CLEAR BOARD/MOVE COUNTER
var clearBoard = function clearBoard(){
  for(var key in gameBoard){
    gameBoard[key] = null}
  $('.square').html('');
  totalMoves = 0;
}
////////////////////////////////////////////////////////
//    BUTTON DISPLAYS

var showButtons = function showButtons(){
  $('.remote').show();
  $('.local').show();
}

var showSecondary = function showSecondary(){
  $('.new_game').show();
  $('.join_game').show();
}

var hideButtons = function hideButtons(){
  $('.remote').hide();
  $('.local').hide();
}

var hideSecondary = function hideSecondary(){
  $('.new_game').hide();
  $('.join_game').hide();
}

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
      alert('You have won!');
      $(".square").css("pointer-events", "none");
    //  markGameOver();
    }
    if (winnerIs('o')) {
      ++losses;
      $('.losses').text(losses);
      showButtons();
      alert('You have lost!');
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
////////////////////////////////////////////////////////
//get opponent move
var opponentMove = function(){
  //Waits for update from AJAX on div (lines up to gameBoard(location))
    //this changes value of location to opponent
}

////////////////////////////////////////////////////////
//    NAMES WINNER
function winnerIs(player) {

  return winsRow(player) || winsColumn(player) || winsDiagonal(player);
}

////////////////////////////////////////////////////////
//    DECLARES WIN CONDITIONS
function winsRow(player) {
  return allThree(player, gameBoard['a'], gameBoard['b'], gameBoard['c']) ||
         allThree(player, gameBoard['d'], gameBoard['e'], gameBoard['f']) ||
         allThree(player, gameBoard['g'], gameBoard['h'], gameBoard['i']);
}

function winsColumn(player) {
  return allThree(player, gameBoard['a'], gameBoard['d'], gameBoard['g']) ||
         allThree(player, gameBoard['b'], gameBoard['e'], gameBoard['h']) ||
         allThree(player, gameBoard['c'], gameBoard['f'], gameBoard['i']);
}

function winsDiagonal(player) {
  return allThree(player, gameBoard['a'], gameBoard['e'], gameBoard['i']) ||
         allThree(player, gameBoard['c'], gameBoard['e'], gameBoard['g']);
}

////////////////////////////////////////////////////////
//    CATCHES THREE CELLS FOR WIN CONDITION
function allThree(player, cellOne, cellTwo, cellThree) {

  return (cellOne === player) && (cellTwo === player) && (cellThree === player);
}



