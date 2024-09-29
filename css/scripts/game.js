//every time you create a new function, export from game.js and import to game.test.js 

let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"]
};

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if(game.currentGame.length > 0 && !game.turnInProgress) { // only accept the click if a game is in progress. Disallow click if computer's turn/no game in progress.
                    let move = e.target.getAttribute("id");
                    game.lastButton = move; //stores move in game.lastButton
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }    
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
};

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
};

function showTurns() { // setting interval, turning lights on, incrementing turn number, turning lights off.
    game.turnInProgress = true; // turn begins
    game.turnNumber = 0;
    let turns = setInterval(function () {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false; // turn finishes
        }
    }, 800);
};

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light"); //adds fade
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light"); //removes fade
    }, 400); //after 400ms
};

function playerTurn() {
    let i = game.playerMoves.length -1; //gets last element from playerMoves array.
    if (game.currentGame[i] === game.playerMoves[i]) { //compares two arrays
        if (game.currentGame.length == game.playerMoves.length) {//finds out if we're at the end of the sequence i.e. if player got them all correct.
        game.score++ // if so, we increment the score
        showScore();
        addTurn(); // add new turn
        }
    } else { // if don't match
        alert("Wrong move!");
        newGame();
    }
};

function showScore() {
    document.getElementById("score").innerText = game.score;
};
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn }; // in curly braces because we are exporting more than one object from the file.