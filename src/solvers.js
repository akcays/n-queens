/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var allRows = board.rows();
  for (var i = 0; i < allRows.length; i++) {
    var row = allRows[i];
    for (var p = 0; p < row.length; p++) {
      board.togglePiece(i, p);
      if ( board.hasAnyRooksConflicts() ) {
        board.togglePiece(i, p);
      }
    }
  }

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // if (!n) {
  //   console.log(n);
  //   return 0;
  // }
  var previousAmount = 0;
  var mostQueens = [];
  // console.log(n);
  for (var start = 0; start < n; start++) {
    var board = new Board({n: n});
    var allRows = board.rows().slice().splice(1);
    console.log(allRows);
    var currentAmount = 0;
    board.togglePiece(0, start);

    for (var i = 0; i < allRows.length; i++) {
      var row = allRows[i];
      for (var p = 0; p < row.length; p++) {
        board.togglePiece(i, p);
        currentAmount++;
        if ( board.hasAnyQueenConflictsOn() ) {
          board.togglePiece(i, p);
          currentAmount--;
        }
      }
    }

    if (previousAmount < currentAmount || !mostQueens.length) {
      console.log('bigger');
      previousAmount = currentAmount;
      mostQueens = board.rows();
    }

  }
  return mostQueens;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
