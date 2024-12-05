import Player from "./Player";
import { renderYourBoard } from "./renderDOM";

// only plays against itself for now
function play() {
  let isPlayerOne = true;
  const playerOne = new Player();
  const playerTwo = new Player(false); // computer

  renderYourBoard(playerOne);
  playerTwo.attack(2, 0, playerOne.getGameboard());
  renderYourBoard(playerOne);

  if (true) {
    return;
  }
  
  while (!playerOne.isWinner() && !playerTwo.isWinner()) {
    // Render the board here, integrate DOM changes later
    if (isPlayerOne) {
      renderBoard(playerOne);
    }
    // } else {
    //   renderBoard(playerTwo);
    // }

    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
      // Ask for coordinates from player one here, integrate DOM changes later;
    if (isPlayerOne && !playerOne.attack(x, y, playerTwo.getGameboard())) {
      continue;
    }
    if (!isPlayerOne && !playerTwo.attack(x, y, playerOne.getGameboard())) {
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