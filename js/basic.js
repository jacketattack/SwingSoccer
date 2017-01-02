var PlayerRenderer = require('./playerRenderer.js');
var GAME_WIDTH = 1000;
var GAME_HEIGHT = 600;

var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var player1Renderer = new PlayerRenderer('bunny.png', stage);

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    player1Renderer.update();

    // render the container
    renderer.render(stage);
}
