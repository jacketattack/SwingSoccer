var Keyboard = require("./keyboard.js");

function PlayerInputController(config) {

    this.velocityX = 0;
    this.velocityY = 0;
    this.ropeActive = false;
    this.upKey = config.up;
    this.downKey = config.down;
    this.leftKey = config.left;
    this.rightKey = config.right;
    this.ropeKey = config.rope;
    //this.respawn = {};

    this.press = function(keyCode) {
        switch (keyCode) {
            case this.upKey:
                this.upPress();
                break;
            case this.downKey:
                this.downPress();
                break;
            case this.leftKey:
                this.leftPress();
                break;
            case this.rightKey:
                this.rightPress();
                break;
            case this.ropeKey:
                this.ropePress();
                break;
        }
    }

    this.release = function(keyCode) {
        switch (keyCode) {
            case this.upKey:
                this.upRelease();
                break;
            case this.downKey:
                this.downRelease();
                break;
            case this.leftKey:
                this.leftRelease();
                break;
            case this.rightKey:
                this.rightRelease();
                break;
            case this.ropeKey:
                this.ropeRelease();
                break;
        }
    }

    this.upPress = function() {
        this.velocityY = -2;
    }

    this.upRelease = function() {
        if (!this.down.keyIsDown) {
            this.velocityY = 0;
        }
    }

    this.downPress = function() {
        this.velocityY = 2;
    }

    this.downRelease = function() {
        if (!this.up.keyIsDown) {
            this.velocityY = 0;
        }
    }

    this.leftPress = function() {
        this.velocityX = -2;
    }

    this.leftRelease = function() {
        if (!this.right.keyIsDown) {
            this.velocityX = 0;
        }
    }

    this.rightPress = function() {
        this.velocityX = 2;
    }

    this.rightRelease = function() {
        if (!this.left.keyIsDown) {
            this.velocityX = 0;
        }
    }

    this.ropePress = function() {
        // do i need to do anything?
    }

    this.ropeRelease = function() {
        this.ropeActive = !this.ropeActive;
    }

    this.up = new Keyboard(config.up, this);
    this.down = new Keyboard(config.down, this);
    this.left = new Keyboard(config.left, this);
    this.right = new Keyboard(config.right, this);
    this.rope = new Keyboard(config.rope, this);
    //this.respawn = new Keyboard(config.respawn, this.respawn);


    this.resetVelocity = function() {
        this.velocityX = 0;
        this.velocityY = 0;
    }

}

module.exports = PlayerInputController;
