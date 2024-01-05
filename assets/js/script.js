document.addEventListener('DOMContentLoaded', function () {



    const playerNameInput = document.getElementById('username');
    const soundControl = document.getElementById('sound-control');
    const soundControlButton = document.getElementById('sound-on-off');
    const musicControlButton = document.getElementById('music-on-off');

    const backgroundMusic = document.getElementById('background-music-1');
    const bonusGameMusic = document.getElementById('bonus-game-music');
    const chaseGameMusic = document.getElementById('chase-game-music');
    const tenseGameMusic = document.getElementById('tense-game-music');
    const breaksMusic = document.getElementById('break-music');

    const higherLowerTitle = document.getElementById('higher-lower-title-id');
    const guessingNumberDiv = document.getElementById('guessing-number-div');
    const plusButton = document.getElementById('plus-button');
    const minusButton = document.getElementById('minus-button');
    const answerText = document.getElementById('color-scoreboard-div');
    const scoreText = document.getElementById('score-screen-number-div');

    const exitGameBtn = document.getElementById('exit-game-button');
    const saveGameSection = document.getElementById('exit-game-screen');
    const saveGameButton = document.getElementById('save-game-button');

    const exitSaveGameBtn = document.getElementById('exit-save-game-button')
    const startGameBtn = document.getElementById('start-game-btn');

    const startChallengeButton = document.getElementById('challenge-action-button')
    const declineChallengeButton = document.getElementById('decline-button')
    const acceptChallengeButton = document.getElementById('accept-button')
    const closeChallengeScreen = document.getElementById('challenge-button-close')

    const startTurboGameButton = document.getElementById('action-button');
    const exitTurboButton = document.getElementById('exit-turbo-btn');

    const optOneBck = document.getElementById('option-one-background')
    const optTwoBck = document.getElementById('option-two-background')

    const buttonClickSound = document.getElementById('button-click-sound');
    const rightAnswerSound = document.getElementById('right-answer-sound');
    const wrongAnswerSound = document.getElementById('wrong-answer-sound');

    const exitHighDashboard = document.getElementById('exit-welcome-highscore-instruction');
    const exitRulesDashboard = document.getElementById('exit-welcome-rules-instruction');

    const highScoreDash = document.getElementById('highscore');
    const rulesDash = document.getElementById('rules');

    const welcomeSection = document.getElementById('welcome-section');
    const scoreForm = document.getElementById('score-form');



    const popupContainer = document.getElementById('popup-container');
    const popupButton = document.getElementById('popup-button');


    soundControl.addEventListener('click', function () {
        soundControl.classList.toggle('active');
    });
    // Example: Toggle sound on/off
    let isSoundOn = false;
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

    let isMusicOn = false;
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

    let isMusicPlaying = false;

    function playChaseMusic() {
        if (isMusicOn && !isMusicPlaying) {
            chaseGameMusic.play();
            isMusicPlaying = true;
        }
    }

    function playTenseMusic() {
        if (isMusicOn && !isMusicPlaying) {
            tenseGameMusic.play();
            isMusicPlaying = true;
        }
    }

    function stopChaseMusic() {
        if (isMusicOn) {
            chaseGameMusic.pause();
            chaseGameMusic.currentTime = 0;
            isMusicPlaying = false;
        }
    }

    function playBackgroundMusic() {

        if (isMusicOn) {
            backgroundMusic.play();
        }
    }

    // Function to play the alarm sound every second last 10 seconds
    function playAlarm() {
        const audio = document.getElementById("alarmAudio");
        if (isSoundOn) {
            audio.play();
        }

    }
    function pauseAlarm() {
        const audio = document.getElementById("alarmAudio");

        audio.pause();


    }


    function playCorrectCheer() {
        const audio = document.getElementById("correct");
        if (isSoundOn) {
            audio.play();
        }

    }
    function playWronHmmm() {
        const audio = document.getElementById("wrong");
        if (isSoundOn) {
            audio.play();
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

    function stopTenseMusic() {
        if (isMusicOn) {
            tenseGameMusic.pause();
            tenseGameMusic.currentTime = 0; // Reset the playback position to the beginning
            isMusicPlaying = false;
        }
    }

    function stopBreak() {
        if (isMusicOn) {
            breaksMusic.pause();

        }
    }
    let consecutiveCorrectAnswers = 0;

    isBonus = false;

    //BUTTONS
    highScoreDash.addEventListener('click', function () {
        const wrapDivRules = document.getElementById('wrap-div-rules');
        const wrapDivHighscores = document.getElementById('wrap-div-highscores');
        const hideIcons = document.getElementById('icons-dash-container')
        wrapDivHighscores.style.display = 'block'
        hideIcons.style.display = 'none';
        displayHighScoresForDashboard();


    });

    rulesDash.addEventListener('click', function () {

        const wrapDivRules = document.getElementById('wrap-div-rules');
        const displayCloseButton = document.getElementById('exit-welcome-rules-instruction');

        const hideIcons = document.getElementById('icons-dash-container')
        const rules = document.getElementById('scrollable-container');
        rules.style.display = 'block'

        wrapDivRules.style.display = 'block'
        displayCloseButton.style.display = 'block'

        hideIcons.style.display = 'none';


    });
    startGameBtn.addEventListener('click', function () {
        welcomeSection.style.display = 'none';


        // Add logic to start your game here
    });


    exitHighDashboard.addEventListener('click', function () {
        const hideIcons = document.getElementById('icons-dash-container')
        hideIcons.style.display = 'block';
        const exitHigh = document.getElementById('wrap-div-highscores')
        exitHigh.style.display = 'none';
    });

    exitRulesDashboard.addEventListener('click', function () {
        const rules = document.getElementById('scrollable-container');
        const wrapDivRules = document.getElementById('wrap-div-rules');
        const hideIcons = document.getElementById('icons-dash-container');

        hideIcons.style.display = 'block';
        rules.style.display = 'block';
        wrapDivRules.style.display = 'none';
    });

    //save score button
    saveGameButton.addEventListener('click', async () => {
        const playerName = playerNameInput.value.trim();
        console.log("Username: " + playerName);
        saveGame();
        scoreForm.style.display = 'none'
        scoreText.textContent = '0';
    });

    //exit save game screen
    exitSaveGameBtn.addEventListener('click', function () {
        saveGameSection.style.display = 'none';
    });

    //start turbo game
    startTurboGameButton.addEventListener('click', function () {
        isBonus = true;
        console.log(isBonus);
        document.getElementById('bonus-screen-section').style.display = 'none';        // Store the initial value of the score
        initialScore = parseInt(scoreText.textContent, 10);
        playButtonClickSound();
        playChaseMusic();
        function countdownTimer(seconds) {
            const timerElement = document.getElementById('timer');
            timerElement.style.backgroundColor = 'white'
            higherLowerTitle.innerHTML = "TURBO BONUS"
            function updateDisplay() {
                timerElement.style.display = 'block'; // Make the timer visible
                timerElement.innerHTML = `Time: ${seconds} sec`;
            }

            function count() {
                updateDisplay();
                if (seconds > 0) {
                    // Check if it's the last 5 seconds
                    if (seconds <= 9) {
                        playAlarm();
                        blinkRedBackground(); // Call the blink function
                    }
                    seconds--;
                    setTimeout(count, 1000); // Call count() again after 1000 milliseconds (1 second)
                } else {
                    timerElement.innerHTML = "Time's up!";
                    higherLowerTitle.innerHTML = "Higher or Lower"
                    document.getElementById('exit-turbo-section').style.display = 'block';

                    finalScore = parseInt(scoreText.textContent, 10);
                    pauseAlarm();
                    stopChaseMusic();
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
    closeChallengeScreen.addEventListener('click', function () {
        const iconOne = document.getElementById('icon-one')
        iconOne.style.display = 'block'; // Make the timer visible
        const iconTwo = document.getElementById('icon-two')
        iconTwo.style.display = 'block'; // Make the timer visible
        playBackgroundMusic();
        stopBreak();
        const challengeCloseScreen = document.getElementById('challenge-score-display');
        challengeCloseScreen.style.display = 'none';
        const challengeAcceptScreen = document.getElementById('challenge');
        challengeAcceptScreen.style.display = 'none'; // Make the timer visible
        resetStylesForChallenge();

    });

    //reset styles for challenge
    function resetStylesForChallenge() {
        // Assign the numbers to HTML elements
        let number1 = document.getElementById('option-one-number')
        let number2 = document.getElementById('option-two-number')
        let backgroundOne = document.getElementById("option-one-background");
        let backgroundTwo = document.getElementById("option-two-background");

        backgroundOne.style.backgroundColor = 'white';
        backgroundTwo.style.backgroundColor = 'white';

        number1.style.display = 'none'
        number2.style.display = 'none'

    }

    // exit turbo game button
    exitTurboButton.addEventListener('click', function () {
        const instruction = document.getElementById('exit-turbo-section');
        instruction.style.display = 'none'; // Make the timer visible
        const timerElement = document.getElementById('timer');
        timerElement.style.backgroundColor = 'white';
        timerElement.style.display = 'none';

        playBackgroundMusic();
        playButtonClickSound();

    });

    // decline challenge game button
    declineChallengeButton.addEventListener('click', function () {
        const challengeScreen = document.getElementById('confirmation-section');
        playBackgroundMusic();
        playButtonClickSound();
        stopBreak();

        challengeScreen.style.display = 'none'; // Make the timer visible

    });
 // accept challenge game button
    acceptChallengeButton.addEventListener('click', function () {
        stopSwitching = false; // Reset the flag
        // Start switching colors every half second

        stopBreak();
        intervalId = setInterval(switchColors, 500);

        const challengeAcceptScreen = document.getElementById('challenge');
        challengeAcceptScreen.style.display = 'block'; // Make the timer visible
        const confirmationScreen = document.getElementById('confirmation-section');
        confirmationScreen.style.display = 'none';
        playButtonClickSound();
        playTenseMusic();

    });

 // start challenge button
    startChallengeButton.addEventListener('click', function () {
        const challengeSection = document.getElementById('challenge-screen-section');
        const confirmationScreen = document.getElementById('confirmation-section');
        challengeSection.style.display = 'none';
        confirmationScreen.style.display = 'block';

        playButtonClickSound();
    });
    
    // exit game button
    exitGameBtn.addEventListener('click', function () {
        displayHighScores();
        checkAndDisplayBestScore();
    });

    let currentGuess = generateRandomNumber();
    guessingNumberDiv.textContent = currentGuess;
    updateStyles();

    //compare number
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
            displayRandomMessage('encouraging')


            isCorrect = true;
        } else {
            answerText.textContent = 'Wrong!';
            answerText.style.backgroundColor = 'red';
            answerText.style.color = "white"
            answerText.style.padding = '5px';
            answerText.style.fontWeight = "700"
            answerText.style.fontSize = "1.5rem"
            answerText.style.fontFamily = "Acme";
            displayRandomMessage('discouraging')


            isCorrect = false;
        }

        return isCorrect;
    }

    //minus button
    minusButton.addEventListener('click', function () {
        startShaking();
        playButtonClickSound();
        const newGuess = generateRandomNumber();
        const isCorrect = compareNumbers(currentGuess, newGuess, 'minus');
        if (isCorrect) {
            let currentScore = parseInt(scoreText.textContent, 10);
            if (consecutiveCorrectAnswers === 5) {
                isBonus = true;
                pauseBackgroundMusic();
                document.getElementById('bonus-screen-section').style.display = 'block';
                resetConsecutiveCorrectAnswers();
            } else {
                consecutiveCorrectAnswers++;;
            }
            if (isBonus) {
                resetConsecutiveCorrectAnswers();
                playButtonClickSound();
                scoreText.textContent = Math.max(0, currentScore + 2);
            } else {
                if (currentScore > 0) {
                 openChallenge();
                } else {

                }
                scoreText.textContent = Math.max(0, currentScore + 1);
            }
            playRightAnswerSound();
        } else {
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
        currentGuess = newGuess;
        guessingNumberDiv.textContent = currentGuess;
        updateStyles(); // Apply styles after updating the number and score
    });

    // plus button
    plusButton.addEventListener('click', function () {
        startShaking();
        playButtonClickSound();
        const newGuess = generateRandomNumber();
        const isCorrect = compareNumbers(currentGuess, newGuess, 'plus');
        if (isCorrect) {
            let currentScore = parseInt(scoreText.textContent, 10);
            if (consecutiveCorrectAnswers === 5) {
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
                    openChallenge();
                } else {

                }
                scoreText.textContent = Math.max(0, currentScore + 1);
            }
            playRightAnswerSound();
            if (consecutiveCorrectAnswers === 5) {
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
    let intervalId;
   //left choice in challenge
    optOneBck.addEventListener('click', function () {



        stopSwitching = true; // Set the flag to stop switching
        clearInterval(intervalId); // Stop the blinking
        const iconTwo = document.getElementById('icon-two')
        iconTwo.style.display = 'none'; // Make the timer visible
        const iconOne = document.getElementById('icon-one')
        iconOne.style.display = 'none'; // Make the timer visible

        const challengeAcceptScreen = document.getElementById('challenge-score-display');
        challengeAcceptScreen.style.opacity = 0;
        challengeAcceptScreen.style.display = 'block'; // Make the timer visible

        stopTenseMusic();

        generateAndCompareNumbers();
        setTimeout(function () {
            challengeAcceptScreen.style.transition = 'opacity 1s';
            challengeAcceptScreen.style.opacity = 1;



        }, 700); // Delay for 2 seconds


    });

    // right choice in challenge
    optTwoBck.addEventListener('click', function () {


        stopSwitching = true; // Set the flag to stop switching
        clearInterval(intervalId); // Stop the blinking
        const iconOne = document.getElementById('icon-one')
        iconOne.style.display = 'none'; // Make the timer visible
        const iconTwo = document.getElementById('icon-two')
        iconTwo.style.display = 'none'; // Make the timer visible

        const challengeAcceptScreen = document.getElementById('challenge-score-display');
        challengeAcceptScreen.style.opacity = 0;


        challengeAcceptScreen.style.display = 'block'; // Make the timer visible
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

    // generate and compare numbers for challenge(bonus)
    function generateAndCompareNumbersForTwo() {
        let randomNumber1 = Math.floor(Math.random() * 100) + 1;
        let randomNumber2 = Math.floor(Math.random() * 100) + 1;
        let number1 = document.getElementById('option-one-number')
        let number2 = document.getElementById('option-two-number')
        let screenMessage = document.getElementById('final-chalange-score')
        number2.innerText = randomNumber2;
        number1.innerText = randomNumber1;
        number1.style.display = 'block'
        number2.style.display = 'block'

        let backgroundOne = document.getElementById("option-one-background");
        let backgroundTwo = document.getElementById("option-two-background");
        let initialScore = parseInt(scoreText.textContent, 10);


        if (randomNumber1 < randomNumber2) {
            playCorrectCheer();

            displayRandomMessage('encouraging')
            scoreText.innerText = initialScore * 2
            screenMessage.style.color = 'white';
            screenMessage.style.backgroundColor = 'green'
            backgroundOne.style.backgroundColor = 'red';
            backgroundTwo.style.backgroundColor = 'green';
            screenMessage.textContent = 'CORRRREEECT!!!';


        } else if (randomNumber2 < randomNumber1) {
            displayRandomMessage('discouraging')
            playWronHmmm();
            scoreText.innerText = initialScore * 0
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
        let number1 = document.getElementById('option-one-number')
        let number2 = document.getElementById('option-two-number')
        let screenMessage = document.getElementById('final-chalange-score')

        number2.innerText = randomNumber2;
        number1.innerText = randomNumber1;
        number1.style.display = 'block'
        number2.style.display = 'block'
        let initialScore = parseInt(scoreText.textContent, 10);

        let backgroundOne = document.getElementById("option-one-background");
        let backgroundTwo = document.getElementById("option-two-background");

        if (randomNumber1 > randomNumber2) {
            playCorrectCheer();

            displayRandomMessage('encouraging')
            scoreText.innerText = initialScore * 2
            screenMessage.textContent = 'CORRRREEECT!!!';
            screenMessage.style.backgroundColor = 'green';
            screenMessage.style.color = 'white';
            backgroundOne.style.backgroundColor = 'green';


            backgroundTwo.style.backgroundColor = 'red';

        } else if (randomNumber1 < randomNumber2) {
            scoreText.innerText = initialScore * 0
            playWronHmmm();

            screenMessage.style.backgroundColor = 'red';
            screenMessage.style.color = 'white';
            backgroundOne.style.backgroundColor = 'red';
            backgroundTwo.style.backgroundColor = 'green';
            screenMessage.textContent = 'WROOOONG!!!';

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
            "Remarkable! You're a true star."
        ];

        const discouragingMessages = [
            "Oops, that didn't go as planned. ",
            "It happens to the best of us.",
            "Struggling a bit? ",
            "It's a tough one.",
            "Hmm, not the result you hoped for.",
            "Challenges make us stronger.",
            "Don't be discouraged!",
            "Facing hurdles? ",
            "Tough break.",

        ];

        const messagesArray = (messageType === 'encouraging') ? encouragingMessages : discouragingMessages;

        const randomIndex = Math.floor(Math.random() * messagesArray.length);
        const randomMessage = messagesArray[randomIndex];

        document.getElementById('higher-lower-title-id').innerText = randomMessage;
    }
    // open challenge for bonus game
    function openChallenge() {
        let randomOne = Math.floor(Math.random() * 10) + 1;
        let randomTwo = Math.floor(Math.random() * 10) + 1;
        if (randomOne === randomTwo) {
            const challengeScreen = document.getElementById('challenge-screen-section');
            const offerDisplay = document.getElementById('current-score-offer');
            const doubleOfferDisplay = document.getElementById('double-score-offer');
            offerNumber = parseInt(scoreText.textContent, 10);
            playbonusMusic();
            pauseBackgroundMusic();
            playbonusMusic();
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

    // reb blinking colors for bonus game
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

    //update styles after bonus game
    function updateStyles() {
        guessingNumberDiv.style.color = "white";
        guessingNumberDiv.style.fontSize = '3rem';
        guessingNumberDiv.style.fontWeight = '700';
        scoreText.style.color = 'white';
        scoreText.style.fontSize = '1.5rem';
        scoreText.style.fontWeight = '700';
    }

   //random number generator
    function generateRandomNumber() {
        let previousNumber = null;
        let currentNumber;
        currentNumber = Math.floor(Math.random() * 100) + 1;
        if (currentNumber === previousNumber) {
            currentNumber = Math.floor(Math.random() * 100) + 1;
            guessingNumberDiv.textContent = currentNumber;
        }
        previousNumber = currentNumber;
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

    //reset answer to 0
    function resetConsecutiveCorrectAnswers() {
        consecutiveCorrectAnswers = 0;
    }

    function isScoreTheBest(score, highScores) {
        return highScores.length === 0 || score > highScores[0].score;
    }

    //save game function
    function saveGame() {
        const usernameInput = document.getElementById('username');
        const username = usernameInput.value.trim();
        if (username === "") {
            alert("Please enter a valid username.");
            return;
        }
        const currentScore = parseInt(scoreText.textContent, 10);
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const isTheBestScore = isScoreTheBest(currentScore, highScores);
        const scoreFormContainer = document.getElementById('score-form');
        if (isTheBestScore) {
            scoreFormContainer.style.display = 'block';
            if (highScores.some(item => item.name === username)) {
                alert("This username already exists. Please choose a different one.");
                return;
            }

            if (currentScore <= 0) {
                alert("Score can't be 0");
                return;
            }

            highScores.length = 0;
            highScores.push({ name: username, score: currentScore });
            localStorage.setItem('highScores', JSON.stringify(highScores));
            displayHighScores();

        } else {
            alert("Sorry, your score is not the best.");
        }

        // Clear the username input field
        usernameInput.value = "";
    }

    function checkAndDisplayBestScore() {
        const currentScore = parseInt(scoreText.textContent, 10);
        const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const isTheBestScore = isScoreTheBest(currentScore, highScores);
        if (isTheBestScore) {
            saveGameSection.style.display = 'block';
            scoreForm.style.display = 'block'
        } else {
            popupContainer.style.display = 'block';
        }
    }
});

function setBestScoreTwo() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const bestScoreIndex = highScores.findIndex(item => item.score === 2);
    const updatedHighScores = bestScoreIndex !== -1 ? [highScores[bestScoreIndex]] : [];
    localStorage.setItem('highScores', JSON.stringify(updatedHighScores));
}

let themeLinks = document.querySelectorAll('.theme-div a');
document.addEventListener("DOMContentLoaded", function () {
    // Check if a theme is already selected
    const savedThemeId = localStorage.getItem('selectedTheme');
    if (savedThemeId) {
        applyTheme(savedThemeId);
    }

    // Add event listeners for theme selection
    themeLinks.forEach(function (themeLink) {
        themeLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default behavior of the anchor tag

            // Remove 'active' class from all theme links
            themeLinks.forEach(link => link.classList.remove('active'));

            // Add 'active' class to the clicked theme link
            themeLink.classList.add('active');

            // Get the selected theme ID
            const selectedThemeId = event.target.id;
            localStorage.setItem('selectedTheme', selectedThemeId);

            // Apply the selected theme

            // Apply the selected theme
            applyTheme(selectedThemeId);
        });
    });


});


function applyTheme(selectedThemeId) {
    const contentDiv = document.getElementById("playground-section");
    const challengeSection = document.getElementById("challenge-screen-section");
    const confirmationSection = document.getElementById("confirmation-section");
    const plusBtn = document.getElementById('plus-button');
    const minusBtn = document.getElementById('minus-button');
    const challengeButtonbackground = document.getElementById('challenge')
    const higherLowerTitle = document.getElementById('higher-lower-title-id')
    const scoreText = document.getElementById('score-screen-number-div');
    const guessingNumber = document.getElementById('guessing-number-div');
    const doubleItTitle = document.getElementById('double-it-title');
    const anwerText = document.getElementById('answer-text');
    const challengeScoreScreen = document.getElementById('challenge-score-display');
    const bonusScreen = document.getElementById('bonus-screen-section');
    const turboExitScreen = document.getElementById('exit-turbo-section');
    const scoreBoardBackground = document.getElementById('score-board-div');
    const score = document.getElementById('score-text');

    themeLinks.forEach(link => link.classList.remove('active'));
    const selectedThemeLink = document.getElementById(selectedThemeId);
    if (selectedThemeLink) {
        selectedThemeLink.classList.add('active');
    }
    if (selectedThemeId === 'theme-default') {
        contentDiv.style.backgroundImage = 'url("./assets/images/default-main-background.jpg")';
        challengeSection.style.backgroundImage = 'url("./assets/images/default-welcome-challenge-screen.jpg")';
        confirmationSection.style.backgroundImage = 'url("./assets/images/default-confirm-challenge-background.jpg")';
        challengeButtonbackground.style.backgroundImage = 'url("./assets/images/default-challenge-background.jpg")';
        challengeScoreScreen.style.backgroundImage = 'url("./assets/images/default-close-challenge-background.jpg")';
        bonusScreen.style.backgroundImage = 'url("./assets/images/default-turbo-bonus-background.jpg")';
        turboExitScreen.style.backgroundImage = 'url("./assets/images/default-exit-turbo-bonus-background.jpg")';

        scoreBoardBackground.style.backgroundColor = "#f4f5f0"
        score.style.color = 'white'
        plusBtn.style.backgroundColor = "green"
        plusBtn.style.opacity = 0.8;
        plusBtn.style.border = '3px solid white';
        plusBtn.style.color = "white";
        minusBtn.style.backgroundColor = "red"
        minusBtn.style.opacity = 0.8;
        minusBtn.style.border = '3px solid white';
        minusBtn.style.color = "white"

        higherLowerTitle.style.backgroundColor = "red"
        higherLowerTitle.style.opacity = 0.8;
        higherLowerTitle.style.color = "white"
        higherLowerTitle.style.border = '3px solid gold';

        guessingNumber.style.backgroundColor = "black"
        guessingNumber.style.opacity = 0.8;
        guessingNumber.style.color = "white"
        guessingNumber.style.border = '3px solid yellow';

        doubleItTitle.style.backgroundColor = "black"
        doubleItTitle.style.color = "white"
        doubleItTitle.style.opacity = 0.8;
        doubleItTitle.style.border = '3px solid white';

    } else if (selectedThemeId === 'theme-space') {
        contentDiv.style.backgroundImage = 'url("./assets/images/space-main-background.jpg")';
        challengeSection.style.backgroundImage = 'url("./assets/images/space-welcome-challenge-background.jpg")';
        confirmationSection.style.backgroundImage = 'url("./assets/images/space-confirm-challenge-background.jpg")';
        challengeButtonbackground.style.backgroundImage = 'url("./assets/images/space-challenge-background.jpg")';
        challengeScoreScreen.style.backgroundImage = 'url("./assets/images/space-close-challenge-background.jpg")';
        bonusScreen.style.backgroundImage = 'url("./assets/images/space-turbo-bonus-background.jpg")';
        turboExitScreen.style.backgroundImage = 'url("./assets/images/space-exit-turbo-background.jpg")';

        score.style.color = 'white'
        scoreBoardBackground.style.backgroundColor = "#501682"
        plusBtn.style.backgroundColor = "black"
        plusBtn.style.opacity = 0.8;
        plusBtn.style.border = '3px solid cyan';
        plusBtn.style.color = "white";

        minusBtn.style.backgroundColor = "white"
        minusBtn.style.opacity = 0.8;
        minusBtn.style.border = '3px solid cyan';
        minusBtn.style.color = "black"

        higherLowerTitle.style.backgroundColor = "lightblue"
        higherLowerTitle.style.opacity = 0.8;
        higherLowerTitle.style.color = "black"
        higherLowerTitle.style.border = '3px solid cyan';

        scoreText.style.backgroundColor = "black"
        scoreText.style.opacity = 0.8;
        scoreText.style.color = "purple"
        scoreText.style.border = '2px solid cyan';

        guessingNumber.style.backgroundColor = "HotMagenta"
        guessingNumber.style.opacity = 0.8;
        guessingNumber.style.color = "white"
        guessingNumber.style.border = '3px solid cyan';

        doubleItTitle.style.backgroundColor = "black"
        doubleItTitle.style.color = "white"
        doubleItTitle.style.opacity = 0.8;
        doubleItTitle.style.border = '3px solid white';

    } else if (selectedThemeId === 'theme-earth') {
        contentDiv.style.backgroundImage = 'url("./assets/images/earth-playground.jpg")';
        challengeSection.style.backgroundImage = 'url("./assets/images/challenge-earth.jpg")';
        confirmationSection.style.backgroundImage = 'url("./assets/images/confirm-earth.jpg")';
        bonusScreen.style.backgroundImage = 'url("./assets/images/by-two-bonus.jpg")';
        challengeScoreScreen.style.backgroundImage = 'url("./assets/images/challenge-back-earth.jpg")';
        challengeButtonbackground.style.backgroundImage = 'url("./assets/images/double-it-earth.jpg")';

        scoreBoardBackground.style.backgroundColor = "lightblue"
        score.style.color = 'white'

        plusBtn.style.backgroundColor = "#40E0D0"
        plusBtn.style.opacity = 1;
        plusBtn.style.color = "black"
        plusBtn.style.border = '3px solid white';

        minusBtn.style.backgroundColor = "#FF10F0"
        minusBtn.style.opacity = 0.8;
        minusBtn.style.border = '3px solid white';
        minusBtn.style.color = "black"

        higherLowerTitle.style.backgroundColor = "black"
        higherLowerTitle.style.opacity = 0.8;
        higherLowerTitle.style.color = "white"
        higherLowerTitle.style.border = '3px solid white';

        scoreText.style.backgroundColor = "red"
        scoreText.style.opacity = 0.8;
        scoreText.style.color = "white"
        scoreText.style.border = '2px solid black';

        guessingNumber.style.backgroundColor = "green"
        guessingNumber.style.opacity = 0.8;
        guessingNumber.style.color = "white"
        guessingNumber.style.border = '3px solid white';

        doubleItTitle.style.backgroundColor = "black"
        doubleItTitle.style.color = "white"
        doubleItTitle.style.opacity = 0.8;
        doubleItTitle.style.border = '3px solid white';


    } else if (selectedThemeId === 'theme-fairy') {
        contentDiv.style.backgroundImage = 'url("./assets/images/fairy-main-background.jpg")';
        challengeSection.style.backgroundImage = 'url("./assets/images/fairy-welcome-challenge-background.jpg")';
        confirmationSection.style.backgroundImage = 'url("./assets/images/fairy-confirm-challenge-background.jpg")';
        bonusScreen.style.backgroundImage = 'url("./assets/images/fairy-turbo-bonus-background.jpg")';
        challengeButtonbackground.style.backgroundImage = 'url("./assets/images/fairy-challenge-background.jpg")';
        challengeScoreScreen.style.backgroundImage = 'url("./assets/images/fairy-close-challenge-background.jpg")';
        turboExitScreen.style.backgroundImage = 'url("./assets/images/fairy-turbo-bonus-background.jpg")';
        
        score.style.color = 'white'
        scoreBoardBackground.style.backgroundColor = ""
        plusBtn.style.backgroundColor = "#fc03f4"
        plusBtn.style.color = "black"
        plusBtn.style.opacity = 0.6;
        plusBtn.style.border = '3px solid white';

        minusBtn.style.backgroundColor = "#30fc03"
        minusBtn.style.opacity = 0.8;
        minusBtn.style.border = '3px solid white';
        minusBtn.style.color = "black"

        higherLowerTitle.style.backgroundColor = "#f4fc03"
        higherLowerTitle.style.opacity = 0.8;
        higherLowerTitle.style.color = "black"
        higherLowerTitle.style.border = '3px solid darkRed';

        scoreText.style.backgroundColor = "darkRed"
        scoreText.style.color = "purple"
        scoreText.style.border = '3px solid cyan';

        guessingNumber.style.backgroundColor = "#9403fc"
        guessingNumber.style.opacity = 0.6;
        guessingNumber.style.color = "white"
        guessingNumber.style.border = '3px solid white';

        doubleItTitle.style.backgroundColor = "black"
        doubleItTitle.style.color = "white"
        doubleItTitle.style.opacity = 0.8;
        doubleItTitle.style.border = '3px solid white';

    } else {
       
    }
}

function displayHighScores() {
    const highScoreList = document.getElementById('high-score-list');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoreList.innerHTML = '';
    highScores.sort((a, b) => b.score - a.score);
    const topScore = highScores[0];

    if (topScore) {
        const li = document.createElement('li');
        const scoreNumberSpan = document.createElement('span');
        const playerNameSpan = document.createElement('span');
        scoreNumberSpan.className = 'score-number';
        playerNameSpan.className = 'player-name';
        playerNameSpan.textContent = `${topScore.name}: ${topScore.score}`;
        li.appendChild(scoreNumberSpan);
        li.appendChild(playerNameSpan);
        li.style.backgroundColor = 'gold';
        li.style.borderRadius = '25px';
        li.style.color = 'black';
        highScoreList.appendChild(li);
    }
}

function displayHighScoresForDashboard() {
    const highScoreList = document.getElementById('high-score-list-dash');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoreList.innerHTML = '';
    // Sort the highScores array in descending order based on the score
    highScores.sort((a, b) => b.score - a.score);
    const topScore = highScores[0];
    if (topScore) {
        const li = document.createElement('li');
        const scoreNumberSpan = document.createElement('span');
        const playerNameSpan = document.createElement('span');
        scoreNumberSpan.className = 'score-number';
        playerNameSpan.className = 'player-name';
        playerNameSpan.textContent = `${topScore.name}: ${topScore.score}`;
        li.appendChild(scoreNumberSpan);
        li.appendChild(playerNameSpan);
        li.style.backgroundColor = 'gold';
        li.style.border = '1px solid white';
        li.style.color = 'black';

        highScoreList.appendChild(li);
    }
}

function blinkRedBackground() {
    let timerElement = document.getElementById('timer');
    let numberElement = document.getElementById('guessing-number-div');

    timerElement.style.backgroundColor = (timerElement.style.backgroundColor === 'red') ? 'white' : 'red';
    timerElement.style.color = (timerElement.style.backgroundColor === 'white') ? 'black' : 'white';

    numberElement.style.backgroundColor = (timerElement.style.backgroundColor === 'red') ? '' : 'red';

    // Play the warning sound
    //warningSound.play();
}
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.ripple-button');

    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            createRipple(event, button);
        });
    });
});
function createRipple(event, button) {
    // Create a ripple element
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





function updatePlayerList(players) {
    const listContainer = document.getElementById('high-score-list-dash');

    // Clear existing list items
    listContainer.innerHTML = '';

    // Create new list items
    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name} - ${player.score}`;

        // Add class based on position for background color
        if (index === 0) {
            listItem.classList.add('gold');
        } else if (index === 1) {
            listItem.classList.add('silver');
        } else if (index === 2) {
            listItem.classList.add('bronze');
        }

        listContainer.appendChild(listItem);
    });
}

async function fetchDataForSaveGame() {
    try {
        const response = await fetch('http://localhost:3003/players');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }



        const players = await response.json();
        players.sort((a, b) => b.score - a.score);
        updatePlayerListForSaveGame(players);
    } catch (error) {

    }
}

function updatePlayerListForSaveGame(players) {
    const listContainer = document.getElementById('high-score-list');

    // Clear existing list items
    listContainer.innerHTML = '';

    // Create new list items
    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        const scoreNumberSpan = document.createElement('span');
        const playerNameSpan = document.createElement('span');

        // Set content
        scoreNumberSpan.textContent = index + 1 + '.';
        playerNameSpan.textContent = `${player.name}: ${player.score}`;

        // Add spans to the list item
        listItem.appendChild(scoreNumberSpan);
        listItem.appendChild(playerNameSpan);

        // Add class based on position for background color
        if (index === 0) {
            listItem.classList.add('gold');
        } else if (index === 1) {
            listItem.classList.add('silver');
        } else if (index === 2) {
            listItem.classList.add('bronze');
        }
        scoreNumberSpan.style.textAlign = 'center';
        playerNameSpan.style.textAlign = 'center';
        listContainer.appendChild(listItem);
    });
}



