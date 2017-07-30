function Hero(game, x, y) {
    // call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'hero');

    // ensure the anchor is in the center of the sprite and not upper left corner
    this.anchor.set(0.5, 0.5);

    // let's add it to physics engine for movement/updating
    this.game.physics.enable(this);

    // we get screen edge collision out of the box!
    // ** NOTE: when a sprite is touching world bounds, its body.'blocked' field is set to true
    this.body.collideWorldBounds = true;

    // let's add the animations from the spritesheet
    this.animations.add('stop', [0]);
    this.animations.add('run', [1, 2], 8, true);
    this.animations.add('jump', [3]);
    this.animations.add('fall', [4]);
}

// inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

// Since we have our own custom class for Sprite, we can add custom methods for moving and such!
Hero.prototype.move = function(direction) {
    // old way without phyics engine
    // this.x += direction * 2.5; // 2.5  pixels per frame 
    
    // with physics engine
    const SPEED = 200;
    this.body.velocity.x = direction * SPEED;

    // now let's have the hero face the correct direction
    if (this.body.velocity.x > 0) { // going right
        this.scale.x = 1;
    } else if (this.body.velocity.x < 0) { // going left
        this.scale.x = -1;
    }
};

Hero.prototype.jump = function() {
    const JUMP_SPEED = 600;
    let canJump = this.body.touching.down;

    // forbid hero from jumping in mid-air.. must be grounded
    if (canJump) {
        this.body.velocity.y = -JUMP_SPEED;
    }

    return canJump;
};

Hero.prototype.bounce = function() {
    const BOUNCE_SPEED = 200;
    this.body.velocity.y = -BOUNCE_SPEED;
};

Hero.prototype._getAnimationName = function() {
    let name = 'stop'; // default animations

    // jumping
    if (this.body.velocity.y < 0) {
        name = 'jump';
    } else if (this.body.velocity.y > 0 && !this.body.touching.down) { // falling ... gravity causes hero to still have negative velocity, just bumping into platform
        name = 'fall';
    } else if  (this.body.velocity.x !== 0 && this.body.touching.down) { // running
        name = 'run';
    }

    return name;
};

// Remember that update methods in Phaser.Sprite instances get called automatically each frame!
Hero.prototype.update = function() {
    let animationName = this._getAnimationName();
    if (this.animations.name !== animationName) {
        this.animations.play(animationName);
    }
};

function Spider(game, x, y) {
    // call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'spider');

    // anchor
    this.anchor.set(0.5);

    // animation
    this.animations.add('crawl', [0, 1, 2], 8, true);
    this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    this.animations.play('crawl');

    // physic properties
    this.game.physics.enable(this);

    // ** NOTE: when a sprite is touching world bounds, its body.'blocked'.right/left field is set to true
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Spider.SPEED;
}

Spider.SPEED = 100;

Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.update = function() {
    // check against walls and reverse direction if necessary
    if (this.body.touching.right || this.body.blocked.right) {
        this.body.velocity.x = -Spider.SPEED; // turn left
    } else if (this.body.touching.left || this.body.blocked.left) {
        this.body.velocity.x = Spider.SPEED; // turn right
    }
};

Spider.prototype.die = function() {
    // disable the physics of the spider body while dying to avoid collisions
    this.body.enable = false;

    // leverage the animations ability of sprites
    this.animations.play('die').onComplete.addOnce(function() {
        this.kill(); // we have callback function to remove sprite once animation is finished (and animation does not loop)
    }, this);
};


PlayState = {};

const TOTAL_NUMBER_OF_LEVELS = 2;

