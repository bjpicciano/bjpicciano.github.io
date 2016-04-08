var mainState = function(game){
    this.game = game;
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
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setResizeCallback(this.gameResized, this);
        }
    },
    
    preload: function () {
        for (var image in imageAssets) {
            if (imageAssets.hasOwnProperty(image)) {
                var imageAsset = imageAssets[image];
                game.load.image(imageAsset.key, imageAsset.URL);
            }
        }

        for (var topThumb in topThumbAssets) {
            if (topThumbAssets.hasOwnProperty(topThumb)) {
                var topThumbAsset = topThumbAssets[topThumb];
                game.load.image(topThumbAsset.key, topThumbAsset.URL);
            }
        }

        for (var bottomThumb in bottomThumbAssets) {
            if (bottomThumbAssets.hasOwnProperty(bottomThumb)) {
                var bottomThumbAsset = bottomThumbAssets[bottomThumb];
                game.load.image(bottomThumbAsset.key, bottomThumbAsset.URL);
            }
        }

        for (var sound in soundAssets) {
            if (soundAssets.hasOwnProperty(sound)) {
                var soundAsset = soundAssets[sound];
                game.load.audio(soundAsset.key, soundAsset.URL);
            }
        }
    },
    
    create: function () {
        //var button = game.add.button(game.world.centerX, game.world.centerY * 1.325, imageAssets.button.key, function () {
        //    //on click of the button, start the game
        //    this.startGame();
        //}, this);
        //button.anchor.setTo(0.5, 0.5);

        var startInstructions = 'ChinChin!\n\n\n1. click your thumbs to raise and lower\n' +
            '2. click the associated button for your guess\n\n\nclick anywhere to start';

        this.tf_start = game.add.text(game.world.centerX, game.world.centerY, startInstructions, fontAssets.counterFontStyle);
        this.tf_start.anchor.set(0.5, 0.5);

        this.game.input.onDown.addOnce(this.startGame, this);
        //this.startGame();
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