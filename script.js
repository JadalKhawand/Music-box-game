let userAndLevel = document.querySelector(".level");
let start = document.querySelector(".Start");
let username = document.querySelector("#user_entry");
let gameContainer = document.querySelector(".game-container");
let correctClicks = [];
let userClicks = [];
username.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    document.querySelector("#UserModal").classList.add("hidden");
    generateUserAndLevel(username.value);
  }
});
generateUserAndLevel();
generateInactiveGame();

function generateUserAndLevel(usernameValue) {
  userAndLevel.innerHTML = "";
  let text = `
  <h1 class="text-3xl">User: ${usernameValue} </h1>
  <h1 class="text-3xl">Level: NA</h1>
  `;
  userAndLevel.innerHTML += text;
}
start.addEventListener("click", startGame);

function startGame() {
  generateActiveGame();
}
function generateActiveGame() {
  gameContainer.innerHTML = "";
  let game = `<div class="boxes flex flex-wrap flex-row gap-10 items-center justify-center">
  <div class="greenBox flex justify-center items-center mt-6">
    <div class="greenBox-inner">
      <h1>Green 0</h1>
    </div>

  </div>
  <div class="redBox flex justify-center items-center mt-6">

    <div class="redBox-inner">
      <h1>Red 1</h1>
    </div>
  </div>
  <div class="yellowBox flex justify-center items-center mb-6">

    <div class="yellowBox-inner">
      <h1>Yellow 2</h1>
    </div>

  </div>
  <div class="blueBox flex justify-center items-center mb-6">

    <div class="blueBox-inner">
      <h1>Blue 3</h1>
    </div>

  </div>
</div>`;
  gameContainer.innerHTML += game;
}
function generateInactiveGame(){
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