PlayState.init = function(data) {
    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT, // so we get access to all the methods/fields of a Phaser.Key (isdown)
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP
    });

    this.keys.up.onDown.add(function() {
        let didJump = this.hero.jump();

        // play sound on actual jump!
        if (didJump) {
            this.sfx.jump.play(); // leveraging Phaser.Sound.play
        }

    }, this);

    // Force Phaser to round the position values when drawing images
    this.game.renderer.renderSession.roundPixels = true;

    // we want a scoreboard for keeping track of coins
    this.coinPickupCount = 0;

    // has the hero picked up the coin?
    this.hasKey = false;

    // Set the level according to data.level
    this.level = (data.level || 0) % TOTAL_NUMBER_OF_LEVELS;
};

// this method will be invoked when the 'PlayState' game state reaches the 'preload' step
// load game assets here
PlayState.preload = function() {
    // note: we can access the Phaser.Game instance in here w/ this.game
    this.game.load.image('background', 'images/background.png'); // 'background' is the key we give the asset for later reference

    // now let's load the json file containing the level data
    this.game.load.json('level:0', 'data/level00.json');
    this.game.load.json('level:1', 'data/level01.json');

    // before we can create sprites, we need to load the images the platform will use
    this.game.load.image('ground', 'images/ground.png');
    this.game.load.image('grass:8x1', 'images/grass_8x1.png');
    this.game.load.image('grass:6x1', 'images/grass_6x1.png');
    this.game.load.image('grass:4x1', 'images/grass_4x1.png');
    this.game.load.image('grass:2x1', 'images/grass_2x1.png');
    this.game.load.image('grass:1x1', 'images/grass_1x1.png');

    // now let's load the hero sprite OLD WAY WITHOUT animation for hero
    //this.game.load.image('hero', 'images/hero_stopped.png');
    // new way below with hero spreadsheet
    this.game.load.spritesheet('hero', 'images/hero.png', 36, 42);

    // now let's load some fun sound effects!
    this.game.load.audio('sfx:jump', 'audio/jump.wav');

    // now let's load the spritesheet for the 'animated' coins!
    this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);

    // And now a audio effect for picking up a coin
    this.game.load.audio('sfx:coin', 'audio/coin.wav');

    // Now time to load the spritesheet for the spiders!
    this.game.load.spritesheet('spider', 'images/spider.png', 42, 32);

    // we need to load the invisible wall sprite for spiders to not fall off the platform
    this.game.load.image('invisible-wall', 'images/invisible_wall.png');

    // load the sound effect for death
    this.game.load.audio('sfx:stomp', 'audio/stomp.wav');

    // coin icon for the scoreboard!
    this.game.load.image('icon:coin', 'images/coin_icon.png');
    // and now the asset for the font.. it is a spritesheet but loaded as image
    this.game.load.image('font:numbers', 'images/numbers.png');

    // the spritesheet (open + closed) for the door to exit
    this.game.load.spritesheet('door', 'images/door.png', 42, 66);

    // the key image!
    this.game.load.image('key', 'images/key.png');

    // sfx for door and key
    this.game.load.audio('sfx:key', 'audio/key.wav');
    this.game.load.audio('sfx:door', 'audio/door.wav');

    // load spritesheet for key icon
    this.game.load.spritesheet('icon:key', 'images/key_icon.png', 34, 30);
};

// create game entities and set up world here
PlayState.create = function() {
    this.game.add.image(0, 0, 'background'); // create occurrs after 'preload' so we can access the 'background' asset
                                            // default anchor is upper left of asset

    // parser & interpreter for that data?
    this._loadLevel(this.game.cache.getJSON('level:1'));

    // let's create the sound effect object
    this.sfx = {
        jump: this.game.add.audio('sfx:jump'),
        coin: this.game.add.audio('sfx:coin'),
        stomp: this.game.add.audio('sfx:stomp'),
        key: this.game.add.audio('sfx:key'),
        door: this.game.add.audio('sfx:door')
    };

    // create the HUD last so it goes on top of everything
    this._createHud();
};

PlayState.update = function() {
    // leverage physics engine to do collision detection
    this._handleCollisions();
    this._handleInput();
    this.coinFont.text = `x${this.coinPickupCount}`;
    this.keyIcon.frame = this.hasKey ? 1 : 0;
};

