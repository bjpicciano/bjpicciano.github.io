var gameProperties = {
    screenWidth: 800,
    screenHeight: 600,

    delayToStartLevel: 3,
};

var imageAssets = {
    circle: {URL: 'assets/circle.png', key: 'circle'},
    button: {URL: 'assets/button.png', key: 'button'},
};

var topThumbAssets = {
    thumbDownLeft: {URL: 'assets/topThumbDownLeft.png', key: 'topThumbDownLeft', next: 'topThumbUpLeft'},
    thumbDownRight: {URL: 'assets/topThumbDownRight.png', key: 'topThumbDownRight', next: 'topThumbUpRight'},
    thumbUpLeft: {URL: 'assets/topThumbUpLeft.png', key: 'topThumbUpLeft', next: 'topThumbDownLeft'},
    thumbUpRight: {URL: 'assets/topThumbUpRight.png', key: 'topThumbUpRight', next: 'topThumbDownRight'},
};

var bottomThumbAssets = {
    thumbDownLeft: {URL:'assets/bottomThumbDownLeft.png', key:'bottomThumbDownLeft', next: 'bottomThumbUpLeft'},
    thumbDownRight: {URL:'assets/bottomThumbDownRight.png', key:'bottomThumbDownRight', next: 'bottomThumbUpRight'},
    thumbUpLeft: {URL:'assets/bottomThumbUpLeft.png', key:'bottomThumbUpLeft', next: 'bottomThumbDownLeft'},
    thumbUpRight: {URL:'assets/bottomThumbUpRight.png', key:'bottomThumbUpRight', next: 'bottomThumbDownRight'},
};

var soundAssets = {
    gulp: {URL: ['assets/gulp.ogg', 'assets/gulp.m4a'], key:'gulp'},
    death: {URL: ['assets/death.ogg', 'assets/death.m4a'], key:'death'},
};

var fontAssets = {
    counterFontStyle:{font: '20px Arial', fill: '#FFFFFF', align: 'center'},
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight);