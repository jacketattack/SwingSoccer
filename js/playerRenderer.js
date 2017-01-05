var Player = require('./player.js');

/**
 * Handles drawing a player object (including the rope) to the Pixi js stage.
 *
 */
function PlayerRenderer(imageFileName, stage) {

    // TODO: Refactor to not use global this.* variables as much

    this.stage = stage;
    // Create playerSprite & send to stage
    var texture = PIXI.Texture.fromImage(imageFileName);
    this.playerSprite = new PIXI.Sprite(texture);
    this.playerSprite.anchor.x = 0.5;
    this.playerSprite.anchor.y = 0.5;
    this.playerSprite.position.x = 500;
    this.playerSprite.position.y = 300;
    this.stage.addChild(this.playerSprite);

    // Create Player() object to represent underlying logic
    this.player = new Player();

    // Create line to display the rope on pixi stage
    this.ropeGraphic = new PIXI.Graphics();
 
    this.update = function() {
        this.applyVelocityFromUserInput();
        this.applyGravity();
        this.wallDetection();
        this.renderRope();
    }

    this.applyVelocityFromUserInput = function() {
        if (this.ropeOnStage()) {
            this.playerSprite.x += this.player.velocityX();
            this.playerSprite.y += this.player.velocityY();
        }
    }

    this.applyGravity = function() {
        if (this.ropeOnStage()) {
            this.gravityVelocity = 0;
        } else {
            this.gravityVelocity += 0.5;
        }
        this.playerSprite.y += this.gravityVelocity;
    }

    // TODO: Replace 20 w/ actual height/width of sprite
    this.wallDetection = function() {
        if (this.playerSprite.y >= document.GAME_HEIGHT - 20) {
            this.playerSprite.y = document.GAME_HEIGHT - 20;
        } else if (this.playerSprite.y <= 20) {
            this.playerSprite.y = 20;
        }
    }

    this.startRopePosition = [];
    this.renderRope = function() {
        if (this.player.ropeActive()) {
            if (this.startRopePosition.length == 0) {
                this.startRopePosition = [this.playerSprite.x, 0];
            }
            this.ropeGraphic.clear()
            this.ropeGraphic.moveTo(this.startRopePosition[0], this.startRopePosition[1]);
            this.ropeGraphic.lineStyle(2, 0xFFFFFF, 1);
            this.ropeGraphic.lineTo(this.playerSprite.x, this.playerSprite.y);

            if (!this.ropeOnStage()) {
                this.addUpdatedRopeToStage();
            }
        } else if (!this.player.ropeActive() && this.ropeOnStage()) {
            this.startRopePosition = [];
            stage.removeChild(this.ropeGraphic);
        }
    }

    this.ropeOnStage = function() {
        try {
            var childIndex = this.stage.getChildIndex(this.ropeGraphic);
            return true;
        } catch (err) {
            return false;
        }
    }

    this.addUpdatedRopeToStage = function() {
        this.stage.addChild(this.ropeGraphic);
    }

}

module.exports = PlayerRenderer;
