document.addEventListener('DOMContentLoaded', function () {


    const soundControl = document.getElementById('sound-control');
    const soundControlButton = document.getElementById('sound-on-off');
    const musicControlButton = document.getElementById('music-on-off');
    const higherLowerTitle = document.getElementById('higher-lower-title-id');
    const guessingNumberDiv = document.getElementById('guessing-number-div');
    const plusButton = document.getElementById('plus-button');
    const minusButton = document.getElementById('minus-button');
    const answerText = document.getElementById('color-scoreboard-div');
    const scoreText = document.getElementById('score-screen-number-div');

    // Initial setup: Generate a random number when the page loads
    let currentGuess = generateRandomNumber();
    guessingNumberDiv.textContent = currentGuess;
    function generateRandomNumber() {
        let previousNumber = null;
        let currentNumber;


        // Generate a new random number
        currentNumber = Math.floor(Math.random() * 100) + 1;

        // Check if the new number is the same as the previous one
        while (currentNumber === previousNumber);

        if (currentNumber === previousNumber) {
            currentNumber = Math.floor(Math.random() * 100) + 1;
            guessingNumberDiv.textContent = currentNumber;

        }
        // Update the previousNumber for the next iteration
        previousNumber = currentNumber;

        console.log(currentNumber + " CURRENT NUMBERERRRRRRRRRR")
        // Now, currentNumber is different from the previous one
        return currentNumber;
    }
    // Function to compare numbers and update the message
    function compareNumbers(current, newNumber, guess) {
        let isCorrect;


        if ((guess === 'plus' && newNumber > current) || (guess === 'minus' && newNumber < current)) {
            answerText.textContent = 'Correct!';
            answerText.style.backgroundColor = "green"
            answerText.style.color = "white"
            answerText.style.padding = '5px';
            answerText.style.fontWeight = "700"
            answerText.style.fontSize = "1.5rem"
            answerText.style.fontFamily = "Acme";


            isCorrect = true;
        } else {
            answerText.textContent = 'Wrong!';
            answerText.style.backgroundColor = 'red';
            answerText.style.color = "white"
            answerText.style.padding = '5px';
            answerText.style.fontWeight = "700"
            answerText.style.fontSize = "1.5rem"
            answerText.style.fontFamily = "Acme";


            isCorrect = false;
        }

        return isCorrect;
    }
    // Update higher/lower title and guessing number when minus button is clicked
    minusButton.addEventListener('click', function () {



        const newGuess = generateRandomNumber();
        const isCorrect = compareNumbers(currentGuess, newGuess, 'minus');

        if (isCorrect) {
            let currentScore = parseInt(scoreText.textContent, 10);
            scoreText.textContent = Math.max(0, currentScore + 1);

        } else {

            let currentScore = parseInt(scoreText.textContent, 10);
            scoreText.textContent = Math.max(0, currentScore - 1);
        }
        currentGuess = newGuess;
        guessingNumberDiv.textContent = currentGuess;
        updateStyles(); // Apply styles after updating the number and score
    });


    // Example: Update higher/lower title and guessing number when plus button is clicked
    plusButton.addEventListener('click', function () {

        const newGuess = generateRandomNumber();
        const isCorrect = compareNumbers(currentGuess, newGuess, 'plus');
        if (isCorrect) {
            let currentScore = parseInt(scoreText.textContent, 10);
            scoreText.textContent = Math.max(0, currentScore + 1);
        } else {
            let currentScore = parseInt(scoreText.textContent, 10);
            scoreText.textContent = Math.max(0, currentScore - 1);
        }


        currentGuess = newGuess;
        guessingNumberDiv.textContent = currentGuess;
        updateStyles(); // Apply styles after updating the number and score

    });


    // Function to update the style of the guessing number and score text
    function updateStyles() {
        // Update styles for guessing number
        guessingNumberDiv.style.color = "white";
        guessingNumberDiv.style.fontSize = '3rem';
        guessingNumberDiv.style.fontWeight = '700';


        // Update styles for score text
        scoreText.style.color = 'white';
        scoreText.style.fontSize = '1.5rem';
        scoreText.style.fontWeight = '700';
        // Add more styles as needed
    }

    // Function to generate a random number between 1 and 100
    function generateRandomNumber() {
        let previousNumber = null;
        let currentNumber;


        // Generate a new random number
        currentNumber = Math.floor(Math.random() * 100) + 1;

        // Check if the new number is the same as the previous one
        while (currentNumber === previousNumber);

        if (currentNumber === previousNumber) {
            currentNumber = Math.floor(Math.random() * 100) + 1;
            guessingNumberDiv.textContent = currentNumber;

        }
        // Update the previousNumber for the next iteration
        previousNumber = currentNumber;

        console.log(currentNumber + " CURRENT NUMBERERRRRRRRRRR")
        // Now, currentNumber is different from the previous one
        return currentNumber;
    }

});







