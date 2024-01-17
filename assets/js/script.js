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
    let isMystery = false;


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
    const turboBonusMusic = document.getElementById('turbo-game-background-music');
    const challengeGameMusic = document.getElementById('challenge-game-music');
    const buttonClickSound = document.getElementById('button-click-sound');
    const rightAnswerSound = document.getElementById('right-answer-sound');
    const wrongAnswerSound = document.getElementById('wrong-answer-sound');
    const mysterySound = document.getElementById('mystery-sound');
    const challengeTriggeredSound = document.getElementById('challenge-game-triggered-sound');

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
    const saveGameScoreButton = document.getElementById('save-game-button');
    const exitSaveGameScreenButton = document.getElementById('exit-save-game-button');
    const startGameButton = document.getElementById('start-game-button');
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
    const saveGameScreen = document.getElementById('save-best-score-screen');
    const acceptChallengeScreen = document.getElementById("accept-challenge-section");
    const saveBestScoreScreen = document.getElementById('score-form');
    const popupButton = document.getElementById('popup-button');


    /**
     * FUNCTION CALLS: 
     * to downsize image resolution if is smalls screen,
     * initialise best score,
     * make cards blink in challenge
     */

    resizeAllImages(37.5, 25);
    initializeBestScore();
    setInterval(makeBlinkChallengeTitleBackgroundColor, 200);

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
    * Function to stop playing the challenge game music.
    * 
    * This function checks if the music is turned on, pauses the challenge game music, 
    * and resets the playback position to the beginning. It also updates the music playing state.
    */
    function stopChallengeMusic() {
        // Check if the music is turned on
        if (isMusicOn) {
            // Pause the challenge game music
            challengeGameMusic.pause();
            // Reset the playback position to the beginning
            challengeGameMusic.currentTime = 0;
            // Update the music playing state
            isMusicPlaying = false;
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

    /**
   * Function to play the mystery number sound.
   * 
   * This function plays the sound effect when the mystery number is triggered.
   */
    function playMysteryNumberSound() {
        // Check if the sound is turned on
        if (isSoundOn) {
            // Play the mystery number sound effect
            mysterySound.play();
        }
    }

    /**
   * Function to play the button click sound.
   * 
   * This function plays the sound effect for button clicks.
   */
    function playButtonClickSound() {
        // Check if the sound is turned on
        if (isSoundOn) {
            // Play the button click sound effect
            buttonClickSound.play();
        }
    }

    /**
  * Function to play the sound when a challenge is triggered.
  * 
  * This function plays the sound effect when a challenge is activated.
  */
    function playChallengeTriggeredSound() {
        // Check if the sound is turned on
        if (isSoundOn) {
            // Play the challenge triggered sound effect
            challengeTriggeredSound.play();
        }
    }

    /**
     * Reset styles for the challenge.
     * 
     * This function resets the styles for the challenge by setting background colors to white
     * and hiding the display of option numbers.
     */
    function resetStylesForChallenge() {
        // Get elements for option one
        let number1 = document.getElementById('option-one-number');
        let backgroundOne = document.getElementById("option-one-background");

        // Get elements for option two
        let number2 = document.getElementById('option-two-number');
        let backgroundTwo = document.getElementById("option-two-background");

        // Reset background colors to white
        backgroundOne.style.backgroundColor = 'white';
        backgroundTwo.style.backgroundColor = 'white';

        // Hide the display of option numbers
        number1.style.display = 'none';
        number2.style.display = 'none';
    }

    /**
   * Event listener for the click on the "seeHighscoreDashboardButton" button.
   * 
   * This function is triggered when the "seeHighscoreDashboardButton" button is clicked.
   * It displays the highscore screen, hides the icons on the welcome screen, 
   * and calls a function to display high scores on the dashboard.
   */
    seeHighscoreDashboardButton.addEventListener('click', function () {
        // Get the elements for the highscore screen and icons on the welcome screen
        const welcomeScreenHighscores = document.getElementById('welcome-highscore-screen');
        const welcomeScreenIcons = document.getElementById('icons-for-welcome-screen-container');
        // Display the highscore screen
        welcomeScreenHighscores.style.display = 'block';
        // Hide the icons on the welcome screen
        welcomeScreenIcons.style.display = 'none';
        // Call the function to display high scores on the dashboard
        displayHighScoresForDashboard();
    });

    /**
 * Event listener for the click on the "See Rules" button.
 * 
 * This function is triggered when the "See Rules" button is clicked.
 * It displays the rules screen, the close button, and the rules container,
 * while hiding the icons on the welcome screen.
 */
    seeRulesDashboardButton.addEventListener('click', function () {
        // Get the elements for rules screen, close button, icons, and rules container
        const displaysRules = document.getElementById('welcome-rules-screen');
        const displayCloseRulesButton = document.getElementById('exit-welcome-rules');
        const hideIcons = document.getElementById('icons-for-welcome-screen-container');
        const rules = document.getElementById('rules-container');
        // Display the rules screen, close button, and rules container
        rules.style.display = 'block';
        displaysRules.style.display = 'block';
        displayCloseRulesButton.style.display = 'block';
        // Hide the icons on the welcome screen
        hideIcons.style.display = 'none';
    });

    /**
  * Event listener for the click on the "startGameButton" button.
  * 
  * This function is triggered when the "startGameButton" button is clicked.
  * It hides the welcome screen.
  */
    startGameButton.addEventListener('click', function () {
        // Get the element for the welcome screen
        const welcomeScreen = document.getElementById('welcome-screen-section');
        // Hide the welcome screen
        welcomeScreen.style.display = 'none';
    });

    /**
  * Event listener for the click on the "exitHighscoreDashboardButton" button.
  * 
  * This function is triggered when the "exitHighscoreDashboardButton" button is clicked.
  * It displays the icons on the welcome screen and hides the highscore screen.
  */
    exitHighscoreDashboardButton.addEventListener('click', function () {
        // Get the element for the icons on the welcome screen
        const hideIcons = document.getElementById('icons-for-welcome-screen-container');
        // Display the icons
        hideIcons.style.display = 'block';
        // Get the element for the highscore screen
        const exitHigh = document.getElementById('welcome-highscore-screen');
        // Hide the highscore screen
        exitHigh.style.display = 'none';
    });

    /**
 * Event listener for the click on the "exitRulesDashboardButton" button.
 * 
 * This function is triggered when the "exitRulesDashboardButton" button is clicked.
 * It displays the icons on the welcome screen, hides the rules screen, 
 * and displays the rules container.
 */
    exitRulesDashboardButton.addEventListener('click', function () {
        // Get the element for the rules container
        const rules = document.getElementById('rules-container');
        // Get the element for the rules screen
        const rulesScreen = document.getElementById('welcome-rules-screen');
        // Get the element for the icons on the welcome screen
        const hideIcons = document.getElementById('icons-for-welcome-screen-container');
        // Display the icons and rules container, hide the rules screen
        hideIcons.style.display = 'block';
        rules.style.display = 'block';
        rulesScreen.style.display = 'none';
    });

    /**
  * Event listener for the click on the "saveGameScoreButton" button.
  * 
  * This function is triggered when the "saveGameScoreButton" button is clicked.
  * It saves the current game, hides the save best score screen, and 
  * updates the "scoreText" to '0'.
  */
    saveGameScoreButton.addEventListener('click', function () {
        // Save the current game
        saveGame();
        // Get the element for the save best score screen
        const saveBestScoreScreen = document.getElementById('score-form');
        // Update the score text to '0' and hide the save best score screen
        scoreText.textContent = '0';
        saveBestScoreScreen.style.display = 'none';
    });

    /**
 * Event listener for the click on the "exitSaveGameScreenButton" button.
 * 
 * This function is triggered when the "exitSaveGameScreenButton" button is clicked.
 * It hides the save game screen.
 */
    exitSaveGameScreenButton.addEventListener('click', function () {
        // Get the element for the save game screen
        const saveGameScreen = document.getElementById('save-best-score-screen');
        // Hide the save game screen
        saveGameScreen.style.display = 'none';
    });


    /**
 * Event listener for the click on the "Start Turbo Bonus Game" button.
 * 
 * This function is triggered when the "Start Turbo Bonus Game" button is clicked.
 * It initializes the Turbo Bonus Game, updates the score, and starts the countdown timer.
 */
    startTurboGameButton.addEventListener('click', function () {
        // Set the bonus flag to true
        isBonus = true;
        console.log(isBonus);

        // Hide the Turbo Bonus screen
        document.getElementById('turbo-bonus-screen-section').style.display = 'none';

        // Get the initial score
        let initialScore = parseInt(scoreText.textContent, 10);

        // Play button click sound and Turbo Bonus music
        playButtonClickSound();
        playTurboBonusMusic();

        /**
         * Function to start the countdown timer for Turbo Bonus Game.
         * @param {number} seconds - The duration of the timer in seconds.
         */
        function countdownTimer(seconds) {
            // Get the timer element
            const timerElement = document.getElementById('timer');
            // Set the initial background color of the timer
            timerElement.style.backgroundColor = 'white';

            /**
             * Function to update the display of the countdown timer.
             */
            function updateDisplay() {
                // Make the timer visible
                timerElement.style.display = 'block';
                // Display the remaining time
                timerElement.innerHTML = `Time: ${seconds} sec`;
            }

            /**
             * Function to execute the countdown logic.
             */
            function count() {
                // Update the display
                updateDisplay();

                if (seconds > 0) {
                    // Check if it's the last 5 seconds
                    if (seconds <= 9) {
                        playAlarmAlertSoundTimer();
                        blinkRedBackground(); // Call the blink function
                    }

                    // Decrement the seconds
                    seconds--;

                    // Call count() again after 1000 milliseconds (1 second)
                    setTimeout(count, 1000);
                } else {
                    // Display time's up when the countdown is finished
                    timerElement.innerHTML = "Time's up!";
                    // Set the title back to "Higher or Lower"
                    higherLowerTitle.innerHTML = "Higher or Lower";
                    // Display the exit Turbo Bonus section
                    document.getElementById('exit-turbo-bonus-section').style.display = 'block';
                    // Set the timer color to black
                    timerElement.style.color = "black";

                    // Get the final score
                    let finalScore = parseInt(scoreText.textContent, 10);

                    // Pause the alarm sound and stop Turbo Bonus music
                    pauseAlarmAlertSoundTimer();
                    stopTurboBonusMusic();

                    // Play the Challenge Triggered sound
                    playChallengeTriggeredSound();

                    // Calculate the score difference
                    let scoreDifference = finalScore - initialScore;

                    // Get the Turbo score element
                    let turboScoreElement = document.getElementById('turbo-score');

                    // Update the Turbo score element with the score difference
                    if (turboScoreElement) {
                        turboScoreElement.innerHTML = scoreDifference;
                    }

                    // Set the bonus flag back to false
                    isBonus = false;
                }
            }
            // Start the countdown
            count();
        }

        // Start the countdown timer with a duration of 20 seconds
        countdownTimer(20);
    });


    /**
  * Event listener for the click on the "closeChallengeScreenButton" button.
  * 
  * This function is triggered when the "closeChallengeScreenButton" button is clicked.
  * It displays the challenge icons, plays background music, and hides the challenge screens.
  */
    closeChallengeScreenButton.addEventListener('click', function () {
        // Display icon one
        const iconOne = document.getElementById('icon-one');
        iconOne.style.display = 'block';

        // Display icon two
        const iconTwo = document.getElementById('icon-two');
        iconTwo.style.display = 'block';

        // Play background music
        playBackgroundMusic();

        // Hide the challenge score display
        const challengeCloseScreen = document.getElementById('challenge-score-display');
        challengeCloseScreen.style.display = 'none';

        // Hide the challenge accept screen
        const challengeAcceptScreen = document.getElementById('challenge');
        challengeAcceptScreen.style.display = 'none';

        // Reset styles for the challenge
        resetStylesForChallenge();
    });

    /**
     * Handle the click event for the exit turbo button.
     * 
     * This function is triggered when the exit turbo button is clicked. It hides the turbo bonus
     * section, resets the timer element styles, plays background music, and triggers the button click sound.
     */
    exitTurboButton.addEventListener('click', function () {
        // Hide the turbo bonus section
        const instruction = document.getElementById('exit-turbo-bonus-section');
        instruction.style.display = 'none';

        // Reset the timer element styles
        const timerElement = document.getElementById('timer');
        timerElement.style.backgroundColor = 'white';
        timerElement.style.display = 'none';

        // Play background music and trigger button click sound
        playBackgroundMusic();
        playButtonClickSound();
    });


    /**
  * Event listener for the click on the "declineChallengeButton" button.
  * 
  * This function is triggered when the "declineChallengeButton" button is clicked.
  * It plays main background music, a button click sound, and hides the accept challenge screen.
  */
    declineChallengeButton.addEventListener('click', function () {
        // Get the accept challenge screen element
        const acceptChallengeScreen = document.getElementById('accept-challenge-section');

        // Play background music
        playBackgroundMusic();

        // Play button click sound
        playButtonClickSound();

        // Hide the accept challenge screen
        acceptChallengeScreen.style.display = 'none';
    });

    /**
     * Event listener for the click on the "acceptChallengeButton" button.
     * 
     * This function is triggered when the "acceptChallengeButton" button is clicked.
     * It initiates color switching, displays the challenge screen, plays a button click sound,
     * and starts playing challenge music.
     */
    acceptChallengeButton.addEventListener('click', function () {
        // Allow color switching
        stopSwitching = false;

        // Start interval for color switching
        intervalId = setInterval(switchColorsForChallengeOptions, 500);

        // Get the challenge screen element
        const challengeScreen = document.getElementById('challenge');
        challengeScreen.style.display = 'block';

        // Get the accept challenge screen element
        const acceptChallengeScreen = document.getElementById('accept-challenge-section');
        acceptChallengeScreen.style.display = 'none';

        // Play button click sound
        playButtonClickSound();

        // Start playing challenge music
        playChallengeMusic();
    });

    /**
  * Event listener for the click on the "exitGameBtn" button.
  * 
  * This function is triggered when the "exitGameBtn" button is clicked.
  * It updates the best score display, shows the high scores, and checks/display the best score.
  */
    exitGameBtn.addEventListener('click', function () {
        // Get the best score text display element
        const bestScoreTextDisplay = document.getElementById('best-score-paragraph');

        // Update the best score text display with the current score
        bestScoreTextDisplay.textContent = parseInt(scoreText.textContent, 10);

        // Display the high scores
        displayHighScores();

        // Check and display the best score
        checkAndDisplayBestScore();
    });

    /**
  * Generates a random number and initializes the guessing number display and styles.
  */
    let currentGuess = generateRandomNumber();
    guessingNumberMovingContainer.textContent = currentGuess;
    updateStyles();

    /**
     * Applies common styles to the given HTML element.
     * 
     * @param {HTMLElement} element - The HTML element to which styles will be applied.
     */
    function applyCommonStyles(element) {
        element.style.color = "white";
        element.style.padding = '5px';
        element.style.fontWeight = "700";
        element.style.fontFamily = "Acme";
    }

    /**
 * Compares the current guessing number with a new number based on the user's guess.
 * Updates the answer text, background color, and displays a random message.
 * Adjusts font size based on screen width.
 * 
 * @param {number} current - The current guessing number.
 * @param {number} newNumber - The new number to compare with the current guessing number.
 * @param {string} guess - The user's guess, either 'plus' or 'minus'.
 * @returns {boolean} - True if the guess is correct, false otherwise.
 */
    function compareNumbers(current, newNumber, guess) {
        // Variable to store whether the user's guess is correct or not
        let isCorrect;

        // Check if mystery mode is activated
        if (countMysteryNumber === 10) {
            isMystery = true;
        }

        // Compare numbers and update answer text and styles
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

    /**
    * Event listener for the click on the "minusButton" button.
    * This function is triggered when the "minusButton" button is clicked.
    * It handles the user's guess of the mystery number being lower, updates the score,
    * and triggers bonus or challenge events based on the guess result.
    */
    minusButton.addEventListener('click', function () {
        // Hide the mystery number container and message
        mysteryNumberContainer.style.display = 'none';
        messageForMystery.style.display = 'none';

        // Increment the count of mystery numbers guessed
        countMysteryNumber++;

        // Play button click sound
        playButtonClickSound();

        // Generate a new mystery number
        const newGuess = generateRandomNumber();

        // Compare the new guess with the current mystery number and determine if it's correct
        const isCorrect = compareNumbers(currentGuess, newGuess, 'minus');

        // Get the current score
        let currentScore = parseInt(scoreText.textContent, 10);

        // Display the guessed mystery number
        guessedNumber.textContent = "Mystery number was: " + currentGuess;

        // Start fade-out animation for the guessed number
        startFadeOutAnimation('guessed-number');

        // Handle the result of the guess
        if (isCorrect) {
            // If the guess is correct
            if (consecutiveCorrectAnswers === 5) {
                // If there are 5 consecutive correct answers, trigger the turbo bonus
                isBonus = true;
                pauseBackgroundMusic();
                document.getElementById('turbo-bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();
            } else {
                // Otherwise, increment the consecutive correct answers
                consecutiveCorrectAnswers++;
            }

            // Handle scoring based on bonus and mystery
            if (isBonus && !isMystery) {
                // If it's a bonus round without a mystery, score +2
                resetConsecutiveCorrectAnswers();
                playButtonClickSound();
                scoreText.textContent = Math.max(0, currentScore + 2);
            } else if (isBonus && isMystery) {
                // If it's a bonus round with a mystery, score +10 and display the guessed number
                scoreText.textContent = Math.max(0, currentScore + 10);
                guessedNumber.style.display = 'block';
            } else if (!isBonus && isMystery) {
                // If it's a regular round with a mystery, score +5 and display the guessed number
                guessedNumber.style.display = 'block';
                scoreText.textContent = Math.max(0, currentScore + 5);
            } else {
                // If it's neither a bonus nor a mystery, check for challenges or regular scoring
                if (currentScore > 0 && !isBonus) {
                    openChallenge();
                }
                scoreText.textContent = Math.max(0, currentScore + 1);
            }

            // Play the main right answer sound
            playMainRightAnswerSound();
        } else {
            // If the guess is wrong
            if (isMystery) {
                // If it's a mystery round, display the guessed number
                console.log(isMystery);
                guessedNumber.style.display = 'block';
            }

            // Reset consecutive correct answers
            resetConsecutiveCorrectAnswers();

            // Handle scoring based on bonus
            if (isBonus) {
                // If it's a bonus round, score -2
                resetConsecutiveCorrectAnswers();
                scoreText.textContent = Math.max(0, currentScore - 2);
            } else {
                // If it's a regular round, score -1
                scoreText.textContent = Math.max(0, currentScore - 1);
            }

            // Play the wrong answer sound
            playWrongAnswerSound();
        }

        // Start fade-out animation for the guessed number
        startFadeOutAnimation('guessed-number');

        // Reset the mystery flag
        isMystery = false;

        // Update the current guess and display it
        currentGuess = newGuess;
        guessingNumberMovingContainer.textContent = currentGuess;
        updateStyles();
    });

    /**
  * Event listener for the click on the "plusButton" button.
  * This function is triggered when the "plusButton" button is clicked.
  * It handles the user's guess of the mystery number being higher, updates the score,
  * and triggers bonus or challenge events based on the guess result.
  */
    plusButton.addEventListener('click', function () {
        // Increment the mystery number counter
        countMysteryNumber++;

        // Hide mystery number container and message for mystery
        mysteryNumberContainer.style.display = 'none';
        messageForMystery.style.display = 'none';

        // Hide guessed number and update its content
        guessedNumber.style.display = "none";
        guessedNumber.textContent = "Mystery number was: " + currentGuess;

        // Apply fade-out animation to guessed number
        startFadeOutAnimation('guessed-number');

        // Play button click sound
        playButtonClickSound();

        // Generate a new mystery number
        const newGuess = generateRandomNumber();

        // Compare the new guess with the current mystery number
        const isCorrect = compareNumbers(currentGuess, newGuess, 'plus');

        if (isCorrect) {
            let currentScore = parseInt(scoreText.textContent, 10);

            // Check if the consecutive correct answers reach 5
            if (consecutiveCorrectAnswers === 5) {
                isBonus = true;
                pauseBackgroundMusic();
                document.getElementById('turbo-bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();
            }

            // Increment consecutive correct answers counter
            consecutiveCorrectAnswers++;

            if (isBonus && !isMystery) {
                // Reset consecutive correct answers and play button click sound
                resetConsecutiveCorrectAnswers();
                playButtonClickSound();
                scoreText.textContent = Math.max(0, currentScore + 2);
            } else if (isBonus && isMystery) {
                // Update score and display guessed number
                scoreText.textContent = Math.max(0, currentScore + 10);
                guessedNumber.style.display = 'block';
            } else if (!isBonus && isMystery) {
                // Update score and display guessed number
                scoreText.textContent = Math.max(0, currentScore + 5);
                guessedNumber.style.display = 'block';
            } else {
                // Check for challenges or display regular score increment
                if (currentScore > 0 && !isBonus) {
                    openChallenge();
                }

                // Display regular score increment
                scoreText.textContent = Math.max(0, currentScore + 1);
            }

            // Play right answer sound
            playMainRightAnswerSound();

            // Check if consecutive correct answers reach 5 for bonus
            if (consecutiveCorrectAnswers === 5) {
                isBonus = true;
                pauseBackgroundMusic();
                playChallengeTriggeredSound();
                document.getElementById('turbo-bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();
            }

        } else {
            // Display guessed number if it's a mystery round
            if (isMystery) {
                console.log(isMystery);
                guessedNumber.style.display = 'block';
            }

            // Reset consecutive correct answers and decrement the score if the guess is wrong
            resetConsecutiveCorrectAnswers();
            let currentScore = parseInt(scoreText.textContent, 10);

            // Ensure that the score is not negative; if it is, set it to zero.
            if (currentScore < 0) {
                currentScore = 0;
            }

            // Adjust the score based on whether it's a bonus round or a regular round.
            if (isBonus) {
                // Decrement score for bonus round
                if (currentScore <= 0) {
                    currentScore = 0;
                }
                resetConsecutiveCorrectAnswers();
                scoreText.textContent = Math.max(0, currentScore - 2);
            } else {
                // Decrement score for regular round
                // Ensure the score doesn't go below zero
                if (currentScore <= 0) {
                    currentScore = 0;
                }
                scoreText.textContent = Math.max(0, currentScore - 1);
                resetConsecutiveCorrectAnswers();
            }

            // Play wrong answer sound
            playWrongAnswerSound();
        }

        // Apply fade-out animation to guessed number
        startFadeOutAnimation('guessed-number');

        // Reset mystery flag, update current guess, and update styles
        isMystery = false;
        currentGuess = newGuess;
        guessingNumberMovingContainer.textContent = currentGuess;
        updateStyles(); // Apply styles after updating the number and score
    });

    /**
     * Event listener for the left choice button in the challenge screen.
     * 
     * This function is triggered when the user clicks on the left choice button during a challenge.
     * It stops the color switching animation, hides icons, displays and animates the challenge score display,
     * stops the challenge music  and compares numbers for the challenge.
     * The challenge score display is then smoothly revealed with a transition effect.
     */
    let intervalId;
    challengeLeftChoiceButton.addEventListener('click', function () {
        // Stop the color switching animation
        stopSwitching = true;
        clearInterval(intervalId);

        // Hide icons
        const iconTwo = document.getElementById('icon-two');
        iconTwo.style.display = 'none';
        const iconOne = document.getElementById('icon-one');
        iconOne.style.display = 'none';

        // Display and animate the challenge score display
        const challengeAcceptScreen = document.getElementById('challenge-score-display');
        challengeAcceptScreen.style.opacity = 0;
        challengeAcceptScreen.style.display = 'block';

        // Stop the challenge music
        stopChallengeMusic();

        // Generate and compare numbers for the challenge
        generateAndCompareNumbersForLeftOptionChallenge();

        // Set a delay before animating the challenge score display
        setTimeout(function () {
            challengeAcceptScreen.style.transition = 'opacity 1s';
            challengeAcceptScreen.style.opacity = 1;
        }, 700);
    });

    /**
  * Event listener for the right choice button in the challenge screen.
  * 
  * This function is triggered when the user clicks on the right choice button during a challenge.
  * It stops the color switching animation, hides icons, displays and animates the challenge score display,
  * stops the challenge music, and generates and compares numbers for the challenge (two-choice version).
  * The challenge score display is then smoothly revealed with a transition effect.
  */
    challengeRightChoiceButton.addEventListener('click', function () {
        // Stop the color switching animation
        stopSwitching = true;
        clearInterval(intervalId);

        // Hide icons
        const iconOne = document.getElementById('icon-one');
        iconOne.style.display = 'none';
        const iconTwo = document.getElementById('icon-two');
        iconTwo.style.display = 'none';

        // Set up the challenge score display
        const challengeAcceptScreen = document.getElementById('challenge-score-display');
        challengeAcceptScreen.style.opacity = 0;
        challengeAcceptScreen.style.display = 'block';

        // Stop the challenge music
        stopChallengeMusic();

        // Generate and compare numbers for the two-choice challenge
        generateAndCompareNumbersForRightOptionChallenge();

        // Smoothly reveal the challenge score display with a transition effect
        setTimeout(function () {
            challengeAcceptScreen.style.transition = 'opacity 1s';
            challengeAcceptScreen.style.opacity = 1;
        }, 700); // Delay for 2 seconds
    });

    /**
  * Event listener for the click on the "popupButton" button.
  * 
  * This function is triggered when the button is clicked and hides the popup container.
  */
    popupButton.addEventListener('click', function () {
        // Retrieve the reference to the element with the ID 'popup-container'
        const popupContainer = document.getElementById('popup-container');

        // Hide the popup container
        popupContainer.style.display = 'none';
    });


    /**
     * Initiates a fade-out animation for the specified element based on its ID.
     * 
     * @param {string} elementId - The ID of the HTML element to which the animation is applied.
     */
    function startFadeOutAnimation(elementId) {
        // Retrieve the reference to the DOM element with the provided ID
        const guessedNumberBackground = document.getElementById(elementId);

        // Check if the element with the specified ID exists
        if (!guessedNumberBackground) {
            console.error('Element with ID ' + elementId + ' not found.');
            return;
        }

        // Add the 'fadeOut' class to trigger the fade-out animation
        guessedNumberBackground.classList.add('fadeOut');

        // Set a timeout to hide the element after the animation duration (3000 milliseconds)
        setTimeout(function () {
            guessedNumberBackground.style.display = 'none';
        }, 3000);
    }

    /**
 * Generates random numbers for right positioned choice, displays them on the challenge screen,
 * and compares them to determine the challenge result.
 * 
 * @returns {Object} An object containing the generated random numbers (randomNumber1 and randomNumber2).
 */
    function generateAndCompareNumbersForRightOptionChallenge() {
        // Generate two random numbers between 1 and 100
        let randomNumber1 = Math.floor(Math.random() * 100) + 1;
        let randomNumber2 = Math.floor(Math.random() * 100) + 1;

        // Retrieve references to DOM elements
        let number1 = document.getElementById('option-one-number');
        let number2 = document.getElementById('option-two-number');
        let screenMessage = document.getElementById('challenge-guess-result-message');
        let backgroundOne = document.getElementById("option-one-background");
        let backgroundTwo = document.getElementById("option-two-background");

        // Display the generated random numbers on the challenge screen
        number2.innerText = randomNumber2;
        number1.innerText = randomNumber1;
        number1.style.display = 'block';
        number2.style.display = 'block';

        // Get the initial score from the game
        let initialScore = parseInt(scoreText.textContent, 10);

        // Compare the random numbers to determine the challenge result
        if (randomNumber1 < randomNumber2) {
            // Display encouraging message and update the score
            playCorrectAnswerChallengeSound();
            displayRandomMessage('encouraging');
            scoreText.innerText = initialScore * 2;
            screenMessage.style.color = 'white';
            screenMessage.style.backgroundColor = 'green';
            backgroundOne.style.backgroundColor = 'red';
            backgroundTwo.style.backgroundColor = 'green';
            screenMessage.textContent = 'CORRRREEECT!!!';
        } else if (randomNumber2 < randomNumber1) {
            // Display discouraging message and update the score
            displayRandomMessage('discouraging');
            playWrongAnswerChallengeSound();
            scoreText.innerText = initialScore * 0;
            screenMessage.textContent = 'WROOOONG!!!';
            screenMessage.style.backgroundColor = 'red';
            screenMessage.style.color = 'white';
            backgroundOne.style.backgroundColor = 'green';
            backgroundTwo.style.backgroundColor = 'red';
        } else {
            // If the random numbers are equal, regenerate new numbers
            generateRandomNumber();
        }

        // Return the generated random numbers
        return { randomNumber1, randomNumber2 };
    }


    /**
  * Generates two random numbers for left positioned choice, displays them on the challenge screen,
  * and compares them to determine the challenge result.
  * 
  * @returns {Object} An object containing the generated random numbers (randomNumber1 and randomNumber2).
  */
    function generateAndCompareNumbersForLeftOptionChallenge() {
        // Generate two random numbers between 1 and 100
        let randomNumber1 = Math.floor(Math.random() * 100) + 1;
        let randomNumber2 = Math.floor(Math.random() * 100) + 1;

        // Retrieve references to DOM elements
        let number1 = document.getElementById('option-one-number');
        let number2 = document.getElementById('option-two-number');
        let screenMessage = document.getElementById('challenge-guess-result-message');
        let backgroundOne = document.getElementById("option-one-background");
        let backgroundTwo = document.getElementById("option-two-background");

        // Display the generated random numbers on the challenge screen
        number2.innerText = randomNumber2;
        number1.innerText = randomNumber1;
        number1.style.display = 'block';
        number2.style.display = 'block';

        // Get the initial score from the game
        let initialScore = parseInt(scoreText.textContent, 10);

        // Compare the random numbers to determine the challenge result
        if (randomNumber1 > randomNumber2) {
            // Display encouraging message, update the score, and adjust styles
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
            // Display discouraging message, update the score, and adjust styles
            scoreText.innerText = initialScore * 0;
            playWrongAnswerChallengeSound();
            screenMessage.style.backgroundColor = 'red';
            screenMessage.style.color = 'white';
            backgroundOne.style.backgroundColor = 'red';
            backgroundTwo.style.backgroundColor = 'green';
            screenMessage.textContent = 'WROOOONG!!!';
            higherLowerTitle.textContent = "It was the other one";
        } else {
            // If the random numbers are equal, no action is taken
        }

        // Return an object containing the generated random numbers
        return { randomNumber1, randomNumber2 };
    }


    /**
  * Function to display a random encouraging or discouraging message.
  * @param {string} messageType - The type of message to display ('encouraging' or 'discouraging').
  */
    function displayRandomMessage(messageType) {
        // Array of encouraging messages
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

        // Array of discouraging messages
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

        // Select the appropriate array based on the message type
        const messagesArray = (messageType === 'encouraging') ? encouragingMessages : discouragingMessages;

        // Generate a random index to select a random message
        const randomIndex = Math.floor(Math.random() * messagesArray.length);

        // Get the random message and display it
        const randomMessage = messagesArray[randomIndex];
        document.getElementById('message-id').innerText = randomMessage;
    }

    /**
 * Function to open a challenge when conditions are met.
 */
    function openChallenge() {
        // Hide the message for the mystery number
        messageForMystery.style.display = 'none';

        // Generate two random numbers
        let randomOne = Math.floor(Math.random() * 10) + 1;
        let randomTwo = Math.floor(Math.random() * 10) + 1;

        // Check if the challenge should be opened
        if (randomOne === randomTwo) {
            // Display the challenge accept screen
            acceptChallengeScreen.style.display = 'block';

            // Get elements for offer display
            const offerDisplay = document.getElementById('current-score-offer');
            const doubleOfferDisplay = document.getElementById('double-score-offer');

            // Get the current score
            let offerNumber = parseInt(scoreText.textContent, 10);

            // Play challenge triggered sound and pause background music
            playChallengeTriggeredSound();
            pauseBackgroundMusic();
            playChallengeTriggeredSound();

            // Update offer displays
            if (offerDisplay) {
                offerNumber = offerNumber + 1;
                offerDisplay.innerHTML = offerNumber;
            }
            if (doubleOfferDisplay) {
                doubleOfferDisplay.innerHTML = offerNumber * 2;
            }
        }
    }

    /**
  * Initial values for the switch direction and stopping the switching.
  */
    let switchDirection = true; // Initial direction is set to true
    let stopSwitching = false; // Initial stopping is set to false
    /**
  * Function to switch colors between two options.
  */
    function switchColorsForChallengeOptions() {
        // Check if switching should stop
        if (stopSwitching) {
            return;
        }

        // Get elements for option backgrounds and icons
        const optionOneBackground = document.getElementById("option-one-background");
        const optionTwoBackground = document.getElementById("option-two-background");
        const iconOne = document.getElementById('icon-one');
        const iconTwo = document.getElementById('icon-two');

        // Switch colors based on the switch direction
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

    /**
 * Update styles for the guessing number and score text.
 */
    function updateStyles() {
        guessingNumberMovingContainer.style.color = "white";
        guessingNumberMovingContainer.style.fontWeight = '700';
        scoreText.style.fontWeight = '700';
    }

    /**
  * Generate a random number for the guessing game.
  * @returns {number} The generated random number.
  */
    function generateRandomNumber() {
        let currentNumber;

        // Check if it's time to display the mystery number
        if (countMysteryNumber === 9) {
            mysteryNumberContainer.style.display = 'block';
            messageForMystery.style.display = 'block';
            playMysteryNumberSound();
        }

        // Check if it's the last round
        if (countMysteryNumber === 10) {
            isMystery = true;
            countMysteryNumber = 0;
        }

        // Generate a random number and ensure it's different from the previous one
        do {
            currentNumber = Math.floor(Math.random() * 100) + 1;

            // Display the current number in the guessing container
            if (guessingNumberMovingContainer) {
                guessingNumberMovingContainer.textContent = currentNumber;
            } else {
                return currentNumber;
            }
        } while (currentNumber === previousNumber);

        // Update the previous number and return the current one
        previousNumber = currentNumber;
        return currentNumber;
    }

    /**
  * Reset the count of consecutive correct answers to zero.
  */
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

    /**
     * Save the current game score to the local storage and update the high scores if it's the best score.
     * Display a form for entering the player's name if the score is the best.
     */
    function saveGame() {
        // Get the current game score from the displayed text content
        const currentScore = parseInt(scoreText.textContent, 10);

        // Get the best scores from local storage or initialize an empty array
        const bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];

        // Check if the current score is the best among existing scores
        const isTheBestScore = isScoreTheBest(currentScore, bestScores);

        // Get the score form container element by its ID
        const scoreFormContainer = document.getElementById('score-form');

        // Check if the current score is the best
        if (isTheBestScore) {
            // Display the form for entering the player's name
            scoreFormContainer.style.display = 'block';

            if (currentScore <= 0) {
                // Show an alert if the current score is 0
                alert("Score can't be 0");
                return;
            }

            // Update the best scores with the current score
            bestScores.length = 0;
            bestScores.push({ score: currentScore });
            localStorage.setItem('bestScores', JSON.stringify(bestScores));

            // Display the updated high scores
            displayHighScores();
        } else {
            // Alert the user that their score is not the best
            alert("Sorry, your score is not the best.");
        }
    }

   /*
 * Function to initialize the best scores in local storage.
 * If there are no best scores, it sets an initial best score of 0.
 */
function initializeBestScore() {
    // Retrieve best scores from local storage or initialize an empty array
    const bestScores = JSON.parse(localStorage.getItem('bestScores')) || [];

    // Check if there are no best scores
    if (bestScores.length === 0) {
        // Set an initial best score of 0
        const initialBestScore = [{ score: 0 }];
        localStorage.setItem('bestScores', JSON.stringify(initialBestScore));
    }
}


    function checkAndDisplayBestScore() {
        const popupContainer = document.getElementById('popup-container');
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

   /*
 * Function to make the background color of the challenge title blink through an array of colors.
 */
function makeBlinkChallengeTitleBackgroundColor() {
    // Get the challenge title element
    let challengeBackgroundColorBlink = document.getElementById("challenge-h2");

    // Set the background color to the next color in the array
    challengeBackgroundColorBlink.style.backgroundColor = colors[colorIndex];

    // Increment the color index and loop back to the beginning if needed
    colorIndex = (colorIndex + 1) % colors.length;
}

});


/**
 * Function to dynamically resize all images on small screens (e.g., phones).
 * @param {number} newWidth - The new width for the images in ems.
 * @param {number} newHeight - The new height for the images in ems.
 */
function resizeAllImages(newWidth, newHeight) {
    // Get the viewport width
    let viewportWidth = window.innerWidth;

    // Check if the viewport width is less than or equal to 600 pixels
    if (viewportWidth <= 600) {
        // Get all image elements on the page
        let imgElements = document.getElementsByTagName('img');

        // Loop through each image element
        for (let i = 0; i < imgElements.length; i++) {
            // Check if the current image should be excluded
            if (!imgElements[i].classList.contains('dashboard-icons-class')) {
                // Set the new width and height for the image
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


