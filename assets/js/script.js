var dynamicContainer = document.createElement('main');
document.querySelector('aside').insertAdjacentElement('afterend', dynamicContainer)
dynamicContainer.setAttribute('id', 'gameCards');
var gameCards = document.getElementById('gameCards');
gameCards.addEventListener('click', handleClick);
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var maxMatches = 9;
var matches = null;
var attempts = 0;
var gamesPlayed = 0;


dynamicContainer.className = 'col-9';
var startingCardLogos = shuffleClasses();

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
}


function handleClick(event){
    if(event.target.className.indexOf("card-back") === -1){
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
        if (firstCardClasses === secondCardClasses){
            gameCards.addEventListener('click', handleClick);
            firstCardClicked = null;
            secondCardClicked = null;
            matches++;
            attempts++;
            displayStats();
            if(matches === maxMatches){
                document.querySelector(".modal-container").classList.remove('hidden');
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
}

function displayStats(){
    document.getElementById('gamesPlayed').textContent = gamesPlayed;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('accuracy').textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches){
    if(!attempts){
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
    var hideModal = document.getElementById('modalContainer');
    hideModal.classList.add('hidden');
}

function resetCards() {
    var hiddenCards = document.querySelectorAll('.card-back');
    for(var i = 0; i < hiddenCards.length; i++){
        hiddenCards[i].classList.remove('hidden');
    }
}

var button = document.getElementById('button');
button.addEventListener('click', resetGame);

function shuffleCards() {
    var allFrontCards = document.querySelectorAll('.card-front');
    var newClassArray = shuffleClasses();
    for(var i = 0; i < allFrontCards.length; i++){
        allFrontCards[i].className = "null";
        allFrontCards[i].className = "card-front " + newClassArray[i];
    }
}

function shuffleClasses(){
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

function hint(){
    firstCardClicked.classList
}
