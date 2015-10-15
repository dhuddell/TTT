// add local(2player) vs Remote
// align gameBoard with ajax array
// ajax


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
var waiting;
var localCreds={
  'username' : 'daaan',
  'password' : 'abc123',
  'token' : 'a6ddd0d335d8b73547e7fe809cc1f38c'
}
var wins = 0;
$('.wins').text(wins);
var losses = 0;
$('.losses').text(losses);


////////////////////////////////////////////////////////
//    JQUERY
$(document).ready(function(){


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
      console.log(data);
      $('#register_form').hide();
    })
  });


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
        game.token = data.user.token;
        $('.start').slideUp(400);
      }
    )
  });


  $('.remote').click(function(){
    remote = true;
    clearBoard();
    hideButtons();
    $(".square").css("pointer-events", "auto");
    $('.square').click(remoteMove);

  });

  $('.local').click(function(){
    remote = false;
    clearBoard();
    tttapi.createGame(game.token, function(err, data){
      if (err) {console.error(err)}
      game.id = data.game.id;
    });
    // tttapi.joinGame(534, localCreds['token'], function(err, data){
    //   if (err) {console.error(err);
    //   } console.log(gameID);
    // });
    hideButtons();
    $(".square").css("pointer-events", "auto");
    $('.square').click(localMove)

    if(playerX === true){
      $('.turn_banner').text("X's turn, FLEX!");
    } else {
      $('.turn_banner').text("O's turn, YO!");
    }
  });

  //CAN'T GET TO REMOTEMOVE, Don't know where to put this logic.
  // debugger;
  // if(remote === false){
  //   $('.square').click(localMove);
  // }else{
  //   $('.square').click(remoteMove);
  // };
});

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
        $(this).text('X');
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
        $(this).text('O');
        gameBoard[this.id] = 'o';
        ++totalMoves;
        $('.turn_banner').text("X's chance, FLEX!");
        playerX = true;
      }
    }
  getWinner();
  if(totalMoves == 9){getTie()}
};

//    REMOTE GAME MOVE FUNCTION
var remoteMove = function remoteMove(){
  console.log("Index : " + this.dataset.index);
  if(gameBoard[this.id] === null){
    gameBoard[this.id] = 'x';
    $(this).text('X');
    ++totalMoves;
    getWinner();
    if(totalMoves == 9){getTie()}
  }
};
////////////////////////////////////////////////////////
//     MAKE A GAME: OVER

// var markGameOver = function (){
//   tttapi.endGame(
//     game.id,
//     {
//       "game": {
//         "over": true
//       }
//     },
//     game.token,
//     function(err, data){
//       if(err){
//         console.log(err);
//       }
//     }
//   );
// }
////////////////////////////////////////////////////////
//     REMOTE GAME (HERE PLEASE)


////////////////////////////////////////////////////////
//    CLEAR BOARD/MOVE COUNTER
var clearBoard = function clearBoard(){
  for(var key in gameBoard){
    gameBoard[key] = null}
  $('.square').text('');
  totalMoves = 0;
}

var showButtons = function showButtons(){
  $('.remote').show();
  $('.local').show();
}

var hideButtons = function hideButtons(){
  $('.remote').hide();
  $('.local').hide();
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
    $('.turn_banner').text('A tie, sigh');
    $(".square").css("pointer-events", "none");
    showButtons();
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



