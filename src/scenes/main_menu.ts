import { Button } from "../models/button";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  create(): void {
    // set the background
    let background = this.add.sprite(
      <number>this.game.config.width / 2,
      <number>this.game.config.height / 2,
      "candyland"
    );
    background.setDisplaySize(
      <number>this.game.config.width,
      <number>this.game.config.height
    );

    // add the start button
    let x_center: number =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    let y_center: number =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    let start_button = new Button(
      this,
      x_center,
      y_center,
      "#000000",
      "button_green",
      "Start",
      () => this.start_game()
    );
  }

  start_game(): void {
    this.scene.start("MainGame");
  }
}
