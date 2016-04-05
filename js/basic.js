var Player = require('./player.js');
var GAME_WIDTH = 1000;
var GAME_HEIGHT = 600;

var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('bunny.png');

// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprite's anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite to the center of the screen
bunny.position.x = 500;
bunny.position.y = 300;
stage.addChild(bunny);

var player1 = new Player(bunny);

var bunnyVelocityX = 0;
var bunnyVelocityY = 0;

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    bunny.rotation += 0.1;
    player1.update();

    // render the container
    renderer.render(stage);
}

// key left = 37
//up = 38
// right = 39
// down = 40