PlayState._handleCollisions = function() {
    // you can do collision detection between
    // Sprite vs Sprite
    // Sprite vs Group
    // Group vs Group
    // ...
    // this is Sprite (hero) and group (platforms)
    this.game.physics.arcade.collide(this.hero, this.platforms);

    // we do not want the coins 'bump' or 'block' the hero.. so do the overlap check
    // this._onHeroVsCoin is callback function to trigger on overlap.. null is on the filter you could exclude some coins
    this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin, null, this);

    // and we want the spiders to collide with platforms + invis walls
    this.game.physics.arcade.collide(this.spiders, this.platforms);
    this.game.physics.arcade.collide(this.spiders, this.enemyWalls);

    this.game.physics.arcade.overlap(this.hero, this.spiders, this._onHeroVsEnemy, null, this);

    // Let's check for the hero picking up the key
    this.game.physics.arcade.overlap(this.hero, this.key, this._onHeroVsKey, null, this);

    // Let's check for when the hero hits the door and ensure they have the key
    this.game.physics.arcade.overlap(this.hero, this.door, this._onHeroVsDoor,
                                     // we want to ignore if hero does not have key
                                     function(hero, door) {
                                         return this.hasKey && hero.body.touching.down;
                                     }, this);
};

PlayState._onHeroVsDoor = function(hero, door) {
    this.sfx.door.play();
    this.game.state.restart();
    // TODO: go to the next level
};

PlayState._onHeroVsKey = function(hero, key) {
    this.sfx.key.play();
    key.kill();
    this.hasKey = true;
};

PlayState._onHeroVsCoin = function(hero, coin) {
    // we get a reference to the 2 objects that have 'overlapped'
    coin.kill(); // kill method apart of Phaser.Sprite
    this.sfx.coin.play();
    this.coinPickupCount++;
};

PlayState._onHeroVsEnemy = function(hero, enemy) {
    if (hero.body.velocity.y > 0) { // kill enemies when hero is falling
        hero.bounce();
        enemy.die(); // our own custom method for animation + killing sprite
        this.sfx.stomp.play();
    } else { // not falling on them.. thus enemy kills hero and we restart
        this.sfx.stomp.play();
        this.game.state.restart();
    }
};

PlayState._handleInput = function() {
    if (this.keys.left.isDown) { // move hero left
        this.hero.move(-1);
    } else if (this.keys.right.isDown) { // move hero right
        this.hero.move(1);
    } else {
        this.hero.move(0); // STOP
    }
};

PlayState._loadLevel = function(data) {
    // ORDER matters when creating groups.. this first one will be drawn first (behind) the rest
    this.bgDecoration = this.game.add.group();
    // ** we are essentially creating 'globals' in this load level to be used throughout **
    // first we can create a Phaser.group for the platforms sprites to live
    this.platforms = this.game.add.group();
    // and another one for the coins
    this.coins = this.game.add.group();
    // and another for spider bros..
    this.spiders = this.game.add.group();
    // and another for invisible walls
    this.enemyWalls = this.game.add.group();
    this.enemyWalls.visible = false;

    // spawn hero and enemies
    this._spawnCharacters({hero: data.hero, spiders: data.spiders});

    // let's spawn all platforms (json has 'platforms' key)
    data.platforms.forEach(this._spawnPlatform, this);

    // and the coins..
    data.coins.forEach(this._spawnCoin, this);

    // enable gravity, place it here so we could parameterize gravity in json file for level
    // only affects the sprites that are apart of the physics engine (have 'bodies')
    const GRAVITY = 1200;
    this.game.physics.arcade.gravity.y = GRAVITY;

    // let's create the door sprite!
    this._spawnDoor(data.door.x, data.door.y);

    // and the key needed to open it
    this._spawnKey(data.key.x, data.key.y);
};

