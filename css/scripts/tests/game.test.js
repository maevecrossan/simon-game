/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game"); //imports from game.js

beforeAll(() => { //loads html file into the DOM.
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close(); 
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
        game.playerMoves = [];
        game.currentGame = [];
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
        expect(button.classList).toContain(game.currentGame[0] + "light"); // to contain 'light' class (opacity)
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns(); //should reset turn number
        expect(game.turnNumber).toBe(0);
    });
});