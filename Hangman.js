// script.js
const wordList = [
    "APPLE",
    "BANANA",
    "CHERRY",
    "ORANGE",
    "LEMON",
    "GRAPE",
    "PEACH",
    "KIWI",
    "MANGO",
    "STRAWBERRY"
];

let selectedWord = "";
let guessedWord = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 5; // Maximum number of incorrect guesses allowed

function startGame() {
    selectedWord = getRandomWord();
    guessedWord = Array(selectedWord.length).fill("_");
    incorrectGuesses = 0;

    document.getElementById("about-game").textContent = `To win, guess the word in ${maxIncorrectGuesses} guesses`;
    updateWordDisplay();
    updateGuessedLetters();
    setMessage("");
    
    // Show the game container and hide the result container
    document.getElementById("game-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

function updateWordDisplay() {
    document.getElementById("word-display").textContent = `Word is ${guessedWord.join(" ")}`;
}

function updateGuessedLetters() {
    document.getElementById("guessed-letters").textContent = `Guessed Letters: ${guessedWord.join(", ")}`;
}

function setMessage(message) {
    document.getElementById("message").textContent = message;
}

function guessLetter() {
    if (incorrectGuesses < maxIncorrectGuesses) {
        const guessInput = document.getElementById("guess-input").value.toUpperCase();
        document.getElementById("guess-input").value = "";

        if (guessInput.length === 1 && /[A-Z]/.test(guessInput)) {
            if (selectedWord.includes(guessInput)) {
                for (let i = 0; i < selectedWord.length; i++) {
                    if (selectedWord[i] === guessInput) {
                        guessedWord[i] = guessInput;
                    }
                }
                updateWordDisplay();
            } else {
                incorrectGuesses++;
                setMessage("Oops!");
            }

            updateGuessedLetters();

            if (guessedWord.join("") === selectedWord) {
                setMessage("Congratulations! You win!");
                endGame(true);
            } else {
                setMessage(`Chances left: ${maxIncorrectGuesses - incorrectGuesses}`);
            }
        } else {
            setMessage("Please enter a valid letter.");
        }
    } else {
        setMessage("Out of guesses! The word was: " + selectedWord);
        endGame(false);
    }
}

function endGame(isWinner) {
    // Hide the game container and show the result container
    document.getElementById("game-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    
    const resultMessage = document.getElementById("message1");
    if (isWinner) {
        resultMessage.textContent = "Congratulations! You win!";
        resultMessage.style.color="#4caf50";
    } else {
        resultMessage.textContent = "Game over! The word was: " + selectedWord;
        resultMessage.style.color="#ff0000";
    }
}

document.getElementById("guess-button").addEventListener("click", guessLetter);
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});

document.getElementById("play-again-button").addEventListener("click", startGame);

// Initialize the game
startGame();
