// remove all alerts(win/loss/tie)
// add local(2player) vs Remote
// clean up annotation
// align gameBoard with ajax array




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
var totalMoves = 0;
//    JQUERY    JQUERY    JQUERY    JQUERY
$(document).ready(function(){
  //  SQUARE clickhandler
  $('.square').on('click', function(){
    gameBoard[this.id] = 'x';
    $(this).text('X');
    ++totalMoves;
    if(totalMoves == 9){getTie()}
    getWinner();
  //  getTie();
  //  move();
  });

});

////////////////////////////////////////////////////////
//Clear board on win/loss/tie
var clearBoard = function(){
  for(var key in gameBoard){
    gameBoard[key] = null}
  $('.square').text('');
  totalMoves = 0;
}

// Initialize var wins and updates class .text
var wins = 0;
$('.wins').text(wins);

// Initialize var losss and updates class .text
var losses = 0;
$('.losses').text(losses);

////////////////////////////////////////////////////////
function getWinner() {

  if (winnerIs('x')) {
    ++wins;
    $('.wins').text(wins);
    clearBoard();
    alert('You have won!');
    return 'x';
  }
  if (winnerIs('o')) {
    ++losses;
    $('.losses').text(losses);
    clearBoard();
    alert('You have lost!');
    return 'o';
  }
  return null;
}
////////////////////////////////////////////////////////
          //      2 PLAYER GAME
var playerMove = 'x';
//Need to fix
var move = function(){
  if(playerMove == 'x'){
    gameBoard[this.id] = 'x';
    $(this).text('X');
    playerMove = 'o';
  } else{
    gameBoard[this.id] = 'o';
    $(this).text('O');
    playerMove = 'x';
  }
}
////////////////////////////////////////////////////////
// var getTie = function(){
//   for(var key in gameBoard){
//     if(gameBoard[key]){
//       alert('Tie game!');
//       clearBoard();
//       $('.square').text('');
//       return null;
//     }
// }
var getTie = function(){
    alert('This is a tie.');
    clearBoard();
}


////////////////////////////////////////////////////////
//get opponent move
var opponentMove = function(){
  //Waits for update from AJAX on div (lines up to gameBoard(location))
    //this changes value of location to opponent
}

////////////////////////////////////////////////////////
function winnerIs(player) {
  return winsRow(player) || winsColumn(player) || winsDiagonal(player);
}

////////////////////////////////////////////////////////
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
function allThree(player, cellOne, cellTwo, cellThree) {
  return (cellOne === player) && (cellTwo === player) && (cellThree === player);
}


////////////////////////////////////////////////////////

//var foundOpponent = true;

//**NEED AJAX request for opponent AND changeState function **
//if (!opponent){foundOpponent = false};
//if(foundOpponent){
//   var yourTurn = true;
// }
//**NEED TO ADD  the switch yourTurn function**


