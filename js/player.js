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

function Player()  {

    this.velocityX = function() {
        return this.keyboard.velocityX;
    }

    this.velocityY = function() {
        return this.keyboard.velocityY;
    }

    this.ropeActive = function() {
        return this.keyboard.ropeActive;
    }

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
    }
}

module.exports = Player;
