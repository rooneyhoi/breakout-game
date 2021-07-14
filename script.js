// buttons
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

// Canvas settings
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Global variables
let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5

// Create ball object
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10, // radius of the ball
  speed: 4,
  dx: 4, // speed base on the X asis
  dy: -4 // speed base on the Y asis
}

// Create paddle object
const paddle = {
  x: canvas.width / 2 - 40, // because paddle width = 80
  y: canvas.height -20,
  w: 180,
  h: 10,
  speed: 8,
  dx: 0
}

// Create bricks object
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

// Create the bricks wall
const bricks = [];
for(let i = 0; i < brickRowCount; i++){
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++){
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = {x, y, ...brickInfo}; // using Spread operator
    // ctx.beginPath();
    // ctx.rect(x, y, brickInfo.w, brickInfo.h);
    // ctx.fillStyle = brickInfo.visible? '#0095dd' : 'transparent';
    // ctx.fill();
    // ctx.closePath();
  }
}

// Draw the bricks wall
function drawBricks(){
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);      
      ctx.fillStyle = brick.visible ? '#964B00' : 'transparent';
      ctx.fill();
      ctx.closePath();
      // console.log(brick.x, brick.y, brick.w, brick.h, brick.visible); -> for debug
    })
  })
}

console.log(bricks);

// Draw the ball on canvas
function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI *2, true);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw the paddle on canvas
function drawPaddle(){
  ctx.beginPath();
  ctx.rect (paddle.x, paddle.y, paddle.w, paddle.h)
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Put the score label to the top-right corner
function drawScore(){
  ctx.font = '16px Arial';
  ctx.fillStyle = "#6a0dad"
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Move the ball on canvas
function moveBall(){
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Detect the canvas wall collision (right and left side)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
    ball.dx *= -1; // ball.dx = ball.dx * -1 (this is to go back)
  }

  // Detect the canvas wall collision (top and bottom side)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
    ball.dy *= -1; // ball.dx = ball.dx * -1 (this is to go back)
  }
  
  // Detect if the ball hit the paddle
  if (
      ball.x - ball.size > paddle.x && 
      ball.x + ball.size < paddle.x + paddle.w && 
      ball.y + ball.size > paddle.y){
    ball.dy = -ball.speed;
    // ball.dy *= -1; // ball.dx = ball.dx * -1 (this is to go back but -1 instead of -8)
    console.log (ball.x - ball.size, ball.x + ball.size, ball.y + ball.size);
    console.log (paddle.x, paddle.x + paddle.w, paddle.y);
    
  }
  
  // Detect if the ball hit the bricks
  bricks.forEach(column => {
    column.forEach(brick => {
      if(brick.visible){
        if(
          ball.x - ball.size > brick.x && // left side of the brick
          ball.x + ball.size < brick.x + brick.w && // right side of the brick
          ball.y + ball.size > brick.y && // top of the brick
          ball.y - ball.size < brick.y + brick.h // bottom of the brick
        ){
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    })
  })

  // Detect if the ball hit the bottom of the canvas - game over & restart
  // Remember the canvas's drawing is start from the top
  if (ball.y + ball.size > canvas.height) {
    alert("GAME OVER, RESTART!");
    score = 0;
    showAllBricks();
    paddle.w = 180;
  }
}

// Increse the point, each brick equals 1 point
function increaseScore(){
  score++;

  // Challenge the player by reducing the paddle size
  if (score >= 20){
    paddle.w = 80;
  }

  // If all bricks are broken, the show all the bricks again
  if(score % (brickRowCount * brickColumnCount) === 0){
    showAllBricks(); 
  }
}

// Reset all bricks visible again
function showAllBricks(){
  bricks.forEach(column => {
    column.forEach(brick => {brick.visible = true;}
    )
  })
}

// Move paddle inside the canvas
function movePaddle(){
  paddle.x += paddle.dx;

  // Check if hit the right corner of the canvas
  if (paddle.x + paddle.w >= canvas.width){
    paddle.x = canvas.width - paddle.w - 1;
  }

  // Check if the paddle hit the left corner of the canvas
  if (paddle.x < 1){
    paddle.x = 1;
  }
}

// Check if the player presses Arrow Left of Right
function keyUp(e){
  console.log(e.key);
  if (e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft'){
    paddle.dx = 0;
  }
}

// Check if the player stops using button Arrow Left or Right
function keyDown(e){
  console.log(e.key);
  if (e.key === 'Right' || e.key === 'ArrowRight'){
    paddle.dx = paddle.speed;
    console.log (paddle.dx);
  } else if (e.key === 'Left' || e.key === 'ArrowLeft'){
    paddle.dx = -paddle.speed;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
      paddle.x = relativeX - paddle.w/2;
  }
}

// Draw all the basic things
function draw(){
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Init and draw the objects
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Update canvas drawing and adding animation
function update(){

  // update the movement of the paddle and the ball
  movePaddle();
  moveBall();

  // Draw everything at the start
  draw();

  // Tells the browser that to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
  requestAnimationFrame(update);
}

// Call the conutious update fuction draw the frame
update();

// Handle keyboard event
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);

// Adding the mouse
document.addEventListener("mousemove", mouseMoveHandler, false);

// Rules and close button event handlers 
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));