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
    secondCardClicked.classList.remove('hidden');
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
    var accuracy = matches / attempts;
    return Math.trunc(accuracy * 100) + "%";

}
