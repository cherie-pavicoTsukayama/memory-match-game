var dynamicContainer = document.createElement('main');
document.querySelector('aside').insertAdjacentElement('afterend', dynamicContainer)
dynamicContainer.setAttribute('id', 'gameCards');
var gameCards = document.getElementById('gameCards');
gameCards.addEventListener('click', handleClick);
var hintButton = document.getElementById('hint');
hintButton.addEventListener('click', hint);
var hintModal = document.getElementById('hintModal');
hintModal.addEventListener('click', closeHintModal);
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var maxMatches = 9;
var matches = null;
var attempts = 0;
var gamesPlayed = 0;
var hintCounter = 3;
var matchingCard = null;
var soundFx = document.getElementById('soundFx');
soundFx.addEventListener('click', soundFXToggle);
var cog = document.getElementById('cog');
cog.addEventListener('click', settingsToggle);
var closeModal = document.getElementById('closeModal');
closeModal.addEventListener('click', settingsToggle);
var bgMusicButton = document.getElementById('bgMusic');
bgMusicButton.addEventListener('click', bgMusicToggle);
var ambientMusic = document.getElementById('ambientMusic');
var modeSelected = null;




dynamicContainer.className = 'col-8';
var startingCardLogos = shuffleClasses();
var startingCardLogosHardMode = shuffleClassesHardMode();

for (var i = 0; i < 18; i++) {
    var dynamicCardBack = document.createElement('div');
    dynamicCardBack.classList.add('card-back', 'cyan-glow');

    var dynamicCardFront = document.createElement('div');

    var dynamicCard = document.createElement('div');
    dynamicContainer.appendChild(dynamicCard);
    dynamicCard.classList.add("col-2", "card", "col-s-3");
    dynamicCard.appendChild(dynamicCardBack);
    dynamicCard.appendChild(dynamicCardFront);
    dynamicCardFront.classList.add('hidden');
    dynamicCardFront.classList.add('card-front', startingCardLogos[i]);
}

for (var i = 0; i < 18; i++) {
    var cardFronts = document.querySelectorAll('.card-front');
    cardFronts[i].classList.remove('hidden');
    var cardBack = document.getElementsByClassName('card-back');
    cardBack[i].addEventListener('click', clickSound);
}

function hardMode() {
    removeAllCards();
    modeSelected = 'hardMode';
    for (var i = 0; i < 36; i++) {
        var dynamicCardBack = document.createElement('div');
        dynamicCardBack.classList.add('card-back', 'cyan-glow');

        var dynamicCardFront = document.createElement('div');

        var dynamicCard = document.createElement('div');
        dynamicContainer.appendChild(dynamicCard);
        dynamicCard.classList.add("col-2", "hard-card", "col-s-3");
        dynamicCard.appendChild(dynamicCardBack);
        dynamicCard.appendChild(dynamicCardFront);
        dynamicCardFront.classList.add('hidden');
        dynamicCardFront.classList.add('card-front', startingCardLogosHardMode[i]);
    }
    for (var i = 0; i < 36; i++) {
        var cardFronts = document.querySelectorAll('.card-front');
        cardFronts[i].classList.remove('hidden');
        var cardBack = document.getElementsByClassName('card-back');
        cardBack[i].addEventListener('click', clickSound);
    }


}


function handleClick(event) {
    if (event.target.className.indexOf("card-back") === -1) {
        return;
    }
    var clickedElement = event.target;
    clickedElement.classList.add('hidden');
    clickedElement.nextElementSibling.classList.add('magenta-glow');

    if (!firstCardClicked) {
        firstCardClicked = clickedElement;
        firstCardClasses = firstCardClicked.nextElementSibling.className;
    } else {
        secondCardClicked = clickedElement;
        secondCardClasses = secondCardClicked.nextElementSibling.className;
        gameCards.removeEventListener('click', handleClick);
        if (firstCardClasses === secondCardClasses) {
            gameCards.addEventListener('click', handleClick);
            firstCardClicked = null;
            secondCardClicked = null;
            matches++;
            attempts++;
            displayStats();
            matchSound();
            if (modeSelected === "hardMode") {
                if (matches === 18) {
                    document.querySelector(".modal-container").classList.remove('hidden');
                }
            }
            if (modeSelected === "normal"){
                if (matches === 9) {
                    document.querySelector(".modal-container").classList.remove('hidden');
                }
            }
        } else {
            setTimeout(removeHidden, 1000);
        }
    }
}

