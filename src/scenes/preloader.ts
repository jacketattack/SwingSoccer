export class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: "Preloader" });
  }

  preload(): void {
    // backgrounds
    this.load.image("candyland", "../assets/backgrounds/candyland.png");

    // sprites
    this.load.image("block", "../assets/sprites/poo.png");
    this.load.image("ball", "../assets/sprites/shinyball.png");

    // buttons
    this.load.image("button_green", "../assets/sprites/button_green.png");
    this.load.image("button_red", "../assets/sprites/button_red.png");
    this.load.image("button_teal", "../assets/sprites/button_teal.png");
  }

  create(): void {
    this.scene.start("MainMenu");
  }
}
