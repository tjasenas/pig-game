
const playerSide1 = document.querySelector('.player--0');
const playerSide2 = document.querySelector('.player--1');
const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
const playerCurrent1 = document.querySelector('#current--0');
const playerCurrent2 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const results = document.querySelector('.results');


// Select buttons
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

let scores, currentScore, activePlayer, playing;
let totalGames = 0;

const init  = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scorePlayer1.textContent = 0; 
    scorePlayer2.textContent = 0; 
    playerCurrent1.textContent = 0; 
    playerCurrent2.textContent = 0; 

    dice.classList.add('hidden');
    playerSide1.classList.remove('player--winner');
    playerSide2.classList.remove('player--winner');
    playerSide1.classList.add('player--active');
    playerSide2.classList.remove('player--active');

    if(totalGames === 0) {
        results.innerHTML = '<div class="no-results">No games played yet.</div>';
    }
}
init();

const switchPlayer = function() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerSide1.classList.toggle('player--active');
    playerSide2.classList.toggle('player--active');
}

const addToHistory = function(winner, gamesScores) {
    totalGames++;
    const noResults = document.querySelector('.no-results');
    if(noResults) noResults.remove();
    
    const winnerPlayer1 = winner === 'Player-0' ? '<strong>Player-1</strong>': 'Player-1';
    const winnerPlayer2 = winner === 'Player-1' ? '<strong>Player-2</strong>': 'Player-2';

    const html = `<div class="row">${totalGames}. (${winnerPlayer1} - ${winnerPlayer2})
        ( ${gamesScores[0]} - ${gamesScores[1]} )</div>`;
    results.insertAdjacentHTML('beforeend', html);
}

rollDice.addEventListener('click', function() {
    if(!playing) return;
    const random = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `images/dice-${random}.png`;

    if( random !== 1 ) {
        currentScore += random;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
});

hold.addEventListener('click', function() {
    if(!playing) return;

    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    if( scores[activePlayer] >= 100 ) {
        playing = false;
        dice.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        addToHistory(`Player-${activePlayer}`, scores );

    } else {
        switchPlayer();
    }
});

newGame.addEventListener('click', function() {
    init();
});




