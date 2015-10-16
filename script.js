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
  'a': '',
  'b': '',
  'c': '',
  'd': '',
  'e': '',
  'f': '',
  'g': '',
  'h': '',
  'i': ''
}

var game = {}
// game.token = abc123

var totalMoves = 0;
var remote = false;
var playerX = true;
var xToken = 'X';
var oToken = 'O';
var waiting;
var joined;
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
        showButtons();
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
//        SECONDARY and REMOTE BUTTONS->CREATE AND JOIN/ENTER

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

$('.new_game_remote').click(function(){
    tttapi.createGame(game.token, function(err, data){
      if (err) {console.error(err)}
      game.id = data.game.id;
    });
    joined = false;
    waiting = false;
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
    if(remote === false){
      $('.enter_game').show();
    } else {$('.enter_game_remote').show();}
    hideSecondary();
  });

// ENTER GAME CLICK HANDLER
  $('.enter_game').click(function(){
    tttapi.showGame(document.getElementById('game_id').value, game.token, function(err, data){
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
    $('#game_id').hide();
    $('.enter_game').hide();
    defineMove();
    $(".square").css("pointer-events", "auto");
    if(playerX === true){
      $('.turn_banner').text("X's turn, FLEX!");
    } else {
      $('.turn_banner').text("O's turn, YO!");
    };

  });

$('.enter_remote_game').click(function(){
    tttapi.joinGame(document.getElementById('game_id').value, game.token, function(err, data){
      if (err) {console.error(err)}
      tttapi.watchGame(document.getElementById('game_id').value, game.token);
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
    joined = true;
    waiting = true;
    hideSecondary();
    $('#game_id').hide();
    $('.enter_game').hide();
    defineMove();
    $(".square").css("pointer-events", "auto");
    if(playerX === true){
      $('.turn_banner').text("X's turn, FLEX!");
    } else {
      $('.turn_banner').text("O's turn, YO!");
    };

  });
});

var defineMove = function defineMove(){
  if(remote === true){
    $('.square').on('click', remoteMove);
  } else {$('.square').on('click', localMove)}
};

////////////////////////////////////////////////////////
//    LOCAL GAME MOVE FUNCTION
var localMove = function localMove(){
    if(gameBoard[this.id] === ''){
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
    if(waiting === false){
      if(gameBoard[this.id] === ''){
        if(joined === false){
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
        }
       else{
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
        }
      }

    if (winnerIs('x')|| winnerIs('o')){
      getWinner()} else{getTie()}
    }
    waiting = true;
    $('.turn_banner').text('Give a min, twin');

};
////////////////////////////////////////////////////////
//     MAKE A GAME: OVER **NONFUNCTIONING**

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
//    CLEAR BOARD/MOVE COUNTER
var clearBoard = function clearBoard(){
  for(var key in gameBoard){
    gameBoard[key] = ''}
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




