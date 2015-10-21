// add local(2player) vs Remote
// align gameBoard with ajax array
// ajax
//      LOCAL AND REMOTE
//joinGame
//startGame

//DON"T FORGET STOOPID JoinGame and ShowGame

'use strict';

var gameBoard = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]

var game = {}

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


var watchGame = function(){
    var gameWatcher = tttapi.watchGame(game.id, game.token);
    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cell = gameData.cell;

      if(joined){
        remoteUpdate('x');
      } else {remoteUpdate('o')};
      if (winnerIs('x')|| winnerIs('o')){
        getWinner()} else{getTie()}
    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
  };

var remoteUpdate = function remoteUpdate(value){
  if(cell.value.toUpperCase() == value){
    waiting = false;
    ++totalMoves;
    $('.turn_banner').text("You're up, pup!");
    $('#' + cell.index).text(cell.value.toUpperCase())
    gameBoard[cell.index] = cell.value;
  }
}

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
    $('.turn_banner').text("^ TicTacToe! Pick then Go. ^");
    $('.new_game_remote').show();
    $('.join_game').show();
  });
//LOCAL GAME BOX CLICK HANDLER
  $('.local').click(function(){
    remote = false;
    clearBoard();
    hideButtons();
    $('.turn_banner').text("^ TicTacToe! Pick then Go. ^");
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

    watchGame();
    });
    //MAKE TURN CHECKER
    $('.turn_banner').text("You're up, pup!");


    joined = false;
    waiting = false;
    $('.new_game_remote').hide();
    $('.join_game').hide();
    defineMove();
    $('.turn_banner').text("You're up, pup.");
    $(".square").css("pointer-events", "auto");
  });


// JOIN CLICK HANDLER
  $('.join_game').click(function(){
    $('#game_id').show();
    if(remote === false){
      $('.enter_game').show();
    } else {$('.enter_game_remote').show();}
    hideSecondary();
    $('.new_game_remote').hide();
  });


// ENTER GAME CLICK HANDLER NEED TO ADD TURN CHECK AND TURNCOUNT ITERATOR
  $('.enter_game').click(function(){
    tttapi.showGame(document.getElementById('game_id').value, game.token, function(err, data){
      if (err) {console.error(err)}
      game.id = data.game.id;
      console.log(game.id);
      console.log(data);
      gameBoard = data.game.cells;
       $('.square').each(function(index){
        $(this).html(gameBoard[index].toUpperCase());
      });
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
// ENTER REMOTE GAME NEED TO ADD TURN CHECK AND TURNCOUNT ITERATOR
$('.enter_game_remote').click(function(){
    tttapi.joinGame(document.getElementById('game_id').value, game.token, function(err, data){
      if (err) {
        return console.error(err);
      }
      game.id = document.getElementById('game_id').value;
      console.log(game.id);
      console.log(data);
      gameBoard = data.game.cells;
      $('.square').each(function(index){
        $(this).html(gameBoard[index].toUpperCase());
      });

      watchGame();
    });
    //MAKE TURN CHECKER
    $('.turn_banner').text("You're up, pup!");

    joined = true;
    waiting = false;
    hideSecondary();
    $('.enter_game_remote').hide();
    $('#game_id').hide();
    $('.enter_game').hide();
    defineMove();
    $(".square").css("pointer-events", "auto");

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

// var message;
// if(true) {
//   message = "yes";
// } else {
//   message = "no";
// }

// console.log(message);

var remoteMove = function remoteMove(event){
  var self = event.target;
    if(waiting === false){
      if(gameBoard[this.id] === ''){
        if(joined === false){
          tttapi.markCell(game.id,
            {
              "game": {
                "cell": {
                  "index": self.dataset.index,
                  "value": "x"
                }
              }
            }, game.token, function(err, data){
              if(err){console.log(err)}

          $(self).html(xToken);
          gameBoard[self.dataset.index] = 'x';
          ++totalMoves;
          });
        }
       else{
        tttapi.markCell(game.id,
          {
            "game": {
              "cell": {
                "index": self.dataset.index,
                "value": "o"
                }
              }
            }, game.token, function(err, data){
              if(err){
                console.log(err)
              }

              $(self).html(oToken);
              gameBoard[self.dataset.index] = 'o';
              ++totalMoves;
              });

        }
      }

    if (winnerIs('x')|| winnerIs('o')){
      getWinner()} else{getTie()}
    }
    waiting = true;
    $('.turn_banner').text('Wait a tick, slick');

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
//    CLEAR BOARD/MOVE COUNTER *********** MAJOR CHANGE *************
var clearBoard = function clearBoard(){
  gameBoard = ['','','','','','','','','']
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




