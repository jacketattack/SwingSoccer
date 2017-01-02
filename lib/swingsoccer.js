/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var PlayerRenderer = __webpack_require__(4);
	var GAME_WIDTH = 1000;
	var GAME_HEIGHT = 600;

	var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT,{backgroundColor : 0x1099bb});
	document.body.appendChild(renderer.view);

	// create the root of the scene graph
	var stage = new PIXI.Container();

	var player1Renderer = new PlayerRenderer('bunny.png', stage);

	// start animating
	animate();
	function animate() {
	    requestAnimationFrame(animate);

	    // just for fun, let's rotate mr rabbit a little
	    player1Renderer.update();

	    // render the container
	    renderer.render(stage);
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Make a player class
	 * add stuff to it and all
	 *
	 * then finish off file with module.exports = Player
	 *
	 *
	 * other files can say var Player = require('./player.js')
	 * and then interact with var myPlayer = new Player();
	 */
	var PlayerInputController = __webpack_require__(2);

	function Player()  {

	    this.velocityX = function() {
	        return this.keyboard.velocityX;
	    }

	    this.velocityY = function() {
	        return this.keyboard.velocityY;
	    }

	    this.ropeActive = function() {
	        return this.keyboard.ropeActive;
	    }

	    this.keyboard = new PlayerInputController(
	        {
	            "left": 37,
	            "up": 38,
	            "right": 39,
	            "down": 40,
	            "respawn": 13,
	            "rope": 16
	        }
	    );

	    this.update = function() {
	    }
	}

	module.exports = Player;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Keyboard = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Goal of this class is to register eventListeners for specific
	 * keyCodes on the keyboard and then call the specific handler functions
	 * for the object this keyboard is bound to.
	 */
	function Keyboard(keyCode, controllerObject) {

	    this.keyCode = keyCode;
	    this.keyIsDown = false;
	    this.keyIsUp = true;
	    this.press = controllerObject.press.bind(controllerObject);
	    this.release = controllerObject.release.bind(controllerObject);

	    this.downHandler = function(event) {
	        if (event.keyCode == this.keyCode) {
	            if (this.keyIsUp && this.press) {
	                this.press(this.keyCode);
	            }

	            this.keyIsDown = true;
	            this.keyIsUp = false;
	        }
	        event.preventDefault();
	    }

	    this.upHandler = function(event) {
	        if (event.keyCode == this.keyCode) {
	            if (this.keyIsDown && this.release) {
	                this.release(this.keyCode);
	            }
	            this.keyIsDown = false;
	            this.keyIsUp = true;
	        }
	        event.preventDefault();
	    }

	    this.delegateEvents = function() {
	        window.addEventListener('keydown', this.downHandler.bind(this));
	        window.addEventListener('keyup', this.upHandler.bind(this));
	    }

	    this.undelegateEvents = function() {
	        window.removeEventListener('keydown', this.downHandler.bind(this));
	        window.removeEventListener('keyup', this.upHandler.bind(this));
	    }

	    this.delegateEvents();
	}

	module.exports = Keyboard;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(1);

	/**
	 * Handles drawing a player object (including the rope) to the Pixi js stage.
	 *
	 */
	function PlayerRenderer(imageFileName, stage) {

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
	        this.playerSprite.rotation += 0.1;
	        this.playerSprite.x += this.player.velocityX();
	        this.playerSprite.y += this.player.velocityY();
	        this.renderRope();
	    }

	    this.renderRope = function() {
	        if (this.player.ropeActive()) {
	            this.ropeGraphic.clear()
	            this.ropeGraphic.lineStyle(2, 0xFFFFFF, 1);
	            this.ropeGraphic.moveTo(this.playerSprite.x, 0);
	            this.ropeGraphic.lineTo(this.playerSprite.x, this.playerSprite.y);

	            if (!this.ropeOnStage()) {
	                this.addUpdatedRopeToStage();
	            }
	        } else if (!this.player.ropeActive() && this.ropeOnStage()) {
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


/***/ }
/******/ ]);