function removeHidden() {
    firstCardClicked.classList.remove('hidden');
    firstCardClicked.nextSibling.classList.remove('magenta-glow');
    secondCardClicked.classList.remove('hidden');
    secondCardClicked.nextSibling.classList.remove('magenta-glow');
    firstCardClicked = null;
    secondCardClicked = null;
    gameCards.addEventListener('click', handleClick);
    attempts++;
    displayStats();
    if (matchingCard === null) {
        return;
    } else {
        matchingCard.previousElementSibling.classList.remove('hint-glow');
        matchingCard.previousElementSibling.classList.add('cyan-glow');
    }
}

function displayStats() {
    document.getElementById('gamesPlayed').textContent = gamesPlayed;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('accuracy').textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
    if (!attempts) {
        return "0%"
    }
    var accuracy = matches / attempts;
    return Math.trunc(accuracy * 100) + "%";


}

function resetGame() {
    matches = null;
    attempts = 0;
    gamesPlayed++;
    displayStats();
    resetCards();
    shuffleCards();
    resetHintCounter();
    var hideModal = document.getElementById('modalContainer');
    hideModal.classList.add('hidden');
}

function resetCards() {
    var hiddenCards = document.querySelectorAll('.card-back');
    for (var i = 0; i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden', 'hint-glow');
        hiddenCards[i].classList.add('cyan-glow');
    }
}

var button = document.getElementById('button');
button.addEventListener('click', resetGame);

function shuffleCards() {
    var allFrontCards = document.querySelectorAll('.card-front');
    var newClassArray = shuffleClasses();
    for (var i = 0; i < allFrontCards.length; i++) {
        allFrontCards[i].className = "null";
        allFrontCards[i].className = "card-front " + newClassArray[i];
    }
}

function shuffleCardsHardMode() {
    var allFrontCards = document.querySelectorAll('.card-front');
    var newClassArray = shuffleClassesHardMode();
    for (var i = 0; i < allFrontCards.length; i++) {
        allFrontCards[i].className = "null";
        allFrontCards[i].className = "card-front " + newClassArray[i];
    }
}

function shuffleClasses() {
    var logoClasses = ['css-logo',
        'docker-logo',
        'gitHub-logo',
        'html-logo',
        'js-logo',
        'mysql-logo',
        'node-logo',
        'php-logo',
        'react-logo',
        'css-logo',
        'docker-logo',
        'gitHub-logo',
        'html-logo',
        'js-logo',
        'mysql-logo',
        'node-logo',
        'php-logo',
        'react-logo']
    for (var i = 0; i < logoClasses.length; i++) {
        var randomization = Math.floor(Math.random() * logoClasses.length)
        var placeHolder = logoClasses[i];
        logoClasses[i] = logoClasses[randomization];
        logoClasses[randomization] = placeHolder;
    }
    return logoClasses;
}

function shuffleClassesHardMode() {
    var logoClasses = ['css-logo',
        'docker-logo',
        'gitHub-logo',
        'html-logo',
        'js-logo',
        'mysql-logo',
        'node-logo',
        'php-logo',
        'react-logo',
        'css-logo',
        'docker-logo',
        'gitHub-logo',
        'html-logo',
        'js-logo',
        'mysql-logo',
        'node-logo',
        'php-logo',
        'react-logo',
        'cow-logo',
        'banana-logo',
        'blue-lightning-logo',
        'comment-bubble-logo',
        'fireworks-logo',
        'glasses-logo',
        'hotdog-logo',
        'question-logo',
        'smileyface-logo',
        'cow-logo',
        'banana-logo',
        'blue-lightning-logo',
        'comment-bubble-logo',
        'fireworks-logo',
        'glasses-logo',
        'hotdog-logo',
        'question-logo',
        'smileyface-logo'
    ]
    for (var i = 0; i < logoClasses.length; i++) {
        var randomization = Math.floor(Math.random() * logoClasses.length)
        var placeHolder = logoClasses[i];
        logoClasses[i] = logoClasses[randomization];
        logoClasses[randomization] = placeHolder;
    }
    return logoClasses;
}

