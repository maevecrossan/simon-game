//every time you create a new function, export from game.js and import to game.test.js 

let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"]
}

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                let move = e.target.getAttribute("id");
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showTurns() { // setting interval, turning lights on, incrementing turn number, turning lights off.
    game.turnNumber = 0;
    let turns = setInterval(function() {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light"); //adds fade
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light"); //removes fade
    }, 400); //after 400ms
}

function showScore() { 
    document.getElementById("score").innerText = game.score;
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns }; // in curly braces because we are exporting more than one object from the file.