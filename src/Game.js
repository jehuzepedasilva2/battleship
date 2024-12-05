import Player from "./Player";

// only plays against itself for now
function play() {
  let isPlayerOne = true;
  const playerOne = new Player();
  const playerTwo = new Player(false); // computer
  
  while (!playerOne.isWinner() && !playerTwo.isWinner()) {
    // Render the board here, integrate DOM changes later
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
      // Ask for coordinates from player one here, integrate DOM changes later;
    if (isPlayerOne && !playerOne.attack(x, y, playerTwo.getBoard())) {
      continue;
    }
    if (!isPlayerOne && !playerTwo.attack(parseInt(x), parseInt(y), playerOne.getBoard())) {
      continue;
    }
    isPlayerOne = !isPlayerOne;
  }  
  if (playerOne.isWinner()) {
    return 'Player One Wins!';
  } else {
    return 'Player Two Wins!';
  }
}

export default play;