window.addEventListener('load', init);

// Note: use innerText when you're just gonna show text as it's faster than innerHTML (which parses everything as HTML)
// Use innerHTML if you need to show HTML elements, else, use innerText

// Global variables

// Available Levels
const levels = { // I use 'const' as the time information in the difficulties won't change.
    easy: 5,
    medium: 3,
    hard: 2
}

// To change level
const currentLevel = levels.easy;

let time = 5; // I use 'let' as the variable 'time' will still change.
let score = 0;
let isPlaying; // State whether the game is running or not

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'water',
    'wind',
    'fire',
    'earth',
    'lightning'
];

// Initialize Game
function init() {
    // Load a word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
    if(matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    
    // If score is -1, display 0
    if(score === -1) {
        scoreDisplay.textContent = 0;
    } else {
    scoreDisplay.textContent = score;
    }
}

// Match currentWord to wordInput
function matchWords() {
    if(wordInput.value === currentWord.textContent) {
        message.textContent = 'Correct!!';
        return true;
    } else {
    message.textContent = '';
    return false;
    }
}

// Pick & show random word
function showWord(words) {
   // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.textContent = words[randIndex];
}

// Countdown timer
function countdown() {
    // Make sure time is not run out
    if(time > 0) {
        // Decrement
        time--;
    } else if(time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.textContent = time; 
}

// Check game status
function checkStatus() {
    if(!isPlaying && time === 0) {
        message.textContent = 'Game Over!';
        score = -1;
    }
}