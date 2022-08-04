import Phaser from "phaser";

import { Preloader } from "./scenes/preloader";
import { MainMenu } from "./scenes/main_menu";
import { MainGame } from "./scenes/main_game";

const game_config: Phaser.Types.Core.GameConfig = {
  title: "Swing Soccer",
  version: "1.0",
  width: 800,
  height: 600,
  backgroundColor: "#1b1464",
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "phaser-example",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  parent: "game",
  physics: {
    default: "matter",
    // uncomment this to debug physic objects in game for local development
    // matter: {
    //     debug: true
    // }
  },
  scene: [Preloader, MainMenu, MainGame],
};

export default new Phaser.Game(game_config);
