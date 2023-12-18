document.addEventListener('DOMContentLoaded', function () {


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

    const startChallengeButton = document.getElementById('challenge-action-button')
    const declineChallengeButton = document.getElementById('decline-button')
    const acceptChallengeButton = document.getElementById('accept-button')
    const closeDoubleItScreen = document.getElementById('challenge-button-close')


    const optOneBck = document.getElementById('option-one-background')
    const optTwoBck = document.getElementById('option-two-background')

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
            chaseGameMusic.currentTime = 0; // Reset the playback position to the beginning
            isMusicPlaying = false;
        }
    }
    // Function to play the background music
    function playBackgroundMusic() {

        if (isMusicOn) {
            backgroundMusic.play();
        }
    }

    // Function to play the alarm sound every second
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

    closeDoubleItScreen.addEventListener('click', function () {
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
        resetStylesForCHallenge();

    });  
    function resetStylesForCHallenge() {
        // Assign the numbers to HTML elements
        let number1 = document.getElementById('option-one-number')
        let number2 = document.getElementById('option-two-number')
        let screenMessage = document.getElementById('final-chalange-score')
        let backgroundOne = document.getElementById("option-one-background");
        let backgroundTwo = document.getElementById("option-two-background");

        backgroundOne.style.backgroundColor = 'white';
        backgroundTwo.style.backgroundColor = 'white';

        number1.style.display = 'none'
        number2.style.display = 'none'

    }
    declineChallengeButton.addEventListener('click', function () {
        console.log(" button clicked");
        const challengeScreen = document.getElementById('confirmation-section');
        playBackgroundMusic();
        playButtonClickSound();
        stopBreak();

        challengeScreen.style.display = 'none'; // Make the timer visible

    });

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
    let intervalId; // Declare intervalId in the outer scope

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

    function generateAndCompareNumbersForTwo() {
        // Generate random numbers between 1 and 100
        let randomNumber1 = Math.floor(Math.random() * 100) + 1;
        let randomNumber2 = Math.floor(Math.random() * 100) + 1;



        // Assign the numbers to HTML elements
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


            // Add your logic to give points for correct guess in your game
        } else {

        }



        // Return an object containing the generated numbers
        return { randomNumber1, randomNumber2 };
    }

    function generateAndCompareNumbers() {
        // Generate random numbers between 1 and 100
        let randomNumber1 = Math.floor(Math.random() * 100) + 1;
        let randomNumber2 = Math.floor(Math.random() * 100) + 1;

        

        // Assign the numbers to HTML elements
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

    
function displayRandomMessage(messageType) {
    const encouragingMessages = [
        "Great job! You're doing fantastic!",
        "Keep it up! You're on the right track.",
        "Awesome! You're getting better.",
        "You're doing well! Keep pushing.",
        "Fantastic! You're making progress."
    ];

    const discouragingMessages = [
        "Hmm, not bad. You're doing okay.",
        "Keep trying! You'll get there.",
        "It's okay, everyone has tough moments.",
        "Don't give up! You can do it.",
        "You'll improve with practice. Keep going."
    ];

    const messagesArray = (messageType === 'encouraging') ? encouragingMessages : discouragingMessages;

    const randomIndex = Math.floor(Math.random() * messagesArray.length);
    const randomMessage = messagesArray[randomIndex];

    document.getElementById('higher-lower-title-id').innerText = randomMessage;
}
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
// Function to toggle between red and original color
let switchDirection = true; // true for left, false for right
let stopSwitching = false; // Flag to stop switching colors

// Function to switch background colors between left and right
function switchColors() {
    if (stopSwitching) {
        return; // Stop switching if the flag is true
    }

    const optionOneBackground = document.getElementById("option-one-background");
    const optionTwoBackground = document.getElementById("option-two-background");
    const iconOne = document.getElementById('icon-one');
    const iconTwo = document.getElementById('icon-two');

    // Set the background colors based on the switch direction
    if (switchDirection) {
        optionOneBackground.style.backgroundColor = "red";
        optionTwoBackground.style.backgroundColor = "white";
        iconOne.style.color = "white";
        iconTwo.style.color = "";
     
    } else {
        optionOneBackground.style.backgroundColor = "white";
        optionTwoBackground.style.backgroundColor = "red";
        iconOne.style.color = "";
        iconTwo.style.color = "white";
     
    }

    // Toggle the switch direction
    switchDirection = !switchDirection;
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



//THEME

// Get all the theme links
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
    
        themeLinks.forEach(link => link.classList.remove('active'));
    
        // Add 'active' class to the clicked theme link
        const selectedThemeLink = document.getElementById(selectedThemeId);
        if (selectedThemeLink) {
            selectedThemeLink.classList.add('active');
        }
    
        if (selectedThemeId === 'theme-default') {
    
            contentDiv.style.backgroundImage = 'url("./assets/images/main-default-background.jpg")';
            challengeSection.style.backgroundImage = 'url("./assets/images/default-challenge-screen.jpg")';
            confirmationSection.style.backgroundImage = 'url("./assets/images/conf-sect-bck.jpg")';
            challengeButtonbackground.style.backgroundImage = 'url("./assets/images/challenge-default.jpg")';
            challengeScoreScreen.style.backgroundImage = 'url("./assets/images/chall-screen-bck.jpg")';
            bonusScreen.style.backgroundImage = 'url("./assets/images/bonus-def-bck.jpg")';
            turboExitScreen.style.backgroundImage = 'url("./assets/images/exit-turbo-instruction-bck.jpg")';
    
            scoreBoardBackground.style.backgroundColor = "#f4f5f0"
    
    
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
    
            doubleItTitle.style.backgroundColor = "lightblue"
            guessingNumber.style.opacity = 0.6;
            doubleItTitle.style.color = "LaserLemon"
            doubleItTitle.style.border = '3px solid indigo';
    
    
    
    
            console.log('Default theme selected');
        } else if (selectedThemeId === 'theme-space') {
            contentDiv.style.backgroundImage = 'url("./assets/images/space-playground-bck.jpg")';
            challengeSection.style.backgroundImage = 'url("./assets/images/challenge-space-bck.jpg")';
            confirmationSection.style.backgroundImage = 'url("./assets/images/confirm-challenge-space-bck.jpg")';
            challengeButtonbackground.style.backgroundImage = 'url("./assets/images/bonus-screen-space.jpg")';
            challengeScoreScreen.style.backgroundImage = 'url("./assets/images/challen-screen-space.jpg")';
            bonusScreen.style.backgroundImage = 'url("./assets/images/bonus-screen-space.jpg")';
            turboExitScreen.style.backgroundImage = 'url("./assets/images/exit-turbo-space.jpg")';
    
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
    
    
    
            scoreText.style.backgroundColor = "lightblue"
            scoreText.style.opacity = 0.8;
            scoreText.style.color = "purple"
            scoreText.style.border = '2px solid cyan';
    
    
            guessingNumber.style.backgroundColor = "HotMagenta"
            guessingNumber.style.opacity = 0.8;
            guessingNumber.style.color = "white"
            guessingNumber.style.border = '3px solid cyan';
    
            doubleItTitle.style.backgroundColor = "indigo"
            doubleItTitle.style.color = "LaserLemon"
            doubleItTitle.style.border = '3px solid indigo';
    
    
    
    
            console.log('Space theme selected');
        } else if (selectedThemeId === 'theme-earth') {
            contentDiv.style.backgroundImage = 'url("./assets/images/earth-playground.jpg")';
            challengeSection.style.backgroundImage = 'url("./assets/images/challenge-earth.jpg")';
            confirmationSection.style.backgroundImage = 'url("./assets/images/confirm-earth.jpg")';
            bonusScreen.style.backgroundImage = 'url("./assets/images/by-two-bonus.jpg")';
            challengeScoreScreen.style.backgroundImage = 'url("./assets/images/challenge-back-earth.jpg")';
            challengeButtonbackground.style.backgroundImage = 'url("./assets/images/double-it-earth.jpg")';
    
            scoreBoardBackground.style.backgroundColor = "#067d3a"
    
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
            scoreText.style.color = "purple"
            scoreText.style.border = '2px solid black';
    
    
            guessingNumber.style.backgroundColor = "green"
            guessingNumber.style.opacity = 0.8;
            guessingNumber.style.color = "white"
            guessingNumber.style.border = '3px solid white';
    
            doubleItTitle.style.backgroundColor = "indigo"
            doubleItTitle.style.color = "LaserLemon"
            doubleItTitle.style.border = '3px solid indigo';
            console.log('Earth theme selected');
    
    
        } else if (selectedThemeId === 'theme-midgard') {
            contentDiv.style.backgroundImage = 'url("./assets/images/fairy-background.jpg")';
            challengeSection.style.backgroundImage = 'url("./assets/images/fairy-chall-bck.jpg")';
            confirmationSection.style.backgroundImage = 'url("./assets/images/fairy-confirm.jpg")';
            bonusScreen.style.backgroundImage = 'url("./assets/images/turbo-fairy.jpg")';
            challengeButtonbackground.style.backgroundImage = 'url("./assets/images/fairy-double-it.jpg")';
            challengeScoreScreen.style.backgroundImage = 'url("./assets/images/chalenge-score.jpg")';
            turboExitScreen.style.backgroundImage = 'url("./assets/images/turbo-fairy.jpg")';
    
            scoreBoardBackground.style.backgroundColor = "#e30e0e"
    
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
    
            doubleItTitle.style.backgroundColor = "indigo"
            doubleItTitle.style.color = "LaserLemon"
            doubleItTitle.style.opacity = 0.6;
            doubleItTitle.style.border = '3px solid white';
    
            doubleItTitle.style.border = '3px solid indigo';
    
    
            // Code to handle the Midgard theme
            console.log('Midgard theme selected');
        } else {
            // Code for other themes or a default case
            console.log('Unknown theme selected');
        }
    }
    
});



