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


var Tree = function(value, parent = null) {
  this.value = value;
  this.children = [];
  this.parent = parent;
};

Tree.prototype.addChild = function(value) {
  var newTree = new Tree(value, this);
  this.children.push( newTree );
  return newTree;
};

Tree.prototype.countLeaves = function (numOfLeaves = 0) {
  if (!this.children.length) {
    numOfLeaves++;
  } else {
    for (var child of this.children) {
      numOfLeaves = child.countLeaves(numOfLeaves);
    }
  }
  return numOfLeaves;
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
// window.countNRooksSolutions = function(n) {

//   var treeOfRows = new Tree();


//   var buildTree = function(tree) {
//     var matrix = [];
//     var parent = tree.parent;
//     console.log(parent, tree);
//     if (parent) {
//       while (parent.value) {
//         console.log(parent, tree);
//         matrix.unshift(parent.value);
//         parent = parent.parent;
//       }
//     }


//     var row = Array(n).fill(0);
//     for (var p = 0; p < n; p++) { // columns
//       row[p] = 1;
//       if (!hasConflicts(...matrix)) {
//         buildTree( tree.addChild(row) );
//       }
//       row[p] = 0;
//     }
//   };

//   var hasConflicts = function() {
//     var args = [...arguments];
//     var matrix = [];
//     for (var i = 0; i < n; i++) {
//       if (!args[i]) {
//         matrix.push(Array(n).fill(0));
//       } else {
//         matrix.push(args[i]);
//       }
//     }
//     var board = new Board(matrix);
//     return board.hasAnyRooksConflicts();
//   };


//   buildTree(treeOfRows);

//   return treeOfRows.countLeaves();

//   // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   // return solutionCount;
// };

window.countNRooksSolutions = function(n) {
  var zeroArr = Array(n).fill(0);
  var choices = [];     // [[1]]
  for (var i = 0; i < n; i++) {
    var tempRow = zeroArr.slice();
    tempRow[i] = 1;
    choices.push(tempRow);
  }

  // var board = new Board(possibleRowsMatrix); // [[1,0,0], [0,1,0], [0,0,1]]

  // // console.log('posRowMatrix: ', possibleRowsMatrix);

  // var possibilities = [];

  // var recurse = function(choiceSet, end) {

  //   if (!end) {
  //     possibilities.push(choiceSet);
  //   } else {
  //     for (var i = 0; i < n; i++) {
  //       if (!board.hasAnyRooksConflicts()) {
  //         recurse( choiceSet.concat(possibleRowsMatrix[i]), end - 1);
  //       }

  //     }
  //   }
  // };

  // var board = new Board(choiceSet);

  // recurse([], n);
  var amountOfPossibilities = 0;

  var recurse = function(choiceSet, end)  {
    if (!end) {
      // console.log('choiceSet', choiceSet);
      var board = new Board(choiceSet);
      // console.log('board.rows()', board.rows());
      if (!board.hasAnyRooksConflicts()) {
        amountOfPossibilities++;
      }
    } else {
      for (var i = 0; i < choices.length; i++) {
        // console.log('choices[i]', choices[i]);
        // choiceSet.push(choices[i]);
        recurse( choiceSet.concat( [choices[i]] ), end - 1); // [[1]]
      }
    }
  };
  console.log('n', n);
  recurse([], n);
  // console.log(possibilities);
  return amountOfPossibilities;




  // do the recursive RPS solution with possibleRowsMatrix
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // if (!n) {
  //   console.log(n);
  //   return 0;
  // }
  // var previousAmount = 0;
  // var mostQueens = [];
  // // console.log(n);
  // for (var start = 0; start < n; start++) {
  //   var board = new Board({n: n});
  //   var allRows = board.rows().slice().splice(1);
  //   console.log(allRows);
  //   var currentAmount = 0;
  //   board.togglePiece(0, start);

  //   for (var i = 0; i < allRows.length; i++) {
  //     var row = allRows[i];
  //     for (var p = 0; p < row.length; p++) {
  //       board.togglePiece(i, p);
  //       currentAmount++;
  //       if ( board.hasAnyQueenConflictsOn() ) {
  //         board.togglePiece(i, p);
  //         currentAmount--;
  //       }
  //     }
  //   }

  //   if (previousAmount < currentAmount || !mostQueens.length) {
  //     console.log('bigger');
  //     previousAmount = currentAmount;
  //     mostQueens = board.rows();
  //   }

  // }
  return mostQueens;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
