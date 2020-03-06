var dynamicContainer = document.createElement('main');
dynamicContainer.setAttribute('id', 'gameCards');
dynamicContainer.className = 'col-9';
document.querySelector('aside').insertAdjacentElement('afterend', dynamicContainer)
var startingCardLogos = shuffleClasses();

for(var i = 0; i < 18; i++){
    var dynamicCardBack = document.createElement('div');
    dynamicCardBack.classList.add('card-back');

    var dynamicCardFront = document.createElement('div');
    dynamicCardFront.classList.add('hidden', 'card-front', startingCardLogos[i]);

    var dynamicCard = document.createElement('div');
    dynamicCard.classList.add("col-2", "card");
    dynamicCard.appendChild(dynamicCardFront);
    dynamicCard.appendChild(dynamicCardBack);
    dynamicContainer.appendChild(dynamicCard);
    dynamicCardFront.classList.remove('hidden');


}

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



function handleClick(event){
    if(event.target.className.indexOf("card-back") === -1){
        return;
    }
    var clickedElement = event.target;
    clickedElement.classList.add('hidden');
    clickedElement.previousSibling.classList.add('magenta-glow');

    if (!firstCardClicked) {
        firstCardClicked = clickedElement;
        firstCardClasses = firstCardClicked.previousElementSibling.className;
    } else {
        secondCardClicked = clickedElement;
        secondCardClasses = secondCardClicked.previousElementSibling.className;
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
            setTimeout(removeHidden, 1500);
        }
    }
}

function removeHidden() {
    firstCardClicked.classList.remove('hidden');
    firstCardClicked.previousSibling.classList.remove('magenta-glow');
    secondCardClicked.classList.remove('hidden');
    secondCardClicked.previousSibling.classList.remove('magenta-glow');
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
