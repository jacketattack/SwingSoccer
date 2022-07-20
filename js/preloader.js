export default class Preloader extends Phaser.Scene {
    constructor () {
        super('Preloader');
    }

    preload() {
        this.load.image('block', 'assets/sprites/poo.png');
        this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create() {
        this.scene.start('MainGame');
    }
}
