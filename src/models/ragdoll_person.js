export default class RagdollPerson extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "assets");

    this.setScale(Phaser.Math.FloatBetween(1, 2));
  }
}
