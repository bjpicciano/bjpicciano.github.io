var gameState = function (game) {
    this.enemies = [];
    this.player;
    
    this.map;
    this.layer = {};
    
    this.score;
    
    this.key_left;
    this.key_right;
    this.key_up;
    this.key_down;
};

var gameProperties = {
    screenWidth: 640,
    screenHeight: 480,
    
    padding: 15,
    
    delayToStartLevel: 3,
};

var states = {
    game: "game",
};

var graphicAssets = {
    //sprites
    player: {URL:'assets/player.png', name:'player'},
    tree: {URL:'assets/tree.png', name:'tree'},
    brick: {URL:'assets/brick.png', name:'brick'},
    skall: {URL:'assets/skall.png', name:'skall'},
    
    //tilemaps
    protoTiles: {URL:'assets/protoTiles.png', name:'protoTiles'},
    level1: {URL:'assets/protoTiles3.json', name:'level1'},
};

var fontAssets = {
    counterFontStyle:{font: '20px Arial', fill: '#FFFFFF', align: 'center'},
};

var game;