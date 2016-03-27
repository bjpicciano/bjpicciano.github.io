var gameProperties = {
    screenWidth: 800,
    screenHeight: 600,

    delayToStartLevel: 3,
};

var graphicAssets = {
    //sprites
    main: {URL:'assets/main.png', name:'main'},
    fish: {URL:'assets/fish.png', name:'fish'},
};

var soundAssets = {
    gulp: {URL: ['assets/gulp.ogg', 'assets/gulp.m4a'], name:'gulp'},
    death: {URL: ['assets/death.ogg', 'assets/death.m4a'], name:'death'},
};

var fontAssets = {
    counterFontStyle:{font: '20px Arial', fill: '#FFFFFF', align: 'center'},
};

//'gameDiv' is the id in index.html
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight);