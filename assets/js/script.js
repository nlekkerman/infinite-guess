// jshint esversion: 6
document.addEventListener('DOMContentLoaded', function () {

    let previousNumber = null;
    let countMysteryNumber = 0;
    let colors = ["red", "pink", "purple", "blue", "orange", "yellow"];
    let colorIndex = 0;
    let isSoundOn = false;
    let isMusicOn = false;
    let isMusicPlaying = false;
    let consecutiveCorrectAnswers = 0;
    let isBonus = false;

    /**
     * SOUND AND THEME CONTROL ELEMENTS: displaying dropdown controls and switchng on/off sound and music;
     */
    const soundAndThemeDropdownButton = document.getElementById('dropdown-sound-control-and-theme');
    const soundControlButton = document.getElementById('sound-on-off-button');
    const musicControlButton = document.getElementById('music-on-off-button');

    /**
     * MUSIC AND SOUND ELEMENTS: Triggering background music and game sounds. 
     * */
    const backgroundMusic = document.getElementById('background-music-1');
    const bonusGameMusic = document.getElementById('bonus-game-music');
    const turboBonusMusic = document.getElementById('chase-game-music');
    const challengeGameMusic = document.getElementById('tense-game-music');

    const buttonClickSound = document.getElementById('button-click-sound');
    const rightAnswerSound = document.getElementById('right-answer-sound');
    const wrongAnswerSound = document.getElementById('wrong-answer-sound');
    const mysterySound = document.getElementById('mystery-sound');

    /**
     * PLAYGROUND ELEMENS: elements that apears on main playground screen.
     */
    const higherLowerTitle = document.getElementById('message-id');
    const guessingNumberMovingContainer = document.getElementById('guessing-number-div');
    const mysteryNumberContainer = document.getElementById("mystery-number");
    const messageForMystery = document.getElementById("mystery-message-id");
    const guessedNumber = document.getElementById('guessed-number');
    const plusButton = document.getElementById('plus-button');
    const minusButton = document.getElementById('minus-button');
    const answerText = document.getElementById('right-wrong-text');
    const scoreText = document.getElementById('score-text');

    /**
     * BUTTONS ELEMENT: buttons taht apear during game over all screens
     */
    const exitGameBtn = document.getElementById('exit-game-button');
    const saveGameButton = document.getElementById('save-game-button');
    const exitSaveGameBtn = document.getElementById('exit-save-game-button');
    const startGameBtn = document.getElementById('start-game-button');
    const declineChallengeButton = document.getElementById('decline-button');
    const acceptChallengeButton = document.getElementById('accept-button');
    const startTurboGameButton = document.getElementById('start-turbo-bonus-game-button');
    const exitTurboButton = document.getElementById('exit-turbo-button');
    const closeChallengeScreenButton = document.getElementById('challenge-button-close');
    const challengeLeftChoiceButton = document.getElementById('option-one-background');
    const challengeRightChoiceButton = document.getElementById('option-two-background');
    const exitHighscoreDashboardButton = document.getElementById('exit-welcome-highscore');
    const exitRulesDashboardButton = document.getElementById('exit-welcome-rules');
    const seeHighscoreDashboardButton = document.getElementById('highscore-button-container');
    const seeRulesDashboardButton = document.getElementById('rules-button-container');

    /**
     * SCREEN ELEMENTS: Used to navigate player though the game, opening and closing screens as game require
     */
    const saveGameScreen = document.getElementById('save-game-screen-section');
    const acceptChallengeScreen = document.getElementById("accept-challenge-section");
    const welcomeScreen = document.getElementById('welcome-screen-section');
    const saveBestScoreScreen = document.getElementById('score-form');
    const bestScoreTextDisplay = document.getElementById('best-score-paragraph');
    const popupContainer = document.getElementById('popup-container');
    const popupButton = document.getElementById('popup-button');


    /**
     * FUNCTION CALLS: 
     * to downsize image resolution if is smalls screen,
     * initialise best score,
     * make cards blink in challenge
     */
    resizeAllImages(37.5, 25);
    initializeBestScore();
    setInterval(changeBackgroundColor, 200);

    /**DROPDOWN CONTROL EVENT LISTENER:Toggle dropdown for theme and music when is active, hidde when is inactive
     */
    soundAndThemeDropdownButton.addEventListener('click', function () {
        soundAndThemeDropdownButton.classList.toggle('active');
    });

    /**SOUND CONTROL EVENT LISTENER: Checking for status of isSOundOn in local storage,
     *  turning on and off game sounds,
     *  set icon green when is on and red when is off */
    soundControlButton.addEventListener('click', function () {
        isSoundOn = !isSoundOn;
        const icon = isSoundOn ? 'fa-volume-up' : 'fa-volume-mute';
        const color = isSoundOn ? 'green' : 'red';
        soundControlButton.innerHTML = `<i class="fas ${icon}" style="color: ${color};"></i>`;
        if (isSoundOn) {

            localStorage.setItem('isSoundOn', JSON.stringify(isSoundOn));
        } else {

            localStorage.setItem('isSoundOn', JSON.stringify(!isSoundOn));
        }
    });

    /**MUSIC CONTROL EVENT LISTENER: Checking for status of isSOundOn in local storage,
     *  turning on and off game sounds,
     *  set icon green when is on and red when is off */
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
        localStorage.setItem('isMusicOn', JSON.stringify(isMusicOn));
    });
    /**
     * Plays the turbo bonus music if music is turned on and it's not already playing.
     * This function checks the state of the music and plays the turbo bonus music accordingly.
     * It relies on the global variables isMusicOn and isMusicPlaying.
     */
    function playTurboBonusMusic() {
        if (isMusicOn && !isMusicPlaying) {
            turboBonusMusic.play();
            isMusicPlaying = true;
        }
    }
    /**
     * Plays the challenge game music if music is on and it's not currently playing.
     */
    function playChallengeMusic() {
        // Check if music is turned on and it's not currently playing
        if (isMusicOn && !isMusicPlaying) {
            // Play the challenge game music
            challengeGameMusic.play();
            // Set the music state to playing
            isMusicPlaying = true;
        }
    }

    /**
     *  Function to stop the chase music .
     * This function checks if music is turned on and then pauses the turbo bonus music,
     * sets the current time of the music to 0, and updates the music state to not playing.
     */
    function stopTurboBonusMusic() {
        // Check if music is turned on
        if (isMusicOn) {
            // Pause the turbo bonus music
            turboBonusMusic.pause();
              // Set the current time of the music to 0
            turboBonusMusic.currentTime = 0;
            // Update the music state to not playing
            isMusicPlaying = false;
        }
    }
/**
 * Function to play the background music.
 * 
 * This function checks if music is turned on and then plays the background music.
 */
    function playBackgroundMusic() {
            // Check if music is turned on
        if (isMusicOn) {
            // Play the background music
            backgroundMusic.play();
        }
    }

   /**
 * Function to pause the background music.
 * 
 * This function pauses the background music if it is currently playing.
 */
function pauseBackgroundMusic() {
    // Check if the background music element exists
    if (backgroundMusic) {
        // Pause the background music
        backgroundMusic.pause();
    }
}

  /**
 * Function to play the alarm sound for last 10 second Turbo Bonus Game.
 * 
 * This function checks if sound is turned on and then plays the alarm sound.
 */
function playAlarmAlertSoundTimer() {
    // Get the alarm audio element
    const audio = document.getElementById("alarmAudio");
    // Check if sound is turned on
    if (isSoundOn) {
        // Play the alarm sound
        audio.play();
    }
}
   /**
 * Function to pause the alarm alert sound timer.
 * 
 * This function pauses the audio element associated with the alarm sound.
 */
function pauseAlarmAlertSoundTimer() {
    // Get the audio element for the alarm sound
    const audio = document.getElementById("alarmAudio");
    // Pause the audio
    audio.pause();
}

   /**
 * Function to play the correct answer challenge sound.
 * 
 * This function plays the audio element associated with the correct answer challenge sound
 * if the sound is turned on.
 */
function playCorrectAnswerChallengeSound() {
    // Get the audio element for the correct answer challenge sound
    const audio = document.getElementById("correct");
    // Play the audio if sound is turned on
    if (isSoundOn) {
        audio.play();
    }
}

  /**
 * Function to play the wrong answer challenge sound.
 * 
 * This function plays the audio element associated with the wrong answer challenge sound
 * if the sound is turned on.
 */
function playWrongAnswerChallengeSound() {
    // Get the audio element for the wrong answer challenge sound
    const audio = document.getElementById("wrong");
    
    // Play the audio if sound is turned on
    if (isSoundOn) {
        audio.play();
    }
}

   /**
 * Function to play the main right answer sound when plus or minus button is clicked.
 * 
 * This function plays the sound effect for a correct answer in the main game.
 */
function playMainRightAnswerSound() {
    // Check if the sound is turned on
    if (isSoundOn) {
        // Play the right answer sound effect
        rightAnswerSound.play();
    }
}
   /**
 * Function to play the wrong answer sound when plus or minus button is clicked.
 * 
 * This function plays the sound effect for an incorrect answer.
 */
