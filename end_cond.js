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
