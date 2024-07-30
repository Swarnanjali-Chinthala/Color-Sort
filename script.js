// script.js

const levels = [
    { bottles: 5, moves: 15, time: 180 },
    { bottles: 6, moves: 18, time: 300 },
    { bottles: 7, moves: 23, time: 480 },
    { bottles: 8, moves: 27, time: 600 },
    { bottles: 9, moves: 35, time: 720 }
  ];
  
  let currentLevel = 0;
  let moves = 0;
  let score = 100;
  let timerInterval;
  let resetCount = 3;
  let selectedBottle = null;
  
  const bottlesContainer = document.getElementById('bottles-container');
  const moveCountElement = document.getElementById('move-count');
  const timerElement = document.getElementById('timer');
  const resetButton = document.getElementById('reset-button');
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  const restartButton = document.getElementById('restart-button');
  
  function startLevel(levelIndex) {
    moves = 0;
    moveCountElement.innerText = `Moves: ${moves}`;
    resetCount = 3;
    resetButton.innerText = `Reset (${resetCount})`;
    setupBottles(levels[levelIndex].bottles);
    startTimer(levels[levelIndex].time);
  }
  
  function setupBottles(count) {
    bottlesContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const bottle = document.createElement('div');
      bottle.classList.add('bottle');
      bottle.dataset.index = i;
      bottle.addEventListener('click', () => selectBottle(bottle));
      bottlesContainer.appendChild(bottle);
  
      // Add random liquids to the bottle
      const colors = ['red', 'blue', 'green']; // Add more colors as needed
      for (let j = 0; j < 3; j++) { // Assuming each bottle has 3 layers of liquid
        const liquid = document.createElement('div');
        liquid.classList.add('liquid', colors[Math.floor(Math.random() * colors.length)]);
        liquid.style.height = '33%';
        bottle.appendChild(liquid);
      }
    }
  }
  
  function startTimer(time) {
    clearInterval(timerInterval);
    let remainingTime = time;
    timerElement.innerText = `Time: ${formatTime(remainingTime)}`;
    timerInterval = setInterval(() => {
      remainingTime--;
      timerElement.innerText = `Time: ${formatTime(remainingTime)}`;
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        gameOver('Time is up! You lost.');
      }
    }, 1000);
  }
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
  function selectBottle(bottle) {
    if (selectedBottle === null) {
      selectedBottle = bottle;
      bottle.classList.add('selected');
    } else if (selectedBottle !== bottle) {
      if (canPour(selectedBottle, bottle)) {
        animateWaterTransfer(selectedBottle, bottle);
      }
      selectedBottle.classList.remove('selected');
      selectedBottle = null;
    }
  }
  
  function canPour(source, destination) {
    const sourceLiquids = Array.from(source.querySelectorAll('.liquid'));
    const destinationLiquids = Array.from(destination.querySelectorAll('.liquid'));
  
    if (sourceLiquids.length === 0) return false; // No liquid to pour
    if (destinationLiquids.length === 0) return true; // Empty destination bottle
  
    const topSourceColor = sourceLiquids[sourceLiquids.length - 1].classList[1];
    const topDestinationColor = destinationLiquids[destinationLiquids.length - 1].classList[1];
  
    return topSourceColor === topDestinationColor;
  }
  
 // script.js

// script.js

// script.js

// script.js

// script.js

// script.js

// script.js

// script.js

// script.js

// script.js

// script.js

// script.js

// script.js

// function animateWaterTransfer(source, destination) {
//     const sourceLiquids = Array.from(source.querySelectorAll('.liquid'));
//     const destinationLiquids = Array.from(destination.querySelectorAll('.liquid'));
//     const sourceTopColor = sourceLiquids[sourceLiquids.length - 1]?.classList[1];
//     const destinationTopColor = destinationLiquids[destinationLiquids.length - 1]?.classList[1];
//     const maxLiquidLayers = 3; // Maximum layers in a bottle
  