function playWrongAnswerSound() {
    // Check if the sound is turned on
    if (isSoundOn) {
        // Play the wrong answer sound effect
        wrongAnswerSound.play();
    }
}

    function playMysteryNumberSound() {
        if (isSoundOn) {
            mysterySound.play();
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

    function stopTenseMusic() {
        if (isMusicOn) {
            challengeGameMusic.pause();
            challengeGameMusic.currentTime = 0; // Reset the playback position to the beginning
            isMusicPlaying = false;
        }
    }




    //BUTTONS
    /*See highscore on dashboard button*/
    seeHighscoreDashboardButton.addEventListener('click', function () {
        const wrapDivHighscores = document.getElementById('welcome-highscore-screen');
        const hideIcons = document.getElementById('icons-for-welcome-screen-container');
        wrapDivHighscores.style.display = 'block';
        hideIcons.style.display = 'none';
        displayHighScoresForDashboard();

    });
    /*See rules on dashboard button*/

    seeRulesDashboardButton.addEventListener('click', function () {

        const displaysRules = document.getElementById('welcome-rules-screen');
        const displayCloseButton = document.getElementById('exit-welcome-rules');
        const hideIcons = document.getElementById('icons-for-welcome-screen-container');
        const rules = document.getElementById('rules-container');
        rules.style.display = 'block';
        displaysRules.style.display = 'block';
        displayCloseButton.style.display = 'block';
        hideIcons.style.display = 'none';
    });

    /*Button to start game and close welcome screen*/
    startGameBtn.addEventListener('click', function () {
        welcomeScreen.style.display = 'none';
    });

    /*Button to close high/best score on dashboard*/
    exitHighscoreDashboardButton.addEventListener('click', function () {
        const hideIcons = document.getElementById('icons-for-welcome-screen-container');
        hideIcons.style.display = 'block';
        const exitHigh = document.getElementById('welcome-highscore-screen');
        exitHigh.style.display = 'none';
    });
    /*Button to close rules on dashboard*/
    exitRulesDashboardButton.addEventListener('click', function () {
        const rules = document.getElementById('rules-container');
        const rulesScreen = document.getElementById('welcome-rules-screen');
        const hideIcons = document.getElementById('icons-for-welcome-screen-container');

        hideIcons.style.display = 'block';
        rules.style.display = 'block';
        rulesScreen.style.display = 'none';
    });

    //save score button
    saveGameButton.addEventListener('click', function () {

        saveGame();
        saveBestScoreScreen.style.display = 'none';
        scoreText.textContent = '0';
    });

    //exit save game screen
    exitSaveGameBtn.addEventListener('click', function () {
        saveGameScreen.style.display = 'none';
    });

    //start turbo game
    startTurboGameButton.addEventListener('click', function () {
        isBonus = true;
        console.log(isBonus);
        document.getElementById('turbo-bonus-screen-section').style.display = 'none';
        let initialScore = parseInt(scoreText.textContent, 10);
        playButtonClickSound();
        playTurboBonusMusic();
        function countdownTimer(seconds) {
            const timerElement = document.getElementById('timer');
            timerElement.style.backgroundColor = 'white';
            higherLowerTitle.innerHTML = "TURBO BONUS";
            function updateDisplay() {
                timerElement.style.display = 'block'; // Make the timer visible
                timerElement.innerHTML = `Time: ${seconds} sec`;
            }

            function count() {
                updateDisplay();
                if (seconds > 0) {
                    // Check if it's the last 5 seconds
                    if (seconds <= 9) {
                        playAlarmAlertSoundTimer();
                        blinkRedBackground(); // Call the blink function
                    }
                    seconds--;
                    setTimeout(count, 1000); // Call count() again after 1000 milliseconds (1 second)
                } else {
                    timerElement.innerHTML = "Time's up!";
                    higherLowerTitle.innerHTML = "Higher or Lower";
                    document.getElementById('exit-turbo-bonus-section').style.display = 'block';
                    timerElement.style.color = "black";
                    let finalScore = parseInt(scoreText.textContent, 10);
                    pauseAlarmAlertSoundTimer();
                    stopTurboBonusMusic();
                    playbonusMusic();
                    let scoreDifference = finalScore - initialScore;
                    let turboScoreElement = document.getElementById('turbo-score');
                    if (turboScoreElement) {
                        turboScoreElement.innerHTML = scoreDifference;
                    } else {
                    }
                    isBonus = false;

                }
            }

            count();
        }
        countdownTimer(20);

    });

    //close Challenge screen
    closeChallengeScreenButton.addEventListener('click', function () {
        const iconOne = document.getElementById('icon-one');
        iconOne.style.display = 'block';
        const iconTwo = document.getElementById('icon-two');
        iconTwo.style.display = 'block';
        playBackgroundMusic();
        const challengeCloseScreen = document.getElementById('challenge-score-display');
        challengeCloseScreen.style.display = 'none';
        const challengeAcceptScreen = document.getElementById('challenge');
        challengeAcceptScreen.style.display = 'none';
        resetStylesForChallenge();

    });

    //reset styles for challenge
    function resetStylesForChallenge() {
        // Assign the numbers to HTML elements
        let number1 = document.getElementById('option-one-number');
        let number2 = document.getElementById('option-two-number');
        let backgroundOne = document.getElementById("option-one-background");
        let backgroundTwo = document.getElementById("option-two-background");

        backgroundOne.style.backgroundColor = 'white';
        backgroundTwo.style.backgroundColor = 'white';

        number1.style.display = 'none';
        number2.style.display = 'none';

    }

    // exit turbo game button
    exitTurboButton.addEventListener('click', function () {
        const instruction = document.getElementById('exit-turbo-bonus-section');
        instruction.style.display = 'none';
        const timerElement = document.getElementById('timer');
        timerElement.style.backgroundColor = 'white';
        timerElement.style.display = 'none';

        playBackgroundMusic();
        playButtonClickSound();

    });

    // decline challenge game button
    declineChallengeButton.addEventListener('click', function () {
        const acceptChallengeScreen = document.getElementById('accept-challenge-section');
        playBackgroundMusic();
        playButtonClickSound();
        acceptChallengeScreen.style.display = 'none';
    });
    // accept challenge game button
    acceptChallengeButton.addEventListener('click', function () {
        stopSwitching = false;
        intervalId = setInterval(switchColors, 500);
        const challengeScreen = document.getElementById('challenge');
        challengeScreen.style.display = 'block';
        const acceptChallengeScreen = document.getElementById('accept-challenge-section');
        acceptChallengeScreen.style.display = 'none';
        playButtonClickSound();
        playChallengeMusic();

    });


    // exit game button
    exitGameBtn.addEventListener('click', function () {
        bestScoreTextDisplay.textContent = parseInt(scoreText.textContent, 10);
        console.log(bestScoreTextDisplay);
        displayHighScores();
        checkAndDisplayBestScore();
    });

    let currentGuess = generateRandomNumber();
    guessingNumberMovingContainer.textContent = currentGuess;
    updateStyles();

    //compare number
    function applyCommonStyles(element) {
        element.style.color = "white";
        element.style.padding = '5px';
        element.style.fontWeight = "700";
        element.style.fontFamily = "Acme";
    }

    function compareNumbers(current, newNumber, guess) {
        let isCorrect;

        if (countMysteryNumber === 10) {
            isMystery = true;
        }

        if ((guess === 'plus' && newNumber > current) || (guess === 'minus' && newNumber < current)) {
            answerText.textContent = 'Correct!';
            answerText.style.backgroundColor = "green";
            applyCommonStyles(answerText);
            displayRandomMessage('encouraging');
            isCorrect = true;
        } else {
            answerText.textContent = 'Wrong!';
            answerText.style.backgroundColor = 'red';
            applyCommonStyles(answerText);
            displayRandomMessage('discouraging');
            isCorrect = false;
        }

        // Check screen width and adjust font size
        if (window.innerWidth > 1800) {
            answerText.style.fontSize = '3rem'; // Set your desired font size
        } else {
            answerText.style.fontSize = '1.5rem'; // Set the default font size
        }

        return isCorrect;
    }
    //minus button
    minusButton.addEventListener('click', function () {
        mysteryNumberContainer.style.display = 'none';
        messageForMystery.style.display = 'none';
        countMysteryNumber++;
        playButtonClickSound();
        const newGuess = generateRandomNumber();
        const isCorrect = compareNumbers(currentGuess, newGuess, 'minus');
        let currentScore = parseInt(scoreText.textContent, 10);
        guessedNumber.textContent = "Mystery number was: " + currentGuess;

        startFadeOutAnimation('guessed-number');
        if (isCorrect) {
            if (consecutiveCorrectAnswers === 5) {
                isBonus = true;
                pauseBackgroundMusic();
                document.getElementById('turbo-bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();
            } else {
                consecutiveCorrectAnswers++;
            }
            if (isBonus && !isMystery) {
                resetConsecutiveCorrectAnswers();
                playButtonClickSound();
                scoreText.textContent = Math.max(0, currentScore + 2);
            } else if (isBonus && isMystery) {
                scoreText.textContent = Math.max(0, currentScore + 10);
                guessedNumber.style.display = 'block';
            } else if (!isBonus && isMystery) {
                guessedNumber.style.display = 'block';

                scoreText.textContent = Math.max(0, currentScore + 5);
            }
            else {
                if (currentScore > 0 && !isBonus) {
                    openChallenge();
                } else {

                }

                scoreText.textContent = Math.max(0, currentScore + 1);
            }
            playMainRightAnswerSound();
        } else {

            if (isMystery) {
                console.log(isMystery);
                guessedNumber.style.display = 'block';
            }
            resetConsecutiveCorrectAnswers();
            let currentScore = parseInt(scoreText.textContent, 10);
            if (isBonus) {
                resetConsecutiveCorrectAnswers();
                scoreText.textContent = Math.max(0, currentScore - 2);
            } else {
                scoreText.textContent = Math.max(0, currentScore - 1);
            }
            playWrongAnswerSound();
        }
        startFadeOutAnimation('guessed-number');

        isMystery = false;
        currentGuess = newGuess;
        guessingNumberMovingContainer.textContent = currentGuess;
        updateStyles();
    });
    // plus button
    plusButton.addEventListener('click', function () {
        countMysteryNumber++;
        mysteryNumberContainer.style.display = 'none';
        messageForMystery.style.display = 'none';
        guessedNumber.style.display = "none";
        guessedNumber.textContent = "Mystery number was: " + currentGuess;
        startFadeOutAnimation('guessed-number');
        playButtonClickSound();
        const newGuess = generateRandomNumber();
        const isCorrect = compareNumbers(currentGuess, newGuess, 'plus');

        if (isCorrect) {
            let currentScore = parseInt(scoreText.textContent, 10);

            if (consecutiveCorrectAnswers === 5) {
                isBonus = true;
                pauseBackgroundMusic();
                document.getElementById('turbo-bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();
            } else {

            }
            consecutiveCorrectAnswers++;
            if (isBonus && !isMystery) {
                resetConsecutiveCorrectAnswers();
                playButtonClickSound();
                scoreText.textContent = Math.max(0, currentScore + 2);
            } else if (isBonus && isMystery) {
                scoreText.textContent = Math.max(0, currentScore + 10);
                guessedNumber.style.display = 'block';
            } else if (!isBonus && isMystery) {
                scoreText.textContent = Math.max(0, currentScore + 5);
                guessedNumber.style.display = 'block';
            }
            else {
                if (currentScore > 0 && !isBonus) {
                    openChallenge();
                } else {

                }

                scoreText.textContent = Math.max(0, currentScore + 1);
            }
            playMainRightAnswerSound();
            if (consecutiveCorrectAnswers === 5) {
                isBonus = true;
                pauseBackgroundMusic();
                playbonusMusic();
                document.getElementById('turbo-bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();

            } else {

            }




        } else {
            if (isMystery) {
                console.log(isMystery);
                guessedNumber.style.display = 'block';
            }
            resetConsecutiveCorrectAnswers();
            // Decrement the score if the guess is wrong
            let currentScore = parseInt(scoreText.textContent, 10);

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
        startFadeOutAnimation('guessed-number');

        isMystery = false;
        currentGuess = newGuess;
        guessingNumberMovingContainer.textContent = currentGuess;
        updateStyles(); // Apply styles after updating the number and score

    });


    let intervalId;
    //left choice in challenge
    challengeLeftChoiceButton.addEventListener('click', function () {
        stopSwitching = true;
        clearInterval(intervalId);
        const iconTwo = document.getElementById('icon-two');
        iconTwo.style.display = 'none';
        const iconOne = document.getElementById('icon-one');
        iconOne.style.display = 'none';

        const challengeAcceptScreen = document.getElementById('challenge-score-display');
        challengeAcceptScreen.style.opacity = 0;
        challengeAcceptScreen.style.display = 'block'; // Make the timer visible

        stopTenseMusic();

        generateAndCompareNumbers();
        setTimeout(function () {
            challengeAcceptScreen.style.transition = 'opacity 1s';
            challengeAcceptScreen.style.opacity = 1;



        }, 700);


    });

    // right choice in challenge
    challengeRightChoiceButton.addEventListener('click', function () {
        stopSwitching = true;
        clearInterval(intervalId);
        const iconOne = document.getElementById('icon-one');
        iconOne.style.display = 'none';
        const iconTwo = document.getElementById('icon-two');
        iconTwo.style.display = 'none';

        const challengeAcceptScreen = document.getElementById('challenge-score-display');
        challengeAcceptScreen.style.opacity = 0;


        challengeAcceptScreen.style.display = 'block';
        stopTenseMusic();
        generateAndCompareNumbersForTwo();
        setTimeout(function () {

            challengeAcceptScreen.style.transition = 'opacity 1s';
            challengeAcceptScreen.style.opacity = 1;
        }, 700); // Delay for 2 seconds


    });



    //popup button
    popupButton.addEventListener('click', function () {
        popupContainer.style.display = 'none';
    });


    function startFadeOutAnimation(elementId) {
        const guessedNumberBackground = document.getElementById(elementId);

        if (!guessedNumberBackground) {
            console.error('Element with ID ' + elementId + ' not found.');
            return;
        }
        guessedNumberBackground.classList.add('fadeOut');

        setTimeout(function () {
            guessedNumberBackground.style.display = 'none';
        }, 3000);
    }
    // generate and compare numbers for challenge(bonus)
    function generateAndCompareNumbersForTwo() {
        let randomNumber1 = Math.floor(Math.random() * 100) + 1;
        let randomNumber2 = Math.floor(Math.random() * 100) + 1;
        let number1 = document.getElementById('option-one-number');
        let number2 = document.getElementById('option-two-number');
        let screenMessage = document.getElementById('challenge-guess-result-message');
        number2.innerText = randomNumber2;
        number1.innerText = randomNumber1;
        number1.style.display = 'block';
        number2.style.display = 'block';

        let backgroundOne = document.getElementById("option-one-background");
        let backgroundTwo = document.getElementById("option-two-background");
        let initialScore = parseInt(scoreText.textContent, 10);


        if (randomNumber1 < randomNumber2) {
            playCorrectAnswerChallengeSound();

            displayRandomMessage('encouraging');
            scoreText.innerText = initialScore * 2;
            screenMessage.style.color = 'white';
            screenMessage.style.backgroundColor = 'green';
            backgroundOne.style.backgroundColor = 'red';
            backgroundTwo.style.backgroundColor = 'green';
            screenMessage.textContent = 'CORRRREEECT!!!';


        } else if (randomNumber2 < randomNumber1) {
            displayRandomMessage('discouraging');
            playWrongAnswerChallengeSound();
            scoreText.innerText = initialScore * 0;
            screenMessage.textContent = 'WROOOONG!!!';
            screenMessage.style.backgroundColor = 'red';
            screenMessage.style.color = 'white';
            backgroundOne.style.backgroundColor = 'green';
            backgroundTwo.style.backgroundColor = 'red';
        } else {
            generateRandomNumber();
        }




        return { randomNumber1, randomNumber2 };
    }

    //generate numbers for challenge (bonus) game
    function generateAndCompareNumbers() {
        let randomNumber1 = Math.floor(Math.random() * 100) + 1;
        let randomNumber2 = Math.floor(Math.random() * 100) + 1;
        let number1 = document.getElementById('option-one-number');
        let number2 = document.getElementById('option-two-number');
        let screenMessage = document.getElementById('challenge-guess-result-message');

        number2.innerText = randomNumber2;
        number1.innerText = randomNumber1;
        number1.style.display = 'block';
        number2.style.display = 'block';
        let initialScore = parseInt(scoreText.textContent, 10);

        let backgroundOne = document.getElementById("option-one-background");
        let backgroundTwo = document.getElementById("option-two-background");

        if (randomNumber1 > randomNumber2) {
            playCorrectAnswerChallengeSound();
            displayRandomMessage('encouraging');
            scoreText.innerText = initialScore * 2;
            screenMessage.textContent = 'CORRRREEECT!!!';
            higherLowerTitle.textContent = "You are a wizard";
            screenMessage.style.backgroundColor = 'green';
            screenMessage.style.color = 'white';
            backgroundOne.style.backgroundColor = 'green';


            backgroundTwo.style.backgroundColor = 'red';

        } else if (randomNumber1 < randomNumber2) {
            scoreText.innerText = initialScore * 0;
            playWrongAnswerChallengeSound();

            screenMessage.style.backgroundColor = 'red';
            screenMessage.style.color = 'white';
            backgroundOne.style.backgroundColor = 'red';
            backgroundTwo.style.backgroundColor = 'green';
            screenMessage.textContent = 'WROOOONG!!!';
            higherLowerTitle.textContent = "It was other one";



        } else {

        }
        // Return an object containing the generated numbers
        return { randomNumber1, randomNumber2 };
    }

    // display messages 
    function displayRandomMessage(messageType) {
        const encouragingMessages = [
            "Brilliant! ",
            "You're unstoppable.",
            "You're excelling.",
            "Superb!",
            "Well done!",
            "You're making it look easy.",
            "Exceptional! ",
            "Incredible!",
            "Remarkable! You're a true star.",
            "You're killing it!",
            "Simply amazing!",
            "Rock on!",
            "Nailed it!",
            "Unreal!",
            "Boss moves!",
            "You're a legend!",
            "Oops, try again.",
            "Learning curve!",
            "It happens.",
            "Keep pushing!",
            "Chin up!",
            "Not the end!",
            "You got this!"
        ];


        const discouragingMessages = [
            "Oops, that didn't go as planned. ",
            "It happens to the best of us.",
            "Struggling a bit? ",
            "It's a tough one.",
            "Not the result you hoped for?",
            "Challenges make us stronger.",
            "Don't be discouraged!",
            "Facing hurdles? ",
            "Tough break.",

        ];

        const messagesArray = (messageType === 'encouraging') ? encouragingMessages : discouragingMessages;
        const randomIndex = Math.floor(Math.random() * messagesArray.length);
        const randomMessage = messagesArray[randomIndex];
        document.getElementById('message-id').innerText = randomMessage;
    }
    // open challenge for bonus game
    function openChallenge() {
        messageForMystery.style.display = 'none';

        let randomOne = Math.floor(Math.random() * 10) + 1;
        let randomTwo = Math.floor(Math.random() * 10) + 1;
        if (randomOne === randomTwo) {
            acceptChallengeScreen.style.display = 'block';

            const offerDisplay = document.getElementById('current-score-offer');
            const doubleOfferDisplay = document.getElementById('double-score-offer');
            let offerNumber = parseInt(scoreText.textContent, 10);
            playbonusMusic();
            pauseBackgroundMusic();
            playbonusMusic();
            if (offerDisplay) {
                offerNumber = offerNumber + 1;
                offerDisplay.innerHTML = offerNumber;
            } else {
            }
            if (doubleOfferDisplay) {
                doubleOfferDisplay.innerHTML = offerNumber * 2;


            } else {

            }
        }

    }

    // red blinking colors for bonus game guessing cards
    let switchDirection = true;
    let stopSwitching = false;
    function switchColors() {
        if (stopSwitching) {
            return;
        }
        const optionOneBackground = document.getElementById("option-one-background");
        const optionTwoBackground = document.getElementById("option-two-background");
        const iconOne = document.getElementById('icon-one');
        const iconTwo = document.getElementById('icon-two');
        if (switchDirection) {
            optionOneBackground.style.backgroundColor = "red";
            optionTwoBackground.style.backgroundColor = "white";
            iconOne.style.color = "white";
            iconTwo.style.color = "black";

        } else {
            optionOneBackground.style.backgroundColor = "white";
            optionTwoBackground.style.backgroundColor = "red";
            iconOne.style.color = "black";
            iconTwo.style.color = "white";

        }

        // Toggle the switch direction
        switchDirection = !switchDirection;
    }

    function updateStyles() {
        guessingNumberMovingContainer.style.color = "white";
        guessingNumberMovingContainer.style.fontWeight = '700';
        scoreText.style.fontWeight = '700';
    }

    let isMystery = false;
    //random number generator
    function generateRandomNumber() {
        let currentNumber;
        if (countMysteryNumber === 9) {
            mysteryNumberContainer.style.display = 'block';
            messageForMystery.style.display = 'block';
            playMysteryNumberSound();
        } else {

        }
        if (countMysteryNumber === 10) {
            isMystery = true;
            countMysteryNumber = 0;
        }
        do {
            currentNumber = Math.floor(Math.random() * 100) + 1;
            if (guessingNumberMovingContainer) {
                guessingNumberMovingContainer.textContent = currentNumber;
            } else {
                return currentNumber;
            }
        } while (currentNumber === previousNumber);
        previousNumber = currentNumber;
        return currentNumber;
    }

    //reset answer to 0
    function resetConsecutiveCorrectAnswers() {
        consecutiveCorrectAnswers = 0;
    }

    /** 
     * Checks if this is your best score
     * @param {number} score - The score to be checked.
     * @param {Array} highScores - An array of objects containing highscores.
     * @returns {boolean} - true if score is the best, false otherwise.
      */
    function isScoreTheBest(score, highScores) {
        return highScores.length === 0 || score > highScores[0].score;
    }

    //save game function
    function saveGame() {
        const currentScore = parseInt(scoreText.textContent, 10);
        const bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];
        const isTheBestScore = isScoreTheBest(currentScore, bestScores);
        const scoreFormContainer = document.getElementById('score-form');
        if (isTheBestScore) {
            scoreFormContainer.style.display = 'block';
            if (currentScore <= 0) {
                alert("Score can't be 0");
                return;
            }
            bestScores.length = 0;
            bestScores.push({ score: currentScore });
            localStorage.setItem('bestScores', JSON.stringify(bestScores));
            displayHighScores();

        } else {
            alert("Sorry, your score is not the best.");
        }


    }
    function initializeBestScore() {
        const bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];

        // If no best scores are stored, initialize with a score of 0
        if (bestScores.length === 0) {
            const initialBestScore = [{ score: 0 }];
            localStorage.setItem('bestScores', JSON.stringify(initialBestScore));
        }
    }

    function checkAndDisplayBestScore() {
        const currentScore = parseInt(scoreText.textContent, 10);
        const highScores = JSON.parse(localStorage.getItem('bestScores')) || [];
        const isTheBestScore = isScoreTheBest(currentScore, highScores);
        if (isTheBestScore) {
            saveGameScreen.style.display = 'block';
            saveBestScoreScreen.style.display = 'block';
        } else {
            popupContainer.style.display = 'block';
        }
    }
    /*Function to chnage color of challenge title*/
    function changeBackgroundColor() {
        let challengeBackgroundColorBlink = document.getElementById("challenge-h2");

        challengeBackgroundColorBlink.style.backgroundColor = colors[colorIndex];

        colorIndex = (colorIndex + 1) % colors.length;
    }

});


/**
        * Function to dynamically resize all images on small screens (e.g., phones).
        * @param {number} newWidth - The new width for the images in ems.
        * @param {number} newHeight - The new height for the images in ems.
        */
function resizeAllImages(newWidth, newHeight) {
    let viewportWidth = window.innerWidth;
    if (viewportWidth <= 600) {
        let imgElements = document.getElementsByTagName('img');
        for (let i = 0; i < imgElements.length; i++) {
            // Check if the current image should be excluded
            if (!imgElements[i].classList.contains('dashboard-icons-class')) {
                imgElements[i].style.width = newWidth + 'em';
                imgElements[i].style.height = newHeight + 'em';
            }
        }
    }
}

function displayHighScores() {
    const highScore = document.getElementById('high-score-paragraph');
    const bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];
    const score = bestScores[0].score;
    highScore.innerHTML = '';
    bestScores.sort((a, b) => b.score - a.score);

    if (bestScores.length > 0) {
        highScore.textContent = score;
    }
}

function displayHighScoresForDashboard() {
    const highScore = document.getElementById('the-best-score-dashboard');
    const bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];
    const score = bestScores[0].score;
    highScore.innerHTML = '';
    bestScores.sort((a, b) => b.score - a.score);

    if (bestScores.length > 0) {
        highScore.textContent = score;
    }

}
/*function to create blinkig effect on card in Challenge*/
function blinkRedBackground() {
    let timerElement = document.getElementById('timer');
    let numberElement = document.getElementById('guessing-number-div');

    timerElement.style.backgroundColor = (timerElement.style.backgroundColor === 'red') ? 'white' : 'red';
    timerElement.style.color = (timerElement.style.backgroundColor === 'white') ? 'black' : 'white';

    numberElement.style.backgroundColor = (timerElement.style.backgroundColor === 'red') ? '' : 'red';

    // Play the warning sound
    //warningSound.play();
}


