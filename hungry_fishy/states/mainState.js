var mainState = function(game){
    this.tf_start;
    
    this.image;
};

mainState.prototype = {
    
    preload: function () {
        //sprite
        for (var graphic in graphicAssets) {
            var graphicAsset = graphicAssets[graphic];
            game.load.image(graphicAsset.name, graphicAsset.URL);
        }

        for (var sound in soundAssets) {
            var soundAsset = soundAssets[sound];
            game.load.audio(soundAsset.name, soundAsset.URL);
        }
    },
    
    create: function () {
        this.image = game.add.sprite(0, 0, graphicAssets.main.name);
         this.image.width = game.world.width;
         this.image.height = game.world.height;
        
        var startInstructions = 'W\nA    S    D\n\n\n click to start';

        this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, fontAssets.counterFontStyle);
        this.tf_start.anchor.set(0.5, 0.5);
        
        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        game.input.onDown.addOnce(this.startGame, this);
        // this.startGame();
    },
    
    startGame: function () {
        game.state.start("gameState");
    },
};

game.state.add("main", mainState);
game.state.start("main");