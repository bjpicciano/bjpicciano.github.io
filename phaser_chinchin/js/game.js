var states = {
    game: "game",
};

var gameState = function(game){
    this.backgroundSprite;
};

// mainState
gameState.prototype = {
    
    //load all game assets
    preload: function() {
        game.load.image(graphicAssets.background.name, graphicAssets.background.URL);
        game.load.image(graphicAssets.button.name, graphicAssets.button.URL);
            
        //top thumb
        game.load.image(graphicAssets.topThumbDownLeft.name, graphicAssets.topThumbDownLeft.URL);
        game.load.image(graphicAssets.topThumbUpLeft.name, graphicAssets.topThumbUpLeft.URL);
        game.load.image(graphicAssets.topThumbDownRight.name, graphicAssets.topThumbDownRight.URL);
        game.load.image(graphicAssets.topThumbUpRight.name, graphicAssets.topThumbUpRight.URL);
        
        //bottom thumb
        game.load.image(graphicAssets.bottomThumbDownLeft.name, graphicAssets.bottomThumbDownLeft.URL);
        game.load.image(graphicAssets.bottomThumbUpLeft.name, graphicAssets.bottomThumbUpLeft.URL);
        game.load.image(graphicAssets.bottomThumbDownRight.name, graphicAssets.bottomThumbDownRight.URL);
        game.load.image(graphicAssets.bottomThumbUpRight.name, graphicAssets.bottomThumbUpRight.URL);
    },
    
    //constructor
    create: function() {
        this.initGraphics();
        this.initSounds();
        this.initPhysics();
        this.initKeyboard();
    },

    //game loop
    update: function() {
        
    },
    
    initGraphics: function() {
        this.backgroundSprite = game.add.tileSprite(0, 0, gameProperties.screenWidth, gameProperties.screenHeight, graphicAssets.background.name);
        initThumbGraphics(this, game);
    },
    
    initSounds: function() {
        
    },
    
    initPhysics: function() {
        
    },
    
    initKeyboard: function() {
        
    },
};

//'gameDiv' is the id in index.html
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');

//links the name 'game' to the gameState
game.state.add(states.game, gameState);
game.state.start(states.game);