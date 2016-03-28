var mainState = function(game){
    this.tf_start;
    
    this.image;
};

mainState.prototype = {
    init: function () {
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            //have the game centered horizontally
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setResizeCallback(this.gameResized, this);
        }
    },
    
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
        
        var startInstructions = 'Eat smaller fish to grow\n\nW\nA    S    D\n\n click to start';

        this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, fontAssets.counterFontStyle);
        this.tf_start.anchor.set(0.5, 0.5);

        game.input.onDown.addOnce(this.startGame, this);
        // this.startGame();
    },
    
    startGame: function () {
        game.state.start("gameState");
    },

    gameResized: function (width, height) {
        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
    },
};

game.state.add("main", mainState);
game.state.start("main");