/*DOM element to create button ripple effect*/
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.ripple-button');
    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            createRipple(event, button);
        });
    });
    function createRipple(event, button) {

        const ripple = document.createElement('div');
        ripple.classList.add('ripple');

        // Set the position of the ripple
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Append the ripple to the button
        button.appendChild(ripple);

        // Apply click/press effects
        button.style.transform = 'scale(0.95)';


        // Remove the ripple element and reset styles after animation completes
        ripple.addEventListener('animationend', () => {
            ripple.remove();
            button.style.transform = '';

        });
    }
});

/*DOM element to select various Theme*/
let themeLinks = document.querySelectorAll('.theme-div a');
document.addEventListener("DOMContentLoaded", function () {

    /* function to apply different Theme*/
    function applyTheme(selectedThemeId) {
        const playground = document.getElementById("playground-section");
        const plusButton = document.getElementById('plus-button');
        const minusBtn = document.getElementById('minus-button');
        const messageText = document.getElementById('message-id');

        const scoreText = document.getElementById('score-screen-number-div');
        const guessingNumber = document.getElementById('guessing-number-div');
        const scoreBoardBackground = document.getElementById('right-wrong-text-with-video');
        const score = document.getElementById('score-text');

        themeLinks.forEach(link => link.classList.remove('active'));
        const selectedThemeLink = document.getElementById(selectedThemeId);
        if (selectedThemeLink) {
            selectedThemeLink.classList.add('active');
        }
        if (selectedThemeId === 'theme-default') {
            playground.style.backgroundImage = 'url("./assets/images/default-main-background.jpg")';


            scoreBoardBackground.style.backgroundColor = "#f4f5f0";
            score.style.color = 'black';
            scoreText.style.backgroundColor = "red";
            scoreText.style.opacity = 0.8;
            scoreText.style.color = "white";
            scoreText.style.border = '2px solid white';


            plusButton.style.backgroundColor = "green";
            plusButton.style.opacity = 0.8;
            plusButton.style.border = '3px solid white';
            plusButton.style.color = "white";

            minusBtn.style.backgroundColor = "red";
            minusBtn.style.opacity = 0.8;
            minusBtn.style.border = '3px solid white';
            minusBtn.style.color = "white";

            messageText.style.backgroundColor = "red";
            messageText.style.opacity = 0.8;
            messageText.style.color = "white";
            messageText.style.border = '3px solid gold';

            guessingNumber.style.backgroundColor = "black";
            guessingNumber.style.opacity = 0.8;
            guessingNumber.style.color = "white";
            guessingNumber.style.border = '3px solid yellow';


        } else if (selectedThemeId === 'theme-space') {
            playground.style.backgroundImage = 'url("./assets/images/space-main-background.jpg")';

            score.style.color = 'black';
            scoreBoardBackground.style.backgroundColor = "#501682";
            plusButton.style.backgroundColor = "black";
            plusButton.style.opacity = 0.8;
            plusButton.style.border = '3px solid cyan';
            plusButton.style.color = "white";

            minusBtn.style.backgroundColor = "white";
            minusBtn.style.opacity = 0.8;
            minusBtn.style.border = '3px solid cyan';
            minusBtn.style.color = "black";

            messageText.style.backgroundColor = "lightblue";
            messageText.style.opacity = 0.8;
            messageText.style.color = "black";
            messageText.style.border = '3px solid cyan';

            scoreText.style.backgroundColor = "red";
            scoreText.style.opacity = 0.8;
            scoreText.style.color = "white";
            scoreText.style.border = '2px solid white';

            guessingNumber.style.backgroundColor = "HotMagenta";
            guessingNumber.style.opacity = 0.8;
            guessingNumber.style.color = "white";
            guessingNumber.style.border = '3px solid cyan';



        } else if (selectedThemeId === 'theme-earth') {
            playground.style.backgroundImage = 'url("./assets/images/earth-main-background.jpg")';

            scoreBoardBackground.style.backgroundColor = "lightblue";
            score.style.color = 'black';

            plusButton.style.backgroundColor = "#40E0D0";
            plusButton.style.opacity = 1;
            plusButton.style.color = "black";
            plusButton.style.border = '3px solid white';

            minusBtn.style.backgroundColor = "#FF10F0";
            minusBtn.style.opacity = 0.8;
            minusBtn.style.border = '3px solid white';
            minusBtn.style.color = "black";

            messageText.style.backgroundColor = "black";
            messageText.style.opacity = 0.8;
            messageText.style.color = "white";
            messageText.style.border = '3px solid white';

            scoreText.style.backgroundColor = "red";
            scoreText.style.opacity = 0.8;
            scoreText.style.color = "white";
            scoreText.style.border = '2px solid white';

            guessingNumber.style.backgroundColor = "green";
            guessingNumber.style.opacity = 0.8;
            guessingNumber.style.color = "white";
            guessingNumber.style.border = '3px solid white';
        } else if (selectedThemeId === 'theme-fairy') {
            playground.style.backgroundImage = 'url("./assets/images/fairy-main-background.jpg")';

            score.style.color = 'black';
            scoreBoardBackground.style.backgroundColor = "lightblue";
            plusButton.style.backgroundColor = "#fc03f4";
            plusButton.style.color = "black";
            plusButton.style.opacity = 0.6;
            plusButton.style.border = '3px solid white';

            minusBtn.style.backgroundColor = "#30fc03";
            minusBtn.style.opacity = 0.8;
            minusBtn.style.border = '3px solid white';
            minusBtn.style.color = "black";

            messageText.style.backgroundColor = "#f4fc03";
            messageText.style.opacity = 0.8;
            messageText.style.color = "black";
            messageText.style.border = '3px solid darkRed';

            scoreText.style.backgroundColor = "red";
            scoreText.style.opacity = 0.8;
            scoreText.style.color = "white";
            scoreText.style.border = '2px solid white';

            guessingNumber.style.backgroundColor = "#9403fc";
            guessingNumber.style.opacity = 0.6;
            guessingNumber.style.color = "white";
            guessingNumber.style.border = '3px solid white';


        } else {

        }
    }

    // Check if a theme is already selected
    const savedThemeId = localStorage.getItem('selectedTheme');
    if (savedThemeId) {
        applyTheme(savedThemeId);
        resizeAllImages(37.5, 25);

    }

    // Add event listeners for theme selection
    themeLinks.forEach(function (themeLink) {
        themeLink.addEventListener('click', function (event) {
            event.preventDefault();
            themeLinks.forEach(link => link.classList.remove('active'));
            themeLink.classList.add('active');
            const selectedThemeId = event.target.id;
            localStorage.setItem('selectedTheme', selectedThemeId);
            applyTheme(selectedThemeId);
            resizeAllImages(37.5, 25);

        });
    });

});


