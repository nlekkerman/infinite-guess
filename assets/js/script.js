document.addEventListener('DOMContentLoaded', function () {


    const soundControl = document.getElementById('sound-control');
    const soundControlButton = document.getElementById('sound-on-off');
    const musicControlButton = document.getElementById('music-on-off');

    const backgroundMusic = document.getElementById('background-music-1');

    const higherLowerTitle = document.getElementById('higher-lower-title-id');
    const guessingNumberDiv = document.getElementById('guessing-number-div');
    const plusButton = document.getElementById('plus-button');
    const minusButton = document.getElementById('minus-button');
    const answerText = document.getElementById('color-scoreboard-div');
    const scoreText = document.getElementById('score-screen-number-div');

    const startChallengeButton = document.getElementById('challenge-action-button')
    const declineChallengeButton = document.getElementById('decline-button')
    const acceptChallengeButton = document.getElementById('accept-button')

    const buttonClickSound = document.getElementById('button-click-sound');
    const rightAnswerSound = document.getElementById('right-answer-sound');
    const wrongAnswerSound = document.getElementById('wrong-answer-sound');



    soundControl.addEventListener('click', function () {
        soundControl.classList.toggle('active');
    });
    // Example: Toggle sound on/off
    let isSoundOn = false; // Initial state
    soundControlButton.addEventListener('click', function () {
        isSoundOn = !isSoundOn;

        // Update the icon based on the sound state
        const icon = isSoundOn ? 'fa-volume-up' : 'fa-volume-mute';
        const color = isSoundOn ? 'green' : 'red';
        soundControlButton.innerHTML = `<i class="fas ${icon}" style="color: ${color};"></i>`;

        // Toggle play/pause based on the sound state
        if (isSoundOn) {

            localStorage.setItem('isSoundOn', JSON.stringify(isSoundOn));
        } else {

            localStorage.setItem('isSoundOn', JSON.stringify(!isSoundOn));
        }
    });

    let isMusicOn = false; // Initial state
    musicControlButton.addEventListener('click', function () {
        isMusicOn = !isMusicOn;

        // Update the icon based on the sound state
        const icon = isMusicOn ? 'fa-music' : 'fa-music';
        const color = isMusicOn ? 'green' : 'red';
        musicControlButton.innerHTML = `<i class="fas ${icon}" style="color: ${color};"></i>`;

        // Toggle play/pause based on the sound state
        if (isMusicOn) {

            playBackgroundMusic();

        } else {
            pauseBackgroundMusic();

        }
        localStorage.setItem('isMusicOn', JSON.stringify(isMusicOn))
    });

    // Function to play the background music
    function playBackgroundMusic() {

        if (isMusicOn) {
            backgroundMusic.play();
        }
    }


    function pauseBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
    }
    function playRightAnswerSound() {
        if (isSoundOn) {
            rightAnswerSound.play();
        }
        console.log(isSoundOn)

    }

    function playWrongAnswerSound() {

        if (isSoundOn) {
            wrongAnswerSound.play();
        }
    }

    function playButtonClickSound() {
        if (isSoundOn) {
            buttonClickSound.play();
        }

    } 
    function playbonusMusic() {
        if (isSoundOn) {
            bonusGameMusic.play();
        }

    }
    let consecutiveCorrectAnswers = 0;

    isBonus = false;

    //BUTTONS

    declineChallengeButton.addEventListener('click', function () {
        console.log(" button clicked");
        const challengeScreen = document.getElementById('confirmation-section');
        playBackgroundMusic();
        playButtonClickSound();
       // stopBreak();

        challengeScreen.style.display = 'none'; // Make the timer visible

    });

    acceptChallengeButton.addEventListener('click', function () {
        stopSwitching = false; // Reset the flag
        // Start switching colors every half second

        //stopBreak();
       // intervalId = setInterval(switchColors, 500);
      
        const challengeAcceptScreen = document.getElementById('challenge');
        challengeAcceptScreen.style.display = 'block'; // Make the timer visible
        const confirmationScreen = document.getElementById('confirmation-section');
        confirmationScreen.style.display = 'none';
        playButtonClickSound();
      // playTenseMusic();

    });


    startChallengeButton.addEventListener('click', function () {
        const challengeSection = document.getElementById('challenge-screen-section');
        const confirmationScreen = document.getElementById('confirmation-section');
        challengeSection.style.display = 'none';
        confirmationScreen.style.display = 'block';
      
        playButtonClickSound();
    });
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
    // Example: Update higher/lower title and guessing number when minus button is clicked
    minusButton.addEventListener('click', function () {
        startShaking();

        playButtonClickSound();
        const newGuess = generateRandomNumber();
        const isCorrect = compareNumbers(currentGuess, newGuess, 'minus');

        if (isCorrect) {
            console.log(isMusicOn + " correct  minus button")

            // Increment the score if the guess is correct
            let currentScore = parseInt(scoreText.textContent, 10);

            if (consecutiveCorrectAnswers === 5) {
                // Make the bonus screen section visible
                isBonus = true;
                pauseBackgroundMusic();
                document.getElementById('bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();

            } else {
                consecutiveCorrectAnswers++;;
            }




            console.log(consecutiveCorrectAnswers + " Minus correct answer")

            if (isBonus) {
                resetConsecutiveCorrectAnswers();

                playButtonClickSound();
                scoreText.textContent = Math.max(0, currentScore + 2);
            } else {
                if (currentScore > 0) {
                    console.log(consecutiveCorrectAnswers + " MINUS BIGGER THAN 0  ")

                    openChallenge();

                } else {


                }

                scoreText.textContent = Math.max(0, currentScore + 1);
            }

            playRightAnswerSound();




        } else {
            resetConsecutiveCorrectAnswers();



            console.log(isMusicOn + " wronbg MINUs button")

            // Decrement the score if the guess is wrong
            let currentScore = parseInt(scoreText.textContent, 10);

            if (!isBonus && currentScore <= 0) {
                resetConsecutiveCorrectAnswers();
                openChallenge();

            }


            if (isBonus) {

                resetConsecutiveCorrectAnswers();

                scoreText.textContent = Math.max(0, currentScore - 2);
            } else {
                scoreText.textContent = Math.max(0, currentScore - 1);
            }

            playWrongAnswerSound();

        }
        currentGuess = newGuess;
        guessingNumberDiv.textContent = currentGuess;
        updateStyles(); // Apply styles after updating the number and score
    });


    // Example: Update higher/lower title and guessing number when plus button is clicked
    plusButton.addEventListener('click', function () {
        console.log(isMusicOn + " button")
        startShaking();
        playButtonClickSound();
        const newGuess = generateRandomNumber();
        const isCorrect = compareNumbers(currentGuess, newGuess, 'plus');
        if (isCorrect) {
            console.log(isMusicOn + " correct button")

            // Increment the score if the guess is correct
            let currentScore = parseInt(scoreText.textContent, 10);

            if (consecutiveCorrectAnswers === 5) {
                // Make the bonus screen section visible
                isBonus = true;
                pauseBackgroundMusic();
                document.getElementById('bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();

            } else {

            }


            consecutiveCorrectAnswers++;;

            if (isBonus) {
                resetConsecutiveCorrectAnswers();

                scoreText.textContent = Math.max(0, currentScore + 2);
            } else {

                let currentScore = parseInt(scoreText.textContent, 10);

                if (currentScore > 0) {
                    console.log(consecutiveCorrectAnswers + " NOW TEST IF BONUS  ")

                    openChallenge();

                } else {
                    console.log(consecutiveCorrectAnswers + " OPEN CHALLANE IS SMALLER  ")

                }

                scoreText.textContent = Math.max(0, currentScore + 1);
            }

            playRightAnswerSound();



            if (consecutiveCorrectAnswers === 5) {
                // Make the bonus screen section visible
                isBonus = true;
                pauseBackgroundMusic();
                playbonusMusic();
                document.getElementById('bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();

            } else {

            }

        } else {
            resetConsecutiveCorrectAnswers();


            // Decrement the score if the guess is wrong
            let currentScore = parseInt(scoreText.textContent, 10);
            console.log(isMusicOn + " plus Wrong button")



            if (currentScore < 0) {

                currentScore = 0;
            }

            if (isBonus) {
                if (currentScore <= 0) {

                    currentScore = 0;
                }
                resetConsecutiveCorrectAnswers();

                scoreText.textContent = Math.max(0, currentScore - 2);
            } else {
                if (currentScore <= 0) {

                    currentScore = 0;
                }
                scoreText.textContent = Math.max(0, currentScore - 1);
                resetConsecutiveCorrectAnswers();
            }

            playWrongAnswerSound();
        }
        currentGuess = newGuess;
        guessingNumberDiv.textContent = currentGuess;
        updateStyles(); // Apply styles after updating the number and score

    });
  
    function openChallenge() {

        let randomOne = Math.floor(Math.random() * 7) + 1;
        let randomTwo = Math.floor(Math.random() * 7) + 1;

        if (randomOne === randomTwo) {
            const challengeScreen = document.getElementById('challenge-screen-section');
            const offerDisplay = document.getElementById('current-score-offer');
            const doubleOfferDisplay = document.getElementById('double-score-offer');
            offerNumber = parseInt(scoreText.textContent, 10);
            playbonusMusic();
            pauseBackgroundMusic();

            //playbonusMusic();
            if (offerDisplay) {
                offerNumber = offerNumber + 1


                offerDisplay.innerHTML = offerNumber;
            } else {

            }

            if (doubleOfferDisplay) {
                doubleOfferDisplay.innerHTML = offerNumber * 2;


            } else {

            }

            challengeScreen.style.display = 'block';


        }

    }

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

    function startShaking() {
        let element = document.getElementById('color-scoreboard-div');
        element.classList.add('shaking');

        // Remove the shaking class after the animation completes
        setTimeout(function () {
            element.classList.remove('shaking');
        }, 500); // Adjust the time to match the animation duration

    }
    // Reset the counter when needed (e.g., after showing the bonus screen)
    function resetConsecutiveCorrectAnswers() {
        consecutiveCorrectAnswers = 0;
    }

});







