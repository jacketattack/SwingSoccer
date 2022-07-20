export default class MainMenu extends Phaser.Scene {
    constructor () {
        super('MainMenu');
    }

    create() {
        this.set_background();

        // TODO: add a "start" button that invokes the start_game() method
    }

    start_game() {
        this.scene.start('MainGame');
    }

    set_background() {
        let background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'candyland');
        let scaleX = this.cameras.main.width / background.width
        let scaleY = this.cameras.main.height / background.height
        let scale = Math.max(scaleX, scaleY)
        background.setScale(scale).setScrollFactor(0)
    }
}