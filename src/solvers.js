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


window.findSolution = function(row, n, board, validator, callback) {
  // if all rows exhausted, this is a valid solution.
  if (row === n) {
    return callback();
  }

  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[validator]()) {
      var result = findSolution(row + 1, n, board, validator, callback);
      if (result) {
        return result; // EJECT
      }
    }
    board.togglePiece(row, i);
  }
};


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
  var amountOfPossibilities = 0;
  var board = new Board({n: n});

  // recurse([], n);


  var recurse = function(rowIndex)  {
    if (rowIndex === n) { // if at bottom of rows

      // console.log('board.rows()', board.rows());
      amountOfPossibilities++;
      return;
    }

    for (var i = 0; i < n; i++) {
      // console.log('choices[i]', choices[i]);
      board.togglePiece(rowIndex, i);
      if (!board.hasAnyRooksConflicts()) {
        recurse(rowIndex + 1);
      }
      board.togglePiece(rowIndex, i);
       // [[1]]
    }

  };
  // console.log('n', n);
  recurse(0);
  // console.log(possibilities);
  return amountOfPossibilities;




  // do the recursive RPS solution with possibleRowsMatrix
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({n: n});

  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });
  // If no solution exists, return the original unaltered board
  solution = solution || board.rows();
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var amountOfPossibilities = 0;
  var board = new Board({n: n});

  // recurse([], n);


  var recurse = function(rowIndex)  {
    if (rowIndex === n) { // if at bottom of rows

      // console.log('board.rows()', board.rows());
      amountOfPossibilities++;
      return;
    }

    for (var i = 0; i < n; i++) {
      // console.log('choices[i]', choices[i]);
      board.togglePiece(rowIndex, i);
      if (!board.hasAnyQueensConflicts()) {
        recurse(rowIndex + 1);
      }
      board.togglePiece(rowIndex, i);
       // [[1]]
    }

  };
  // console.log('n', n);
  recurse(0);
  // console.log(possibilities);
  return amountOfPossibilities;
};
