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

// Initialize class losses .text
var loss = 0;
$('.losses').val(loss);
$('.losses').text($('.losses').val());


// Initialize class wins .text
var win = 0;
$(".wins").val(win);
$('.wins').text($('.wins').val());

//    JQUERY    JQUERY    JQUERY    JQUERY
$(document).ready(function(){
  //  SQUARE clickhandler
  $('.square').on('click', function(){
    gameBoard[this.id] = 'x';
    $(this).css('background-color', '#000000');
  });
    //Change DOM to contain X
  $('.square').on('click', function(){
    getWinner();
  });

});

////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
function getWinner() {

  if (winnerIs('x')) {
    var wins = $(".wins").val();
    var total = wins+1;
    $('.wins').text(total);
    alert('You have won!');
    return 'x';
  }
  if (winnerIs('o')) {
    var losses = $(".losses").val();
    var total = losses+1;
    $('.losses').text(total);
    alert('You have lost!');
    return 'o';
  }
  return null;
}
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
//get opponent move
var opponentMove = function(){
  //Waits for update from AJAX on div (lines up to gameBoard(location))
    //this changes value of location to opponent
}


////////////////////////////////////////////////////////
 //This will increment the win/lose counters on the DOM
  // It will take 'winner' from the output of getWinner
var winCount = 0;
var loseCount = 0;

function winCounter(winner){
  if(winner == 'x'){
    winCount++;
  } else if (winner == 'o'){
    loseCount++;
  }
  return null;
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
