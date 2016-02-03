var gameProperties = {
    screenWidth: 800,
    screenHeight: 600,
    
    delayToStartLevel: 3,
    padding: 20,
};

var states = {
    main: "main",
    game: "game",
};

var graphicAssets = {
    ship: {URL:'assets/ship.png', name:'ship'},
    bullet: {URL:'assets/bullet.png', name:'bullet'},    
    
    asteroidLarge: {URL:'assets/asteroidLarge.png', name:'asteroidLarge'},
    asteroidMedium: {URL:'assets/asteroidMedium.png', name:'asteroidMedium'},
    asteroidSmall: {URL:'assets/asteroidSmall.png', name:'asteroidSmall'},
    
    background:{URL:'assets/background.png', name:'background'},
    explosionLarge:{URL:'assets/explosionLarge.png', name:'explosionLarge', width:64, height:64, frames:8},
    explosionMedium:{URL:'assets/explosionMedium.png', name:'explosionMedium', width:58, height:58, frames:8},
    explosionSmall:{URL:'assets/explosionSmall.png', name:'explosionSmall', width:41, height:41, frames:8},
};

var soundAssets = {
    fire: {URL: ['assets/fire.m4a', 'assets/fire.ogg'], name:'fire'},
    destroyed: {URL: ['assets/destroyed.m4a', 'assets/destroyed.ogg'], name:'destroyed'},
};

var shipProperties = {
    startX: gameProperties.screenWidth * 0.5,
    startY: gameProperties.screenHeight * 0.5,
    acceleration: 400,
    drag: 250,
    maxVelocity: 300,
    angularVelocity: 300,
    startingLives: 3,
    timeToReset: 3,
    blinkDelay: 0.2,
};

var bulletProperties = {
    speed: 500,
    interval: 250, //1 round every 0.25 seconds
    lifeSpan: 1500,
    maxCount: 30,
};

var asteroidProperties = {
    startingAsteroids: 7,
    maxAsteroids: 20,
    incrementAsteroids: 2,
    
    asteroidLarge: { minVelocity: 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, score: 20, nextSize: graphicAssets.asteroidMedium.name, pieces: 2, explosion:'explosionLarge' },
    asteroidMedium: { minVelocity: 50, maxVelocity: 200, minAngularVelocity: 0, maxAngularVelocity: 200, score: 50, nextSize: graphicAssets.asteroidSmall.name, pieces: 2, explosion:'explosionMedium' },
    asteroidSmall: { minVelocity: 50, maxVelocity: 300, minAngularVelocity: 0, maxAngularVelocity: 200, score: 100, explosion:'explosionSmall' },
};

var fontAssets = {
    counterFontStyle:{font: '20px Arial', fill: '#FFFFFF', align: 'center'},
};

var gameState = function(game){
    this.shipSprite;
    this.shipIsInvulnerable;
    
    this.key_left;
    this.key_right;
    this.key_thrust;
    this.key_fire;
    
    this.bulletGroup;
    
    this.asteroidGroup;

    this.tf_lives;
    this.tf_score;
    this.tf_gameover;
    
    this.sndDestroyed;
    this.sndFire;
    
    this.backgroundSprite;
    
    this.explosionLargeGroup;
    this.explosionMediumGroup;
    this.explosionSmallGroup;
};

