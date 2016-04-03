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

class Player {

    /**
     * This is a player in the game..it contains a pixi 
     * Sprite object along with handler for input for 
     * movement and such
     */
    constructor(config) {
        this.sprite = config.sprite;
        this.input = config.input;
    }
}

module.exports = Player;
