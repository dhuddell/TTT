
//
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

////////////////////////////////////////////////////////
function getWinner() {
  if (winnerIs('x')) {
    return 'x';
  }
  if (winnerIs('o')) {
    return 'o';
  }
  return null;
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
  return allThree(player, cells('a'), cells('b'), cells('c')) ||
         allThree(player, cells('d'), cells('e'), cells('f')) ||
         allThree(player, cells('g'), cells('h'), cells('i'));
}

function winsColumn(player) {
  return allThree(player, cells('a'), cells('d'), cells('g')) ||
         allThree(player, cells('b'), cells('e'), cells('h')) ||
         allThree(player, cells('c'), cells('f'), cells('i'));
}

function winsDiagonal(player) {
  return allThree(player, cells('a'), cells('e'), cells('i')) ||
         allThree(player, cells('c'), cells('e'), cells('g'));
}

////////////////////////////////////////////////////////
function allThree(player, cellOne, cellTwo, cellThree) {
  return (cellOne === player) && (cellTwo === player) && (cellThree === player);
}


////////////////////////////////////////////////////////