gameState.prototype = {
    
    preload: function () {
        game.load.image(graphicAssets.asteroidLarge.name, graphicAssets.asteroidLarge.URL);
        game.load.image(graphicAssets.asteroidMedium.name, graphicAssets.asteroidMedium.URL);
        game.load.image(graphicAssets.asteroidSmall.name, graphicAssets.asteroidSmall.URL);
        
        game.load.image(graphicAssets.bullet.name, graphicAssets.bullet.URL);
        game.load.image(graphicAssets.ship.name, graphicAssets.ship.URL);
        
        game.load.audio(soundAssets.destroyed.name, soundAssets.destroyed.URL);
        game.load.audio(soundAssets.fire.name, soundAssets.fire.URL);
        
        game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
        
        game.load.spritesheet(graphicAssets.explosionLarge.name, graphicAssets.explosionLarge.URL, graphicAssets.explosionLarge.width, graphicAssets.explosionLarge.height, graphicAssets.explosionLarge.frames);
        game.load.spritesheet(graphicAssets.explosionMedium.name, graphicAssets.explosionMedium.URL, graphicAssets.explosionMedium.width, graphicAssets.explosionMedium.height, graphicAssets.explosionMedium.frames);
        game.load.spritesheet(graphicAssets.explosionSmall.name, graphicAssets.explosionSmall.URL, graphicAssets.explosionSmall.width, graphicAssets.explosionSmall.height, graphicAssets.explosionSmall.frames);
    },
    
    init: function() {
        this.bulletInterval = 0;
        this.asteroidsCount = asteroidProperties.startingAsteroids;
        this.shipLives = shipProperties.startingLives;
        this.score = 0;
    },
    
    create: function () {
        // game.world.setBounds(0, 0, 2000, 2000);
        this.initGraphics();
        this.initSounds();
        this.initPhysics();
        this.initKeyboard();
        this.resetAsteroids();
    },

    update: function () {
        this.checkPlayerInput();
        
        //sets game world boundaries to loop to opposite side
        this.checkBoundaries(this.shipSprite);
        this.bulletGroup.forEachExists(this.checkBoundaries, this);
        this.asteroidGroup.forEachExists(this.checkBoundaries, this);
        
        //collisions
        game.physics.arcade.overlap(this.bulletGroup, this.asteroidGroup, this.asteroidCollision, null, this);
        if (!this.shipIsInvulnerable) {
            game.physics.arcade.overlap(this.shipSprite, this.asteroidGroup, this.asteroidCollision, null, this);
        }
    },
    
    initGraphics: function () {
        this.backgroundSprite = game.add.sprite(0, 0, graphicAssets.background.name);
        this.backgroundSprite.width = game.width;
        this.backgroundSprite.height = game.height;
        this.shipSprite = game.add.sprite(shipProperties.startX, shipProperties.startY, graphicAssets.ship.name);
        this.shipSprite.angle = -90;
        //centers the pivot point
        this.shipSprite.anchor.set(0.5, 0.5); 
        // game.camera.follow(this.shipSprite);
        
        this.bulletGroup = game.add.group();
        this.asteroidGroup = game.add.group();
        
        //lives text
        this.tf_lives = game.add.text(game.width * .015, game.height * .01, shipProperties.startingLives, fontAssets.counterFontStyle);
        
        //score text
        this.tf_score = game.add.text(game.width * .985, game.height * .01, this.score, fontAssets.counterFontStyle);
        this.tf_score.align = 'right';
        //anchor to top right to allow text to expand to the left
        this.tf_score.anchor.set(1, 0);
        
        this.explosionLargeGroup = game.add.group();
        this.explosionLargeGroup.createMultiple(20, graphicAssets.explosionLarge.name, 0);
        this.explosionLargeGroup.setAll('anchor.x', 0.5);
        this.explosionLargeGroup.setAll('anchor.y', 0.5);
        this.explosionLargeGroup.callAll('animations.add', 'animations', 'explode', null, 30);
        
        this.explosionMediumGroup = game.add.group();
        this.explosionMediumGroup.createMultiple(20, graphicAssets.explosionMedium.name, 0);
        this.explosionMediumGroup.setAll('anchor.x', 0.5);
        this.explosionMediumGroup.setAll('anchor.y', 0.5);
        this.explosionMediumGroup.callAll('animations.add', 'animations', 'explode', null, 30);
        
        this.explosionSmallGroup = game.add.group();
        this.explosionSmallGroup.createMultiple(20, graphicAssets.explosionSmall.name, 0);
        this.explosionSmallGroup.setAll('anchor.x', 0.5);
        this.explosionSmallGroup.setAll('anchor.y', 0.5);
        this.explosionSmallGroup.callAll('animations.add', 'animations', 'explode', null, 30);
    },
    
    initSounds: function () {
        this.sndDestroyed = game.add.audio(soundAssets.destroyed.name);
        this.sndFire = game.add.audio(soundAssets.fire.name);
    },
    
    initPhysics: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.physics.enable(this.shipSprite, Phaser.Physics.ARCADE);
        this.shipSprite.body.drag.set(shipProperties.drag);
        this.shipSprite.body.maxVelocity.set(shipProperties.maxVelocity);
        
        this.bulletGroup.enableBody = true;
        this.bulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.bulletGroup.createMultiple(30, graphicAssets.bullet.name);
        this.bulletGroup.setAll('anchor.x', 0.5);
        this.bulletGroup.setAll('anchor.y', 0.5);
        this.bulletGroup.setAll('lifespan', bulletProperties.lifeSpan);
        
        this.asteroidGroup.enableBody = true;
        this.asteroidGroup.physicsBodyType = Phaser.Physics.ARCADE;
    },
    
    initKeyboard: function () {
        this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.key_fire = game.input.activePointer;
    },
    
    checkPlayerInput: function () {
        if (this.key_left.isDown) {
            this.shipSprite.body.angularVelocity = -shipProperties.angularVelocity;
        } else if (this.key_right.isDown) {
            this.shipSprite.body.angularVelocity = shipProperties.angularVelocity;
        } else {
            this.shipSprite.body.angularVelocity = 0;
        }
        
        if (this.key_thrust.isDown) {
            game.physics.arcade.accelerationFromRotation(this.shipSprite.rotation, shipProperties.acceleration, this.shipSprite.body.acceleration);
        } else {
            this.shipSprite.body.acceleration.set(0);
        }
        
        if (this.key_fire.isDown) {
            this.fire();
        }
    },
    
    checkBoundaries: function (sprite) {
        if (sprite.x + gameProperties.padding < 0) {
            sprite.x = game.width + gameProperties.padding;
        } else if (sprite.x - gameProperties.padding> game.width) {
            sprite.x = -gameProperties.padding;
        } 
 
        if (sprite.y + gameProperties.padding < 0) {
            sprite.y = game.height + gameProperties.padding;
        } else if (sprite.y - gameProperties.padding> game.height) {
            sprite.y = -gameProperties.padding;
        }
    },
    
    fire: function () {
        if (game.time.now > this.bulletInterval && this.shipSprite.alive) {
            this.sndFire.play();
            
            var bullet = this.bulletGroup.getFirstExists(false);
            
            if (bullet) {
                var length = this.shipSprite.width * 0.5;
                var x = this.shipSprite.x + (Math.cos(this.shipSprite.rotation) * length);
                var y = this.shipSprite.y + (Math.sin(this.shipSprite.rotation) * length);
                
                bullet.reset(x, y);
                bullet.lifespan = bulletProperties.lifeSpan;
                bullet.rotation = this.shipSprite.rotation;
                
                game.physics.arcade.velocityFromRotation(this.shipSprite.rotation, bulletProperties.speed, bullet.body.velocity);
                this.bulletInterval = game.time.now + bulletProperties.interval;
            }
        }
    },
    
    resetAsteroids: function () {
        for (var i=0; i < this.asteroidsCount; i++ ) {
            //side set to either 0 or 1
            var side = Math.round(Math.random());
            var x;
            var y;
            
            if (side) {
                //x set to either 0 or full width of the game world
                x = Math.round(Math.random()) * gameProperties.screenWidth;
                y = Math.random() * gameProperties.screenHeight;
            } else {
                //y set to either 0 or full height of the game world
                x = Math.random() * gameProperties.screenWidth;
                y = Math.round(Math.random()) * gameProperties.screenHeight;
            }
            
            this.createAsteroid(x, y, graphicAssets.asteroidLarge.name);
        }
    },

    createAsteroid: function (x, y, size, pieces) {
        if (pieces === undefined) {
            pieces = 1;
        }
        
        for (var i = 0; i < pieces; i++) {
            var asteroid = this.asteroidGroup.create(x, y, size);
            asteroid.anchor.set(0.5, 0.5);
            //sets angularVelocity between a range of min and max
            asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties[size].minAngularVelocity, asteroidProperties[size].maxAngularVelocity);
    
            var randomAngle = game.math.degToRad(game.rnd.angle());
            var randomVelocity = game.rnd.integerInRange(asteroidProperties[size].minVelocity, asteroidProperties[size].maxVelocity);
    
            game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, asteroid.body.velocity);
        }
    },
    
    asteroidCollision: function (target, asteroid) {
        this.sndDestroyed.play();
        
        target.kill();
        asteroid.kill();
        
        var explosionGroup = asteroidProperties[asteroid.key].explosion + "Group";
        var explosion = this[explosionGroup].getFirstExists(false);
        explosion.reset(asteroid.x, asteroid.y);
        explosion.animations.play('explode', null, false, true);
                
        this.splitAsteroid(asteroid);
        this.updateScore(asteroidProperties[asteroid.key].score);
        
        //check if there are any existing asteriods
        if (!this.asteroidGroup.countLiving()) {
            game.time.events.add(Phaser.Timer.SECOND * gameProperties.delayToStartLevel, this.nextLevel, this);
        }
        
        //if target is the player
        if (target.key == graphicAssets.ship.name) {
            this.destroyShip();
        }
    },
    
    destroyShip: function () {
        this.shipLives--;
        this.tf_lives.text = this.shipLives;
        
        if (this.shipLives > 0) {
            game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset, this.resetShip, this);
        } else {
            this.bulletGroup.removeAll(true);
            this.tf_gameover = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER", fontAssets.counterFontStyle);
            this.tf_gameover.anchor.set(0.5, 0.5);
            game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset, this.endGame, this);
        }
        
        var explosion = this.explosionMediumGroup.getFirstExists(false);
        explosion.reset(this.shipSprite.x, this.shipSprite.y);
        explosion.animations.play('explode', 6, false, true);
    },
    
    resetShip: function () {
        this.shipIsInvulnerable = true;
        this.shipSprite.reset(shipProperties.startX, shipProperties.startY);
        this.shipSprite.angle = -90;
        
        game.time.events.add(Phaser.Timer.SECOND * shipProperties.timeToReset, this.shipReady, this);
        game.time.events.repeat(Phaser.Timer.SECOND * shipProperties.blinkDelay, shipProperties.timeToReset / shipProperties.blinkDelay, this.shipBlink, this);
    },
    
    shipReady: function () {
        this.shipIsInvulnerable = false;
        this.shipSprite.visible = true;
    },
    
    shipBlink: function () {
        this.shipSprite.visible = !this.shipSprite.visible;
    },
    
    splitAsteroid: function (asteroid) {
        if (asteroidProperties[asteroid.key].nextSize) {
            this.createAsteroid(asteroid.x, asteroid.y, asteroidProperties[asteroid.key].nextSize, asteroidProperties[asteroid.key].pieces);
        }
    },
    
    updateScore: function (score) {
        this.score += score;
        this.tf_score.text = this.score;
    },
    
    nextLevel: function () {
        this.asteroidGroup.removeAll(true);
        
        if (this.asteroidsCount < asteroidProperties.maxAsteroids) {
            this.asteroidsCount += asteroidProperties.incrementAsteroids;
        }
        
        this.resetAsteroids();
    },

    endGame: function () {
        game.state.start(states.main);
    },
};

var mainState = function(game){
    this.tf_start;
};

mainState.prototype = {
    
    create: function () {
        var startInstructions = 'Click to Start \n\nW for thrust.\nA and D to turn.\nClick key to fire.';
        
        this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, fontAssets.counterFontStyle);
        this.tf_start.anchor.set(0.5, 0.5);
        
        game.input.onDown.addOnce(this.startGame, this);
    },
    
    startGame: function () {
        game.state.start(states.game);
    },
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
game.state.add(states.main, mainState);
game.state.add(states.game, gameState);
game.state.start(states.main);