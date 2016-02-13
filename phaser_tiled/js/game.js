gameState.prototype = {
    
    preload: function () {
        //sprite
        game.load.image(graphicAssets.player.name, graphicAssets.player.URL);
        game.load.image(graphicAssets.skall.name, graphicAssets.skall.URL);
        
        //tilemap
        game.load.image(graphicAssets.protoTiles.name, graphicAssets.protoTiles.URL);
        game.load.tilemap(graphicAssets.level1.name, graphicAssets.level1.URL, null, Phaser.Tilemap.TILED_JSON);
    },
    
    init: function () {
        this.score = 0;
    },
    
    create: function () {
        this.initGraphics();
        this.initPhysics();
        this.initKeyboard();
        this.initEntities();
    },
    
    update: function () {
        this.player.update();
        this.player.collideWithTilemapLayer(this.layer[1]);
        
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].sprite.alive) {
                // console.log(this.enemies[i].sprite.name)
                this.enemies[i].update();
                this.enemies[i].collideWithTilemapLayer(this.layer[1]);
            }
        }
    },
    
    initGraphics: function () {
        this.game.stage.backgroundColor = '#610B0B';
        
        //scale options
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //set up tilemap
        this.map = game.add.tilemap(graphicAssets.level1.name);
        //the first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //the second parameter maps this name to the Phaser.Cache key 'tiles'
        this.map.addTilesetImage(graphicAssets.protoTiles.name, graphicAssets.protoTiles.name);
        //creates a layer with the name given in Tiled
        this.layer[0] = this.map.createLayer("background");
        this.layer[0].resizeWorld();
        this.layer[1] = this.map.createLayer("collision");
        
        //score text
        this.tf_score = game.add.text(game.width * .985, game.height * .01, this.score, fontAssets.counterFontStyle);
        this.tf_score.align = 'right';
        this.tf_score.anchor.set(1, 0);
    },
    
    initPhysics: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //tilemap physics
        this.map.setCollisionBetween(1, 100, true, 'collision');
        // this.layer[1].debug = true;
    },
    
    initKeyboard: function () {
        gameState.key_left = game.input.keyboard.addKey(Phaser.Keyboard.A);
        gameState.key_right = game.input.keyboard.addKey(Phaser.Keyboard.D);
        gameState.key_up = game.input.keyboard.addKey(Phaser.Keyboard.W);
        gameState.key_down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    },
    
    initEntities: function () {
        this.player = new Player(game, 100, 100);
        
        var enemyCount = 10;
        for (var i = 0; i < enemyCount; i++) {
            var x = game.world.randomX;
            var y = game.world.randomY;
            this.enemies.push(new Skall(game, i, this.player, x, y));
        }
    },
    
    updateScore: function (score) {
        this.score += score;
        this.tf_score.text = this.score;
    },
};

//'gameDiv' is the id in index.html
game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv', null, false, false);

//links the name 'game' to the gameState
game.state.add(states.game, gameState);
game.state.start(states.game);