function hint() {
    if (firstCardClicked === null && hintCounter !== 0) {
        hintModal.classList.remove('hidden');
    } else if (hintCounter > 0 && firstCardClicked !== null) {
        hintCounter -= 1;
        var elHintCounter = document.getElementById('hintCounter');
        elHintCounter.textContent = hintCounter;
        var firstCardImage = firstCardClicked.nextElementSibling.classList[1];
        var firstCardImageGlow = firstCardClicked.nextElementSibling.classList[2];
        var allFrontCards = document.querySelectorAll('.card-front');
        for (var i = 0; i < allFrontCards.length; i++) {
            if (allFrontCards[i].classList[1] === firstCardImage && allFrontCards[i].classList[2] !== firstCardImageGlow) {
                matchingCard = allFrontCards[i];
                matchingCard.previousElementSibling.classList.remove('cyan-glow');
                matchingCard.previousElementSibling.classList.add('hint-glow');
            }
        }
    }
    hintDisable();
}

function closeHintModal() {
    hintModal.classList.add('hidden');
}

function hintDisable() {
    if (hintCounter === 0) {
        var hintContainer = document.getElementById('hintContainer');
        hintContainer.classList.add('hint-disabled');
    }
}


function resetHintCounter() {
    hintCounter = 3;
    var elHintCounter = document.getElementById('hintCounter');
    elHintCounter.textContent = hintCounter;
    var hintContainer = document.getElementById('hintContainer');
    hintContainer.classList.remove('hint-disabled');
}


var clickCardSound = new Audio();
function clickSound() {
    if (document.querySelector('.sound-fx-text').textContent === "Sound Effects: ON") {
        clickCardSound.play()
    }
}

var match = new Audio();
function matchSound() {
    match.play();
}

function soundFXToggle() {
    var soundFx = document.querySelector('.sound-fx-text');
    if (soundFx.textContent === "Sound Effects: ON") {
        soundFx.textContent = "Sound Effects: OFF";
        clickCardSound.removeAttribute('src');
        match.removeAttribute('src');
    } else if (soundFx.textContent === "Sound Effects: OFF") {
        soundFx.textContent = "Sound Effects: ON";
        clickCardSound.setAttribute("src", "./assets/sound/click.mp3");
        match.setAttribute('src', "./assets/sound/match.mp3");
    } else {
        return;
    }
}

function settingsToggle() {
    var settingModal = document.getElementById('settingsModal');
    if (settingModal.classList[1] === 'hidden') {
        settingModal.classList.remove('hidden');
    } else {
        settingModal.classList.add('hidden');
    }
}


function playAmbientMusic() {
    ambientMusic.play();
}

function pauseAmbientMusic() {
    ambientMusic.pause();
}

function bgMusicToggle() {
    var bgMusicEl = document.querySelector('.bg-music-text');
    if (bgMusicEl.textContent === "Background Music: ON") {
        bgMusicEl.textContent = "Background Music: OFF";
        pauseAmbientMusic()
    } else if (bgMusicEl.textContent === "Background Music: OFF") {
        bgMusicEl.textContent = "Background Music: ON";
        playAmbientMusic();
    } else {
        return;
    }
}

function removeAllCards() {
    var main = document.getElementById('gameCards');
    var cards = document.querySelectorAll('.card');
    for (var i = 0; i < cards.length; i++) {
        main.firstChild.remove();
    }
}
