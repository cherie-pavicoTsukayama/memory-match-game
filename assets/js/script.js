var gameCards = document.getElementById('gameCards');
gameCards.addEventListener('click', handleClick);
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;
var maxMatches = 9;
var matches = 0;

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
            console.log(matches);
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

}
