var mainState = function(game){
    this.tf_start;
    
    this.keys = {
        key_up: null,
        key_down: null,
        key_left: null,
        key_right: null,
    }
};

mainState.prototype = {
    
    preload: function () {
        //sprite
        game.load.image(graphicAssets.player.name, graphicAssets.player.URL);
        game.load.image(graphicAssets.skall.name, graphicAssets.skall.URL);
        
        //tilemap
        game.load.image(graphicAssets.protoTiles.name, graphicAssets.protoTiles.URL);
    },
    
    create: function () {
        // var startInstructions = 'Click to Start\n\nW\nA    S    D\n\n to move';
        
        // this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, fontAssets.counterFontStyle);
        // this.tf_start.anchor.set(0.5, 0.5);
        
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        initKeyboard(this);
        // game.input.onDown.addOnce(this.startGame, this);
        this.startGame();
    },
    
    startGame: function () {
        var startState = getRemainingLevels();
        game.state.start(startState, true, false, this.keys);
    },
};

game.state.add(states.main, mainState);