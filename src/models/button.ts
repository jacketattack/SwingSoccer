export class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, fontColor, button_image, text, callback) {
      super(scene);

      const button = scene.add.image(0, 0, button_image).setOrigin(0.5).setInteractive();
      const buttonText = scene.add.text(0, 0, text, {
        fontSize: "28px",
        color: fontColor,
      }).setOrigin(0.5);
      Phaser.Display.Align.In.Center(buttonText, button);

      scene.add.container(x, y, [button, buttonText])
  
      button.on("pointerdown", () => {
        callback();
      });

      button.on("pointerover", function () {
        let size_factor = 1.05
        button.setDisplaySize(button.width * size_factor, button.height * size_factor)
        buttonText.setDisplaySize(buttonText.width * size_factor, buttonText.height * size_factor)
      });
  
      button.on("pointerout", function () {
        button.setDisplaySize(button.width, button.height)
        buttonText.setDisplaySize(buttonText.width, buttonText.height)
      });
  
      scene.add.existing(this);
    }
  }