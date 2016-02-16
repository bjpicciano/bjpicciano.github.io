var level1 = function (game) {
    this.enemies = [];
    
    this.player;
    this.spawnX;
    this.spawnY;
    
    this.map;
    this.layer = {};
    this.edgeUp;
    this.edgeDown;
    this.edgeLeft;
    this.edgeRight;
    
    this.score;
    
    this.keys = {
        key_up: null,
        key_down: null,
        key_left: null,
        key_right: null,
    }
};

level1.prototype = {
    
    preload: function () {
        //tilemap
        game.load.tilemap(graphicAssets.level1.name, graphicAssets.level1.URL, null, Phaser.Tilemap.TILED_JSON);
    },
    
    init: function (keys, stateData) {
        if (keys != null) {
            this.keys = keys;
        }
        
        if (stateData != null) {
            initEdge(this, stateData);
        }
        
        this.score = 0;
    },
    
    create: function () {
        this.initGraphics();
        this.initPhysics();
        initKeyboard(this);
        this.initEntities();
    },
    
    update: function () {
        this.player.update();
        checkBoundaries(this);
        
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].sprite.alive) {
                this.enemies[i].update();
            }
        }
    },
    
    initGraphics: function () {
        //set up tilemap
        this.map = game.add.tilemap(graphicAssets.level1.name);
        
        //#610B0B - dark red
        //#585 - light green
        var color = '#';
        initLevelGraphics(this, color);
        
        //scale options
        // self.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },
    
    initPhysics: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // game.physics.startSystem(Phaser.Physics.P2JS);

        initLevelPhysics(this);
    },
    
    initEntities: function () {
        initPlayer(this, this.spawnX, this.spawnY);
        
        var enemyCount = 10;
        for (var i = 0; i < enemyCount; i++) {
            var x;
            var y;
            this.enemies.push(new Skall(game, i, this.player, x, y));
        }
    },
    
    updateScore: function (score) {
        this.score += score;
        this.tf_score.text = this.score;
    },
};

//links the name 'game' to the gameState
game.state.add(states.level1, level1);
