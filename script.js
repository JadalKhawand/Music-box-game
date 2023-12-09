let userAndLevel = document.querySelector(".level");
let start = document.querySelector(".Start");
let username = document.querySelector("#user_entry");
let gameContainer = document.querySelector(".game-container");
let winning = document.querySelector(".winning")
const boxes = ["greenBox", "redBox", "yellowBox", "blueBox"];
let sequence = [];
let userClicks = [];
let level = 1
let yellowSound = document.getElementById("yellowSound")
let blueSound = document.getElementById("blueSound")
let greenSound = document.getElementById("greenSound")
let redSound = document.getElementById("redSound")
let losingSound = document.getElementById("losingSound")

let enterGame = document.querySelector(".enter");
enterGame.addEventListener("click", function () {
  document.querySelector("#UserModal").classList.add("hidden");
  generateUserAndLevel(username.value);
});
username.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    document.querySelector("#UserModal").classList.add("hidden");
    generateUserAndLevel(username.value,level);
  }
});

function generateWinningMessage() {
  winning.innerHTML = "";
  let win = `<h1 class="text-green">You won level ${level}</h1>`;
  winning.innerHTML += win;
  triggerConfetti()
  winning.style.display = "block"; 
  setTimeout(() => {
    winning.style.display = "none";
  }, 500);
}





generateUserAndLevel(username.value, level);
generateInactiveGame();

function generateUserAndLevel(usernameValue,level) {
  userAndLevel.innerHTML = "";
  let text = `
  <h1 class="text-3xl text-green-600">User: ${usernameValue} </h1>
  <h1 class="text-3xl text-green-600">Level: ${level}</h1>
  `;
  userAndLevel.innerHTML += text;
}
start.addEventListener("click", startGame);

function startGame() {
  generateActiveGame();
  updateGameMessage("...");
  generateHighlight()
  generateUserAndLevel(username.value, level);

}
function generateHighlight() {
  updateGameMessage(",,,");
  let lastBoxIndex = sequence.length - 1;
  let lastBox = lastBoxIndex >= 0 ? sequence[lastBoxIndex] : null;
  let newBox;

  do {
    const randomIndex = Math.floor(Math.random() * boxes.length);
    newBox = boxes[randomIndex];
  } while (newBox === lastBox);

  sequence.push(newBox);

  highlightBoxesInSequence(lastBoxIndex, level);
}


function generateActiveGame() {

  

  gameContainer.innerHTML = "";
  let game = `<div class="boxes flex flex-wrap flex-row gap-10 items-center justify-center">
  <div class="gridBox greenBox flex justify-center items-center mt-6">
    <div class="greenBox-inner">
      <h1>Green 0</h1>
    </div>

  </div>
  <div class="gridBox redBox flex justify-center items-center mt-6">

    <div class="redBox-inner">
      <h1>Red 1</h1>
    </div>
  </div>
  <div class="gridBox yellowBox flex justify-center items-center mb-6">

    <div class="yellowBox-inner">
      <h1>Yellow 2</h1>
    </div>

  </div>
  
  <div class="gridBox blueBox flex justify-center items-center mb-6">

    <div class="blueBox-inner">
      <h1>Blue 3</h1>
    </div>

  </div>
</div>`;
  gameContainer.innerHTML += game;
  boxes.forEach(boxType => {
    const element = document.querySelector(`.${boxType}`);
    element.addEventListener('click', () => handleBoxClick(boxType));
  });
}
function highlightBoxesInSequence(lastIndex, level) {
  index = lastIndex + 1
  
  if (index < level) {
    const boxType = sequence[index];
    const element = document.querySelector(`.${boxType}`);
    
    
    element.classList.add("highlighted");

    
    setTimeout(() => {
      element.classList.remove("highlighted");
      highlightBoxesInSequence(index, level);
    }, 1000);  
  } 
}

function highlightBox(boxType) {
  const element = document.querySelector(`.${boxType}`);
  element.classList.add("highlighted");
  setTimeout(() => {
    unhighlightBox(element);
  }, 500);
}
function unhighlightBox(boxType) {
  const element = document.querySelector(`.${boxType}`);
  element.classList.remove("highlighted");
}

function generateInactiveGame() {
  gameContainer.innerHTML = "";
  let game = `
  <div class="boxes flex flex-wrap flex-row gap-10 items-center justify-center">
  <div class=" flex justify-center items-center mt-6 w-36 h-36 rounded-3xl bg-black">
    <div class="greenBox-inner">
      <h1 class = "text-black">Green 0</h1>
    </div>

  </div>
  <div class=" flex justify-center items-center mt-6 w-36 h-36 rounded-3xl bg-black">

    <div class="redBox-inner">
      <h1 class = "text-black">Red 1</h1>
    </div>
  </div>
  <div class=" flex justify-center items-center mb-6 w-36 h-36 rounded-3xl bg-black">

    <div class="yellowBox-inner">
      <h1 class = "text-black">Yellow 2</h1>
    </div>

  </div>
  <div class=" flex justify-center items-center mb-6 w-36 h-36 rounded-3xl bg-black">

    <div class="blueBox-inner">
      <h1 class = "text-black">Blue 3</h1>
    </div>

  </div>
</div>`;

  gameContainer.innerHTML += game;
}

function updateGameMessage(message) {
  document.querySelector(".Start").innerHTML = message;
}

function handleBoxClick(boxType){

  if(boxType == "greenBox"){
    playGreenSound()
  }
  if(boxType == "yellowBox")
  {
    playYellowSound()
  }
  if(boxType == "redBox"){
    playRedSound()
  }
  if(boxType == "blueBox"){
    playBlueSound()
  }
  userClicks.push(boxType)
  checkUserInput()
}

function playYellowSound(){
  yellowSound.play()
}

function playBlueSound(){
  blueSound.play()
}
function playGreenSound(){
  greenSound.play()
}
function playRedSound(){
  redSound.play()
}

function playLosingSound(){
  losingSound.play()
}

function checkUserInput() {
  for (let i = 0; i < userClicks.length; i++) {
    if (userClicks[i] !== sequence[i]) {
    
      handleIncorrectMove();
      return; 
    }
  }

  // If the loop completes, the user's input matches the sequence
  if (userClicks.length === sequence.length) {
    handleCorrectSequence();
  }
}

function handleIncorrectMove(){
  playLosingSound()
  updateGameMessage("You lost try agin")
  level = 1;
  sequence = [];

  generateUserAndLevel(username.value, level);
  userClicks = [];
  setTimeout(generateHighlight,3000)
  

}





function handleCorrectSequence(){
  generateWinningMessage()
  level++
  generateUserAndLevel(username.value, level);
    userClicks = []; 
    setTimeout(generateHighlight,1000)
  
  }

  function triggerConfetti() {
    // Configure confetti options
    const config = {
      spread: 180,
      startVelocity: 40,
      elementCount: 5,
      dragFriction: 0.12,
      duration: 3000,
      stagger: 3,
      colors: ['#FFD700', '#FF4500', '#00FF00', '#1E90FF'],
      
    };
  
    // Trigger confetti explosion
    confetti(config);
  }