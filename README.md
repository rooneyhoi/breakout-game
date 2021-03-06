# breakout-game
What we need to prepare for the Javascript game?
- Create the Canvas and draw on it
- Move the ball
- Bounce off the walls
- Paddle and keyboard controls
- Game over
- Build the brick field
- Collision detection
- Track the score and win
- Mouse controls ??
- Finishing up

Ref: https://developer.mozilla.org/en-US/docs/Games 

Game plan (note for Binh)
1. Create a canvas context (2D or 3D)
2. Create and draw a ball (to break the bricks)
3. Create and draw the paddle to handle the ball and shoot it to the bricks wall
4. Create and draw bricks and wall of bricks
5. Draw the score (maybe inside the canvas)
6. Add animation to the game / requestAnimationFrame(callback) -> basically we keep painting the object

7. Move the paddle with the keyboard
8. Handle the keyboard
9. Move the ball (re-draw...)
10. Add wall bounderies
11. Increase points /score when bricks are being broken
12. Lose - redraw the bricks AND reset the points / score 

Key concepts

** Defining a drawing loop **
To keep constantly updating the canvas drawing on each frame, we need to define a drawing function that will run over and over again, with a different set of variable values each time to change sprite positions, etc. You can run a function over and over again using a JavaScript timing function such as 
setInterval()  
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval

or requestAnimationFrame()
https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame 


** Making a move **
Using dx, dy as preset, and constantly update x, y value in the drawing loop above

** Clear the canvas before each frame **
We're painting a new circle on every frame without removing the previous one. here's a method to clear canvas content: clearRect().
ctx.clearRect(0, 0, canvas.width, canvas.height);
