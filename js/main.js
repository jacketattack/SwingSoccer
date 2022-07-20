import Preloader from './preloader.js';
import MainGame from './main_game.js';

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    backgroundColor: '#1b1464',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        // matter: {
        //     debug: true
        // }
    },
    scene: [Preloader, MainGame]
};

var game = new Phaser.Game(config);
