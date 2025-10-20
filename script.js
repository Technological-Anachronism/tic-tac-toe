
var grid = [
[0, 0, 0],
[0, 0, 0],
[0, 0, 0],
];

var turnNum = 0;
var xWin = 0;
var oWin = 0;
var plays = 0;

function handleClick(box) {
    document.getElementById("announce").innerHTML = "Game in Progress...";
    if (grid[getX(box)][getY(box)] == 0) {
        turn(box);
        plays++;
    }
    if (turnNum >= 5) {
        checkWin();
    }
    
}
//checks for x or o turn then changes inner html accordingly and changes matrix entry
function turn(box) {
    turnNum++;
    console.log(turnNum);
    var x = getX(box);
    var y = getY(box);
    if (turnNum % 2 == 1) {
        document.getElementById(box).innerHTML = "X";
        grid[x][y] = 3;

    }
    else if (turnNum % 2 == 0) {
        document.getElementById(box).innerHTML = "O";
        grid[x][y] = 4;
    }
}
function getX(box) {
    var x = parseInt(box.at(1)) - 1;
    return x;
}
function getY(box) {
    var y = parseInt(box.at(3)) - 1;
    return y;
}
function checkWin() {
    if (sumDiagnalTB() == 9 || sumDiagnalBT() == 9) {
        document.getElementById("announce").innerHTML = "X Wins!!!";
        setTimeout(reset, 3000, 1);
        return;
    }
    else if (sumDiagnalTB() == 12 || sumDiagnalBT() == 12) {
        document.getElementById("announce").innerHTML = "O Wins!!!";
        setTimeout(reset, 3000, 0);
        return;
    }
    else {
        for (var i = 0; i < 3; i++) {
            if (sumRow(i) == 9 || sumCol(i) == 9) {
                document.getElementById("announce").innerHTML = "X Wins!!!";
                setTimeout(reset, 3000, 1);
                return;
            }
            else if (sumRow(i) == 12 || sumCol(i) == 12) {
                document.getElementById("announce").innerHTML = "O Wins!!!";
                setTimeout(reset, 3000, 0);
                return;
            }
        }
        if (plays == 9) {
            document.getElementById("announce").innerHTML = "Draw :(";
            setTimeout(reset, 3000, 2);
        }
    }
    
}
function sumRow(row) {
    return grid[row][0] + grid[row][1] + grid[row][2];
}
function sumCol(col) {
    return grid[0][col] + grid[1][col] + grid[2][col];
}
function sumDiagnalTB() {
    return grid[0][0] + grid[1][1] + grid[2][2];
}
function sumDiagnalBT() {
    return grid[0][2] + grid[1][1] + grid[2][0];
}
function reset(winner) {
    for (var i = 1; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            document.getElementById("r" + i + "c" + j).innerHTML = " ";
            grid[i - 1][j - 1] = 0;
        }
    }
    if (winner == 0) {
        oWin++;
        turnNum = -1;
        document.getElementById("announce").innerHTML = "O First!";
    }
    if (winner == 1) {
        xWin++;
        turnNum = 0;
        document.getElementById("announce").innerHTML = "X First!";
    }
    else if (winner == 2) {
        turnNum -= 9;
        if (turnNum == -1) {
            document.getElementById("announce").innerHTML = "O First!";
        }
        if (turnNum == 0) {
            document.getElementById("announce").innerHTML = "X First!";
        }

    }
    plays = 0;
    document.getElementById("tally").innerHTML = "X: " + xWin + "\tO: " + oWin;
}