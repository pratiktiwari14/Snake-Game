// constants and variables.
let inpurDir= {x: 0, y: 0};
const foodSound= new Audio('sounds/food.mp3');
const gameOverSound=new Audio('sounds/die.mp3');
const moveSound= new Audio('sounds/move.mp3');
const musicSound=new Audio('sounds/Theme-song.mp3');

let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr = [
  {x:9, y:9}
];
food={x:6, y:7};


// Game Functions.
function main (ctime){
  window.requestAnimationFrame(main);
  console.log(ctime);
  if( (ctime - lastPaintTime)/1000 < 1/speed) {
      return;
  }
  lastPaintTime= ctime;
  gameEngine();
}

function isCollide(snake){
// If you bump into yourself.
  for(let i=1;i<snakeArr.length;i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
}
// If you bump into the wall.
  if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
      return true;
    }
    return false;
}

// High score reset button
function reset(event){
  localStorage.clear();
  window.location.reload("Refresh");
}
const btn = document.querySelector('.btn');
btn.addEventListener('click', reset);


function gameEngine(){
  // Part 1: Updating the Snake Array and food.
    if(isCollide(snakeArr)){
      musicSound.pause();
      gameOverSound.play();
      inpurDir = {x:0, y:0};
      alert("Game Over. Press ENTER to Play again");

      snakeArr= [{x:9, y:9}];
      musicSound.play();
      score=0;
    }

// If you have eaten the food, increment the score and regenerate the food.
  if(snakeArr[0].y=== food.y && snakeArr[0].x=== food.x){
    foodSound.play();
    score += 1;
    if(score > highScoreVal){
      highScoreVal = score;
      localStorage.setItem("highScore", JSON.stringify(highScoreVal));
      highScoreBox.innerHTML = "High Score: " + highScoreVal;
    }
    scoreBox.innerHTML= "score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y });
    let a=2;
    let b=16;
    food= {x: Math.round(a+ (b-a)*Math.random()) , y:Math.round(a+ (b-a)*Math.random()) }
  }

  // Moving the Snake.
  for(let i= snakeArr.length-2 ; i>=0 ; i--){
    snakeArr[i+1] = {...snakeArr[i]};
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;



  // Part 2: Display the snake and food.
// Display the snake.
  board.innerHTML = "";
  snakeArr.forEach((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index===0){
        snakeElement.classList.add('head');
    }
    else{
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });

// Display the food.
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}


// Main Logic Starts Here.
let highScore = localStorage.getItem("highScore");
if(highScore === null){
  highScoreVal = 0;
  localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else{
  highScoreVal = JSON.parse(highScore);
  highScoreBox.innerHTML = "High Score: " + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
  inputDir = {x:0, y:1}  // start the game.
  moveSound.play();
  musicSound.play();
switch (e.key){
  case "ArrowUp":
    console.log("ArrowUp")
    inputDir.x= 0;
    inputDir.y= -1;
    break;

    case "ArrowDown":
      console.log("ArrowUp")
      inputDir.x= 0;
      inputDir.y= 1;
      break;

    case "ArrowLeft":
        console.log("ArrowUp")
        inputDir.x= -1;
        inputDir.y= 0;
        break;

    case "ArrowRight":
          console.log("ArrowUp")
          inputDir.x= 1;
          inputDir.y= 0;
          break;

    default:
          break;
}

});