//     // Only proceed if there are liquids to pour
//     if (sourceLiquids.length === 0 || (destinationLiquids.length >= maxLiquidLayers && sourceTopColor !== destinationTopColor)) return;
  
//     // Calculate the movement distance
//     const sourceRect = source.getBoundingClientRect();
//     const destinationRect = destination.getBoundingClientRect();
  
//     // Calculate the exact movement needed
//     let moveX = destinationRect.left - sourceRect.left;
//     const moveY = destinationRect.top - sourceRect.top; // Vertical movement for floating
//     let bendAngle;
//     if(moveX<0){
//         moveX=moveX+90
//         bendAngle=-90
//     }else{
//         moveX=moveX-90
//         bendAngle=90
//     }
//     // Determine if the source bottle needs to bend
//     // const bendAngle = moveX < 0 ? -90 : 90;
  
//     // Set custom properties for the animation
//     source.style.setProperty('--move-x', `${moveX}px`);
//     source.style.setProperty('--move-y', `${moveY}px`);
//     source.style.setProperty('--bend-angle', `${bendAngle}deg`);
  
//     // Apply the animation class to the source bottle
//     source.classList.add('pouring');
  
//     // Create a pouring liquid element to simulate flow (hidden)
//     const pouringLiquid = document.createElement('div');
//     pouringLiquid.classList.add('liquid-flow', sourceTopColor);
//     pouringLiquid.style.backgroundColor = getComputedStyle(sourceLiquids[sourceLiquids.length - 1]).backgroundColor;
//     document.body.appendChild(pouringLiquid);
  
//     setTimeout(() => {
//       // Animate the pouring liquid element to simulate pouring
//       pouringLiquid.style.height = `${destinationRect.bottom - sourceRect.top}px`; // Full height of the bottle
//       pouringLiquid.style.left = `${destinationRect.left + destinationRect.width / 2}px`;
//       pouringLiquid.style.top = `${destinationRect.top + destinationRect.height / 2}px`;
  
//       // Transfer matching liquids from source to destination
//       let transferCount = 0;
//       while (
//         sourceLiquids.length > 0 &&
//         destinationLiquids.length < maxLiquidLayers &&
//         sourceTopColor === sourceLiquids[sourceLiquids.length - 1].classList[1]
//       ) {
//         const liquid = sourceLiquids.pop();
//         destination.appendChild(liquid);
//         destinationLiquids.push(liquid);
//         transferCount++;
//       }
  
//       // Remove the pouring liquid element and stop the pouring animation
//       setTimeout(() => {
//         pouringLiquid.remove();
//         source.classList.remove('pouring');
  
//         // Update the game state and check for win condition
//         moves++;
//         moveCountElement.innerText = `Moves: ${moves}`;
//         if (checkWinCondition()) {
//           nextLevelOrWin();
//         } else if (moves >= levels[currentLevel].moves) {
//           gameOver('No moves left! You lost.');
//         }
//       }, 500); // Adjust timing for smoother effect
//     }, 1000); // Wait for the movement animation to complete before starting the flow
//   }
  
  
  // script.js

