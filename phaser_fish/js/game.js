var gameProperties = {
    screenWidth: 640,
    screenHeight: 480,
    
    padding: 250,
    
    delayToStartLevel: 3,
};

var states = {
    game: "game",
};

var graphicAssets = {
    fish: {URL:'assets/fish.png', name:'fish'},
    
    background:{URL:'assets/blue.png', name:'background'},
};

var soundAssets = {
    eat: {URL: ['assets/gulp.m4a', 'assets/gulp.ogg'], name:'eat'},
};

var playerProperties = {
    startX: gameProperties.screenWidth * 0.5,
    startY: gameProperties.screenHeight * 0.5,
    
    velocity: 200,
    minSize: 25,
    maxSize: 500,
};

var fishProperties = {
    minVelocity: 25,
    maxVelocity: 250,
    
    minSize: 10,
    maxSize: 500,
    
    maxFish: 15,
};

var fontAssets = {
    counterFontStyle:{font: '20px Arial', fill: '#FFFFFF', align: 'center'},
};

var gameState = function(game){
    this.playerSprite;
    this.backgroundSprite;
    
    this.score;
    
    this.sndEat;

    this.key_left;
    this.key_right;
    this.key_up;
    this.key_down;
    
    this.fishGroup;
};

// mainState
gameState.prototype = {
    
    //load all game assets
    preload: function() {
        game.load.image(graphicAssets.fish.name, graphicAssets.fish.URL);
        game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
        
        game.load.audio(soundAssets.eat.name, soundAssets.eat.URL);
    },
    
    init: function() {
        this.score = 0;
        this.fishCount = fishProperties.maxFish;
    },
    
    //constructor
    create: function() {
        this.initGraphics();
        this.initSounds();
        this.initPhysics();
        this.initKeyboard();
        this.resetFish();
    },

    //game loop
    update: function() {
        this.checkPlayerInput();
        
        this.fishGroup.forEachExists(this.checkBoundaries, this);
        
        game.physics.arcade.overlap(this.playerSprite, this.fishGroup, this.fishCollision, null, this);
    },
    
    initGraphics: function() {
        this.backgroundSprite = game.add.sprite(0, 0, graphicAssets.background.name);
        this.backgroundSprite.width = game.width;
        this.backgroundSprite.height = game.height;
        
        this.playerSprite = game.add.sprite(playerProperties.startX, playerProperties.startY, graphicAssets.fish.name);
        this.playerSprite.anchor.set(0.5, 0.5); 
        this.playerSprite.scale.set(.05);
        
        this.fishGroup = game.add.group();
        
        //score text
        this.tf_score = game.add.text(game.width * .985, game.height * .01, this.score, fontAssets.counterFontStyle);
        this.tf_score.align = 'right';
        this.tf_score.anchor.set(1, 0);
    },
    
    initSounds: function() {
        this.sndEat = game.add.audio(soundAssets.eat.name);
    },
    
    initPhysics: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.physics.enable(this.playerSprite, Phaser.Physics.ARCADE);
        
        this.fishGroup.enableBody = true;
        this.fishGroup.physicsBodyType = Phaser.Physics.ARCADE;
    },
    
    initKeyboard: function() {
        this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.key_up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.key_down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    },
    
    checkPlayerInput: function() {
        if (this.key_up.isDown) {
            this.playerSprite.body.velocity.y = -playerProperties.velocity;
        } else if (this.key_down.isDown) {
            this.playerSprite.body.velocity.y = playerProperties.velocity;
        } else {
            this.playerSprite.body.velocity.y = 0;
        }
        
        if (this.key_right.isDown) {
            this.playerSprite.body.velocity.x = playerProperties.velocity;
        } else if (this.key_left.isDown) {
            this.playerSprite.body.velocity.x = -playerProperties.velocity;
        } else {
            this.playerSprite.body.velocity.x = 0;
        }
    },
    
    checkBoundaries: function (sprite) {
        if (sprite.x + gameProperties.padding < 0) {
            sprite.kill();
        } else if (sprite.x - gameProperties.padding> game.width) {
            sprite.kill();
        } 
 
        if (sprite.y + gameProperties.padding < 0) {
            sprite.kill();
        } else if (sprite.y - gameProperties.padding> game.height) {
            sprite.kill();
        }
    },
    
    resetFish: function () {
        for (var i = 0; i < this.fishCount; i++ ) {
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
            
            this.createFish(x, y, game.rnd.realInRange(0.01, 0.2));
        }
    },
    
    createFish: function (x, y, size) {   
        var fish = this.fishGroup.create(x, y, "fish");
        fish.scale.setTo(size, size);
        
        //powerup: make spin rapidly so the player can eat without size requirements
        //asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties[size].minAngularVelocity, asteroidProperties[size].maxAngularVelocity);

        var randomAngle = game.math.degToRad(game.rnd.angle());
        var randomVelocity = game.rnd.integerInRange(fishProperties.minVelocity, fishProperties.maxVelocity);

        game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, fish.body.velocity);
    },
    
    fishCollision: function (player, fish) {
        
        var playerSize = Math.sqrt(Math.pow(player.height, 2) + Math.pow(player.width, 2));
        var fishSize = Math.sqrt(Math.pow(fish.height, 2) + Math.pow(fish.width, 2));
        
        if (playerSize > fishSize) {
            fish.kill();
            this.sndEat.play();
        } else if (fishSize > playerSize) {
            player.kill();
            this.sndEat.play();
        }
        
        
        // this.sndDestroyed.play();
        
        this.updateScore(100);
        
        //check if there are any existing asteriods
        // if (!this.asteroidGroup.countLiving()) {
        //     game.time.events.add(Phaser.Timer.SECOND * gameProperties.delayToStartLevel, this.nextLevel, this);
        // }
        
        //if target is the player
        // if (smaller.key == graphicAssets.player.name) {
        //     this.destroyShip();
        // }
    },
    
    updateScore: function (score) {
        this.score += score;
        this.tf_score.text = this.score;
    },
};

//'gameDiv' is the id in index.html
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');

//links the name 'game' to the gameState
game.state.add(states.game, gameState);
game.state.start(states.game);