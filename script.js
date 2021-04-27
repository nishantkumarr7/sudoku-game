var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}



function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#0753E7";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]
var ans = [[], [], [], [], [], [], [], [], []]
var res = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let check = document.getElementById('check')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }
            else{
                arr[i][j].innerHTML = `<input type="text" id=${100+i*9+j} maxlength="1">`
            }

           
        }
    }
}



button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

function print() {
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            
           arr[i][j].innerText = res[i][j]
        }
        
    }
}
function storeres(board){
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            res[i][j] = board[i][j]
        }
        
    }
}

//to be completed by student
function isPossible(board, sr, sc, val) {
    for (var row = 0; row < 9; row++) {
        if (board[row][sc] == val) {
            return false;
        }
    }

    for (var col = 0; col < 9; col++) {
        if (board[sr][col] == val) {
            return false;
        }
    }

    var r = sr - sr % 3;
    var c = sc - sc % 3;

    for (var cr = r; cr < r + 3; cr++) {
        for (var cc = c; cc < c + 3; cc++) {
            if (board[cr][cc] == val) {
                return false;
            }
        }
    }
    return true;

}

//to be completed by student
function solveSudokuHelper(board, sr, sc) {
    if (sr == 9) {
        storeres(board);
        return;
    }
    if (sc == 9) {
        solveSudokuHelper(board, sr + 1, 0)
        return;
    }

    if (board[sr][sc] != 0) {
        solveSudokuHelper(board, sr, sc + 1);
        return;
    }

    for (var i = 1; i <= 9; i++) {
        if (isPossible(board, sr, sc, i)) {
            board[sr][sc] = i;
            solveSudokuHelper(board, sr, sc + 1);
            board[sr][sc] = 0;
        }
    }
}

function getinput (board,ans) {
   
    for(var i=0;i<9;i++) {
        for(var j=0;j<9;j++){
        
            if(board[i][j] != 0){
               
                ans[i][j] = board[i][j];
            }
            else{
               
             ans[i][j] = document.getElementById(`${100+i*9+j}`).value;

            }
        }
    }

}

function output(){
    
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

           arr[i][j].innerText = ans[i][j]


        }
    }
    
}

function matching(){ 
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
           var y = parseInt(ans[i][j]);
           console.log(y,res[i][j]);
           if(y == res[i][j]){
               if(board[i][j] == 0){
                 document.getElementById(100+9*i+j).style.backgroundColor = "#9DF082";
               }
           }
           else{
            document.getElementById(100+9*i+j).style.backgroundColor = "#ff726f";
           }
        }
    }
}

check.onclick = function () {
    getinput(board,ans)
    solveSudoku(board)
    matching()

   

}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0)
}

solve.onclick = function () {
    solveSudoku(board)
    print()

}
