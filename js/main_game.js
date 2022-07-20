export default class MainGame extends Phaser.Scene {
    constructor () {
        super('MainGame');

        this.poo;
        this.cursors;
    }

    create() {
        this.poo = this.matter.add.image(400, 50, 'block', null, { ignoreGravity: true });
        this.poo.setFixedRotation();
        this.poo.setMass(500);
    
        let y = 150;
        let prev = this.poo;
    
        for (let i = 0; i < 12; i++) {
            let ball = this.matter.add.image(400, y, 'ball', null, { shape: 'circle', mass: 0.1 });
            this.matter.add.joint(prev, ball, (i === 0) ? 90 : 35, 0.4);
            prev = ball;
            y += 18;
        }
    
        this.matter.add.mouseSpring();
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.poo.setVelocityX(-20);
        } else if (this.cursors.right.isDown) {
            this.poo.setVelocityX(20);
        } else {
            this.poo.setVelocityX(0);
        }
    
        if (this.cursors.up.isDown) {
            this.poo.setVelocityY(-20);
        } else if (this.cursors.down.isDown) {
            this.poo.setVelocityY(20);
        } else {
            this.poo.setVelocityY(0);
        }
    }
}