PlayState._spawnDoor = function(x, y) {
    this.door = this.bgDecoration.create(x, y, 'door');
    this.door.anchor.setTo(0.5, 1);
    this.physics.enable(this.door);
    this.door.body.allowGravity = false;
};

PlayState._spawnKey = function(x, y) {
    this.key = this.bgDecoration.create(x, y, 'key');
    this.key.anchor.setTo(0.5, 0.5);
    this.physics.enable(this.key);
    this.key.body.allowGravity = false;

    // let's add an animation by using 'tween'
    this.key.y -= 3;
    this.game.add.tween(this.key)
        .to({y: this.key.y + 6}, 800, Phaser.Easing.Sinusoidal.InOut)
        .loop()
        .start();
};

PlayState._spawnCoin = function(coin) {
    let sprite = this.coins.create(coin.x, coin.y, 'coin');
    sprite.anchor.set(0.5, 0.5);

    // activate the animations on the different indices of the spritesheet
    sprite.animations.add('rotate', [0, 1, 2, 1], 6, true); // 6fps, looped
    sprite.animations.play('rotate');

    // physics body initialization
    this.game.physics.enable(sprite); // now the sprite has a 'body' member..
    sprite.body.allowGravity = false;
};

PlayState._spawnPlatform = function(platform) {
    // OLD WAY without Phaser.Group + physics engine 
    //this.game.add.sprite(platform.x, platform.y, platform.image);  

    // New way leveraging groups + physics engine
    // "Phaser.Group.create is a factory method for sprites. The new sprite will be added as a child of the group."
    let sprite = this.platforms.create(platform.x, platform.y, platform.image);

    // give it a 'body'
    this.game.physics.enable(sprite);

    // no gravity affects the  platforms!
    sprite.body.allowGravity = false;

    // do not allow the hero to 'push down' on a platform
    sprite.body.immovable = true;

    // Now let's spawn 2 invisible walls per platform
    this._spawnEnemyWall(platform.x, platform.y, 'left');
    this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
};

PlayState._spawnEnemyWall = function(x, y, side) {
    let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
    // anchor x and y displacement
    sprite.anchor.set(side === 'left' ? 1 : 0, 1); // for left wall, anchor is bottom right, for right it is bottom left corner

    // physic properties
    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
};

PlayState._spawnCharacters = function(data) {
    // spawn hero
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);

    // and spiders
    data.spiders.forEach(function(spider) {
        let sprite = new Spider(this.game, spider.x, spider.y);
        this.spiders.add(sprite);
    }, this);
};

PlayState._createHud = function() {
    const NUMBERS_STR = '0123456789X '; // the characters used in the font set
    // like spritesheet, we need to tell Phaser the width and height of each character
    this.coinFont = this.game.add.retroFont('font:numbers', 20, 26, NUMBERS_STR, 6);

    // key icon for scoreboard
    this.keyIcon = this.game.make.image(0, 19, 'icon:key');
    this.keyIcon.anchor.set(0, 0.5); // center the anchor on middle

    // notice how we create an image.. not a sprite. not add an image
    // coordinates are RELATIVE to the coordinate of the hud group..so this icon is start of hud 
    // let coinIcon = this.game.make.image(0, 0, 'icon:coin');
    // new way to make room for key icon
    let coinIcon = this.game.make.image(this.keyIcon.width + 7, 0, 'icon:coin');

    let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width, coinIcon.height / 2, this.coinFont);
    coinScoreImg.anchor.set(0, 0.5);


    // group for all UI icons, text, etc
    this.hud = this.game.add.group();
    this.hud.add(this.keyIcon);
    this.hud.add(coinIcon);
    this.hud.add(coinScoreImg);
    this.hud.position.set(10, 10);
};

window.onload = function() {
    let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
    game.state.add('play', PlayState);
    game.state.start('play');
};