function animateWaterTransfer(source, destination) {
    const sourceLiquids = Array.from(source.querySelectorAll('.liquid'));
    const destinationLiquids = Array.from(destination.querySelectorAll('.liquid'));
    const sourceTopColor = sourceLiquids[sourceLiquids.length - 1]?.classList[1];
    const destinationTopColor = destinationLiquids[destinationLiquids.length - 1]?.classList[1];
    const maxLiquidLayers = 3; // Maximum layers in a bottle
  
    // Only proceed if there are liquids to pour
    if (sourceLiquids.length === 0 || (destinationLiquids.length >= maxLiquidLayers && sourceTopColor !== destinationTopColor)) return;
  
    // Calculate the movement distance
    const sourceRect = source.getBoundingClientRect();
    const destinationRect = destination.getBoundingClientRect();
  
    // Calculate the exact movement needed
    const moveX = destinationRect.left - sourceRect.left + (destinationRect.width - sourceRect.width) / 2;
    const moveY = destinationRect.top - sourceRect.top;
  
    // Determine if the source bottle needs to bend
    const bendAngle = moveX < 0 ? -90 : 90;
  
    // Set custom properties for the animation
    source.style.setProperty('--move-x', `${moveX}px`);
    source.style.setProperty('--move-y', `${moveY}px`);
    source.style.setProperty('--bend-angle', `${bendAngle}deg`);
  
    // Apply the animation class to the source bottle
    source.classList.add('pouring');
  
    // Create a pouring liquid element to simulate flow
    const pouringLiquid = document.createElement('div');
    pouringLiquid.classList.add('liquid-flow');
    pouringLiquid.style.backgroundColor = getComputedStyle(sourceLiquids[sourceLiquids.length - 1]).backgroundColor;
    pouringLiquid.style.height = `${sourceRect.height}px`; // Set initial height
    document.body.appendChild(pouringLiquid);
  
    setTimeout(() => {
      // Position the pouring liquid element at the source bottle's top
      pouringLiquid.style.left = `${sourceRect.left + sourceRect.width / 2}px`;
      pouringLiquid.style.top = `${sourceRect.top}px`;
  
      // Animate the pouring liquid element to simulate pouring
      pouringLiquid.style.transform = `translate(${moveX}px, ${moveY}px)`;
      pouringLiquid.style.height = `${destinationRect.bottom - sourceRect.top}px`; // Full height of the bottle
  
      // Transfer matching liquids from source to destination
      let transferCount = 0;
      while (
        sourceLiquids.length > 0 &&
        destinationLiquids.length < maxLiquidLayers &&
        sourceTopColor === sourceLiquids[sourceLiquids.length - 1].classList[1]
      ) {
        const liquid = sourceLiquids.pop();
        destination.appendChild(liquid);
        destinationLiquids.push(liquid);
        transferCount++;
      }
  
      // Remove the pouring liquid element and stop the pouring animation
      setTimeout(() => {
        pouringLiquid.remove();
        source.classList.remove('pouring');
  
        // Update the game state and check for win condition
        moves++;
        moveCountElement.innerText = `Moves: ${moves}`;
        if (checkWinCondition()) {
          nextLevelOrWin();
        } else if (moves >= levels[currentLevel].moves) {
          gameOver('No moves left! You lost.');
        }
      }, 500); // Adjust timing for smoother effect
    }, 1000); // Wait for the movement animation to complete before starting the flow
  }
  
  
  
  
  
  
  
  
  function checkWinCondition() {
    const bottles = Array.from(bottlesContainer.querySelectorAll('.bottle'));
    return bottles.every(bottle => {
      const liquids = Array.from(bottle.querySelectorAll('.liquid'));
      if (liquids.length === 0) return true;
      const color = liquids[0].classList[1];
      return liquids.every(liquid => liquid.classList.contains(color));
    });
  }
  
  function nextLevelOrWin() {
    if (currentLevel < levels.length - 1) {
      currentLevel++;
      startLevel(currentLevel);
    } else {
      gameOver('Congratulations! You won the game!');
    }
  }
  
  function gameOver(message) {
    clearInterval(timerInterval);
    popupMessage.innerText = message;
    popup.classList.remove('hidden');
  }
  
  function resetLevel() {
    if (resetCount > 0) {
      resetCount--;
      resetButton.innerText = `Reset (${resetCount})`;
      score -= 5;
      startLevel(currentLevel);
    }
  }
  
  resetButton.addEventListener('click', resetLevel);
  restartButton.addEventListener('click', () => {
    popup.classList.add('hidden');
    currentLevel = 0;
    score = 100;
    startLevel(currentLevel);
  });
  
  startLevel(currentLevel);
  