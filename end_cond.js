////////////////////////////////////////////////////////
//    NAMES WINNER

function winnerIs(player) {

  return winsRow(player) || winsColumn(player) || winsDiagonal(player);
}

////////////////////////////////////////////////////////
//    DECLARES WIN CONDITIONS
function winsRow(player) {
  return allThree(player, gameBoard[0], gameBoard[1], gameBoard[2]) ||
         allThree(player, gameBoard[3], gameBoard[4], gameBoard[5]) ||
         allThree(player, gameBoard[6], gameBoard[7], gameBoard[8]);
}

function winsColumn(player) {
  return allThree(player, gameBoard[0], gameBoard[3], gameBoard[6]) ||
         allThree(player, gameBoard[1], gameBoard[4], gameBoard[7]) ||
         allThree(player, gameBoard[2], gameBoard[5], gameBoard[8]);
}

function winsDiagonal(player) {
  return allThree(player, gameBoard[0], gameBoard[4], gameBoard[8]) ||
         allThree(player, gameBoard[2], gameBoard[4], gameBoard[6]);
}

////////////////////////////////////////////////////////
//    CATCHES THREE CELLS FOR WIN CONDITION
function allThree(player, cellOne, cellTwo, cellThree) {

  return (cellOne === player) && (cellTwo === player) && (cellThree === player);
}
