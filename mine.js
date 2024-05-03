let board = [];
let rows = 8;
let columns = 8;

let astroidCount = 6;
let astroidLocation = []; // "2-2", "3-4", "2-1"

let tilesClicked = 0; //goal to click all tiles except the ones containing astroid
let flagEnabled = false;

let gameOver = false;

window.onload = function() {
    startGame();
}

function setastroid() {
    // astroidLocation.push("2-2");
   

    let astroidLeft = astroidCount;
    while (astroidLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!astroidLocation.includes(id)) {
            astroidLocation.push(id);
            astroidLeft -= 1;
        }
    }
}


function startGame() {
    document.getElementById("astro-count").innerText = astroidCount;
    document.getElementById("rocket-button").addEventListener("click", setFlag);
    setastroid();

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("rocket-button").style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true;
        document.getElementById("rocket-button").style.backgroundColor = "darkgray";
    }
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    let tile = this;
    if (flagEnabled) {
        if (tile.innerText == "") {
            tile.innerText = "🚀";
        }
        else if (tile.innerText == "🚀") {
            tile.innerText = "";
        }
        return;
    }

    if (astroidLocation.includes(tile.id)) {
    
        gameOver = true;
        revealastroid();
        return;
    }


    let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

}

function revealastroid() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (astroidLocation.includes(tile.id)) {
                tile.innerText = "☄️";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let astroidFound = 0;

    //top 3
    astroidFound += checkTile(r-1, c-1);      //top left
    astroidFound += checkTile(r-1, c);        //top 
    astroidFound += checkTile(r-1, c+1);      //top right

    //left and right
    astroidFound += checkTile(r, c-1);        //left
    astroidFound += checkTile(r, c+1);        //right

    //bottom 3
    astroidFound += checkTile(r+1, c-1);      //bottom left
    astroidFound += checkTile(r+1, c);        //bottom 
    astroidFound += checkTile(r+1, c+1);      //bottom right

    if (astroidFound > 0) {
        board[r][c].innerText = astroidFound;
        board[r][c].classList.add("x" + astroidFound.toString());
    }
    else {
        board[r][c].innerText = "";

        //top 3
        checkMine(r-1, c-1);    //top left
        checkMine(r-1, c);      //top
        checkMine(r-1, c+1);    //top right

        //left and right
        checkMine(r, c-1);      //left
        checkMine(r, c+1);      //right

        //bottom 3
        checkMine(r+1, c-1);    //bottom left
        checkMine(r+1, c);      //bottom
        checkMine(r+1, c+1);    //bottom right
    }

    if (tilesClicked == rows * columns - astroidCount) {
        document.getElementById("astro-count").innerText = "Cleared";
        gameOver = true;
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (astroidLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}