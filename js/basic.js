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

// keyboard control 
var leftArrowCode = 37;
var rightArrowCode = 39;
var upArrowCode = 38;
var downArrowCode = 40;

var bunnyVelocityX = 0;
var bunnyVelocityY = 0;

bunnyLeftArrowHandler = keyboard(leftArrowCode);
bunnyLeftArrowHandler.press = function() {
    console.log("left pressed");
    bunnyVelocityX = -2;
}
bunnyLeftArrowHandler.release = function() {
    console.log("left released!");
    if (!bunnyRightArrowHandler.isDown) {
        bunnyVelocityX = 0;
    }
}

bunnyRightArrowHandler = keyboard(rightArrowCode);
bunnyRightArrowHandler.press = function() {
    bunnyVelocityX = 2;
}
bunnyRightArrowHandler.release = function() {
    if (!bunnyLeftArrowHandler.isDown) {
        bunnyVelocityX = 0;
    }
}

bunnyUpArrowHandler = keyboard(upArrowCode);
bunnyUpArrowHandler.press = function() {
    bunnyVelocityY = -2;
}
bunnyUpArrowHandler.release = function() {
    if (!bunnyDownArrowHandler.isDown) {
        bunnyVelocityY = 0;
    }
}

bunnyDownArrowHandler = keyboard(downArrowCode);
bunnyDownArrowHandler.press = function() {
    bunnyVelocityY = 2;
}
bunnyDownArrowHandler.release = function() {
    if (!bunnyUpArrowHandler.isDown) {
        bunnyVelocityY = 0;
    }
}

stage.addChild(bunny);

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    bunny.rotation += 0.1;
    bunny.x += bunnyVelocityX;
    bunny.y += bunnyVelocityY;
    handleWalls();

    // render the container
    renderer.render(stage);
}

function handleWalls() {
    if (bunny.x > GAME_WIDTH - 5) {
        bunny.x = GAME_WIDTH - 5;
    }
    if (bunny.x < 5) {
        bunny.x = 5;
    }
    if (bunny.y > GAME_HEIGHT - 5) {
        bunny.y = GAME_HEIGHT - 5;
    }
    if (bunny.y < 5) {
        bunny.y = 5;
    }
}

// key left = 37
//up = 38
// right = 39
// down = 40

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = function(event) {
        if (event.keyCode == key.code) {
            if (key.isUp && key.press) {
                key.press();
            }
                key.isUp = false;
                key.isDown = true;
        }
        event.preventDefault();
    };

    key.upHandler = function(event) {
        if (event.keyCode == key.code) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isUp = true;
            key.isDown = false;
        }
        event.preventDefault();
    }

    window.addEventListener(
            'keydown', key.downHandler.bind(key), false
    );

    window.addEventListener(
            'keyup', key.upHandler.bind(key), false
    );
    return key;
}
