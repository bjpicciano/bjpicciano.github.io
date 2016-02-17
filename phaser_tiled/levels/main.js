var mainState = function(game){
    this.tf_start;
    
    this.keys = {
        key_up: null,
        key_down: null,
        key_left: null,
        key_right: null,
        
        key_gameKey: null,
        key_gameClick: null,
    }
};

mainState.prototype = {
    
    preload: function () {
        //sprite
        game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
        game.load.image(graphicAssets.player.name, graphicAssets.player.URL);
        game.load.image(graphicAssets.skall.name, graphicAssets.skall.URL);
        
        //tilemap
        game.load.image(graphicAssets.protoTiles.name, graphicAssets.protoTiles.URL);
    },
    
    update: function () {
        if (this.keys.key_gameKey.isDown) {
            initKeyboard(this);
            this.startGameKey();
        } else if (this.keys.key_gameClick.isDown) {
            this.keys.key_up = game.input.activePointer;
            this.startGameClick();
        }
    },
    
    create: function () {
        var startInstructions = 'W\nA    S    D\n\nor\n\n click to move';
        
        this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, fontAssets.counterFontStyle);
        this.tf_start.anchor.set(0.5, 0.5);
        
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        

        this.keys.key_gameKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.keys.key_gameClick = game.input.activePointer;
        // game.input.onDown.addOnce(this.startGameClick, this);
        // game.input.onDown.addOnce(this.startGameClick, this);
        // this.startGame();
    },
    
    startGameClick: function () {
        gameProperties.type = "MOB";
        var startState = getRemainingLevels();
        game.state.start(startState, true, false, this.keys);
    },
    
    startGameKey: function () {
        gameProperties.type = "PC";
        var startState = getRemainingLevels();
        game.state.start(startState, true, false, this.keys);
    },
};

game.state.add(states.main, mainState);