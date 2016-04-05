
/**
 * Make a player class
 * add stuff to it and all
 *
 * then finish off file with module.exports = Player
 *
 *
 * other files can say var Player = require('./player.js')
 * and then interact with var myPlayer = new Player();
 */
var PlayerInputController = require('./playerInputController.js');

function Player(sprite)  {

    /**
     * This is a player in the game..it contains a pixi 
     * Sprite object along with handler for input for 
     * movement and such
     */
    this.sprite = sprite;
    this.velocityX = 0;
    this.velocityY = 0;
    this.keyboard = new PlayerInputController(
            {
                "left": 37,
                "up": 38,
                "right": 39,
                "down": 40,
                "respawn": 13,
                "rope": 16
            }
            );

    this.update = function() {
        this.sprite.x += this.keyboard.velocityX;
        this.sprite.y += this.keyboard.velocityY;
    }
}

module.exports = Player;
