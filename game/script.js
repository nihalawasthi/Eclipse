const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');

let isJumping = false;
let isAttacking = false;

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'ArrowLeft':
    case 'KeyA':
      movePlayer('left');
      break;
    case 'ArrowRight':
    case 'KeyD':
      movePlayer('right');
      break;
    case 'Space':
    case 'ArrowUp':
      if (!isJumping) {
        isJumping = true;
        jumpPlayer();
      }
      break;
    default:
      break;
  }
});

gameContainer.addEventListener('mousedown', (event) => {
    if (event.button === 0 && !isAttacking) {
      isAttacking = true;
      attack();
    }
  });

function movePlayer(direction) {
  const currentPosition = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
  const step = 50;
  const newPosition = direction === 'left' ? currentPosition - step : currentPosition + step;
  
  player.style.left = `${newPosition}px`;
}

function jumpPlayer() {
  let count = 0;
  const jumpInterval = setInterval(() => {
    const maxHeight = 100;
    const jumpHeight = 50;

    if (count >= maxHeight) {
      clearInterval(jumpInterval);
      let descendInterval = setInterval(() => {
        if (count <= 0) {
          clearInterval(descendInterval);
          isJumping = false;
        } else {
          count -= 10;
          player.style.bottom = `${count}px`;
        }
      }, 25);
    } else {
      count += jumpHeight;
      player.style.bottom = `${count}px`;
    }
  }, 25);
}

function attack() {
  setTimeout(() => {
    isAttacking = false;
  }, 1000);
}
