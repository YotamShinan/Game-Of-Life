'use Srtict';
console.log('Game of Life');

var matlength = 18;
var gBoard = [];
var time;
var lifeSign = '🤍';
var noLife = '';
var gameOn = false;
// init()

function init() {
    gBoard = createBoard(matlength);
    renderBoard(gBoard);
    time = setInterval(play, 1000); 
}

function play() {
    gBoard = runGeneration(gBoard);
    renderBoard(gBoard);
}

function createBoard(matlength) {
    var board = [];
    for (var i = 0; i < matlength; i++) {
        var row = [];
        for (var j = 0; j < matlength; j++) {
            var cell = {
                value: 0,
                isAlive: false
            }
            row.push(cell);
        }
        board.push(row);
    }
    board[1][1].isAlive = true;
    board[1][2].isAlive = true;
    board[2][2].isAlive = true;
    board[1][4].isAlive = true;
    // board[2][4].isAlive = true;
    board[3][2].isAlive = true;
    // board[4][1].isAlive = true;
    board[0][0].isAlive = true;
    board[2][1].isAlive = true;
    return board
}

function countNeigh(board, row, col) {
    count = 0
    rowStart = row - 1;
    rowEnd = row + 1;
    colStart = col - 1;
    colEnd = col + 1;
    for (var i = rowStart; i <= rowEnd; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colStart; j <= colEnd; j++) {
            if (j < 0 || j >= board[0].length) continue;
            if (i === row && j === col) continue;
            if (board[i][j].isAlive) count++

        }
    }
    return count;
}

function renderBoard(board) {

    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].isAlive) {
                strHtml += `<td class="${lifeSign}">${lifeSign}</td>`;
            } else {
                strHtml += `<td class="${noLife}">${noLife}</td>`;
            }
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}


function runGeneration(board) {
    
    var copiedBoard = copyBoard(board);
    for (var i = 0; i < copiedBoard.length; i++) {
        for (var j = 0; j < copiedBoard[i].length; j++) {
            neighbors = countNeigh(copiedBoard, i, j);
            if (neighbors < 3 || neighbors > 5) {
                board[i][j].isAlive = false;
            } else {
                board[i][j].isAlive = true;
            }
        }
    }
    return board;
}

function copyBoard(mat) {
    var copiedBoard = [];
    for (var i = 0; i < mat.length; i++) {
        copiedBoard[i] = [];
        for (var j = 0; j < mat[i].length; j++) {
            copiedBoard[i][j] = mat[i][j];
        }
    }
    return copiedBoard;
}



