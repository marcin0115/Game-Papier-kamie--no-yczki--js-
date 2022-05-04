
const game = {
  playerHand: '',
  compHand: ''
}
const gameSummary = {
  games: 0,
  wins: 0,
  losses: 0,
  draws: 0,
}
const hands = document.querySelectorAll('.playerSelect img');

function handSelection() {
  game.playerHand = this.dataset.option;
  hands.forEach(hand=> hand.style.boxShadow = "");
  this.style.boxShadow = '0 0 0 5px red';
}

const compChoice = ()=> {
  return hands[Math.floor(Math.random()*3)].dataset.option;
}

const checkResult = (player, comp)=> {
  if(player===comp) return 'draw';
  else if((player==='papier' && comp==='kamień') || (player==='kamień' && comp==='nożyczki') || (player==='nożyczki' && comp==='papier')) return 'win';
  else return 'loss';
}

const publishResult = (player, comp, result)=> {
  document.querySelector(`[data-summary="your-choice"]`).textContent = player;
  document.querySelector(`[data-summary="comp-choice"]`).textContent = comp;
  document.querySelector('p.numbers span').textContent = ++gameSummary.games;

  if(result==='win') {
    document.querySelector(`[data-summary="who-win"]`).textContent = 'WYGRAŁEŚ :-)';
    document.querySelector(`[data-summary="who-win"]`).style.color = 'rgb(59, 194, 6)';
    document.querySelector('p.wins span').textContent = ++gameSummary.wins;
  }
  else if(result==='loss') {
    document.querySelector(`[data-summary="who-win"]`).textContent = 'PRZEGRAŁEŚ :(';
    document.querySelector(`[data-summary="who-win"]`).style.color = 'rgb(192, 5, 5)';
    document.querySelector('p.losses span').textContent = ++gameSummary.losses;
  } 
  else {
    document.querySelector(`[data-summary="who-win"]`).textContent = 'REMIS...';
    document.querySelector(`[data-summary="who-win"]`).style.color = 'purple';
    document.querySelector('p.draws span').textContent = ++gameSummary.draws;
  }
}

const endGame = ()=> {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
  game.playerHand = "";
}

const startGame = ()=> {
  if(!game.playerHand) return alert('Proszę wybrać dłoń!')
  
  game.compHand = compChoice();

  const gameResult = checkResult(game.playerHand, game.compHand);

  publishResult(game.playerHand, game.compHand, gameResult)

  endGame()
}

hands.forEach(hand=> hand.addEventListener('click', handSelection));
document.querySelector('.start').addEventListener('click', startGame);