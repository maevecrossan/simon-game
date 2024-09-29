/**
 * @jest-environment jsdom
 */

const { executionAsyncId } = require("async_hooks");
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game"); //imports from game.js

jest.spyOn(window, "alert").mockImplementation(() => { }); //spy on the window, then the method (alert). Catches alert and divert sit into empty function.

beforeAll(() => { //loads html file into the DOM.
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close(); 
});


describe("pre-game", () => {
    test("clicking buttons before newGame should fail", () => {
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true); // test to check if 'score' key exists.
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true); // test to check if 'currentGame' key exists.
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true); // test to check if 'playerMoves' key exists.
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true); // test to check if 'choices' key exists.
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]); // test to check if 'choices' array contains button 1-4.
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("should clear player moves array", () => {
        expect(game.playerMoves.length).toBe(0); //toEqual would be okay too.
    });
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("expect data-listener to be true", () => {
        newGame();
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => { // before each test is run
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn(); //should be 1 element in the currentGame array
    });
    afterEach(() => { // after each test is run
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns(); //should reset turn number
        expect(game.turnNumber).toBe(0);
    });
    test("should incremenet the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]); //pushes the turn into the playerMoves array before calling playerTurn. Let's us know we have the right answer (playerTurn and computersTurn will match.)
        playerTurn(); // after calling playerTurn, we would expect...
        expect(game.score).toBe(1); // the score to have increased.
    });
    test("should call an alter if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
    test("should toggle turnInProgress to true", () => { //while computer is showing its turns.
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("click during computer sequence should fail", () => {
        showTurns() // call to start computer sequence
        game.lastButton = ""; // resets to empty 
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});