#Side scroller in Canvas

This is a small asteroids-like game I made to learn about HTML5 Canvas and the rendering loop. It only uses Lodash and JQuery for some helper functions.

**Game.js** is the main game engine. It houses all the models and runs the main update/draw loop which calls the update and draw functions of all the models. It also runs collision detection on every loop and removes objects that collide.

**BackgroundEngine.js** runs the background rendering. It uses a 2000px length png background image and shifts it a little every loop. To maintain continuity, 2 identical images are used and rendered side-by-side when one image runs off the canvas.

**Player.js** contains the class for player models. It exposes an update function that changes player position or spawns projectiles based on the keyboard state. It also exposes a draw function for rendering the player position.

**Enemy.js** is similar to Player.js, but it lacks keyboard input logic and contains RNG based projectile spawns and position changes.

**Projectile.js** is a class for spawning projectile objects.