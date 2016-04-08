var Player = function (game, x, y) {
    if (x == undefined) { x = game.world.width / 2; }
    if (y == undefined) { y = game.world.height / 2; }
    this.offset = 80;
    this.chinChin = 0;
    this.guessButtons = [];
    this.numberOfPlayers = 2; //PLACEHOLDER UNTIL MULTIPLE PLAYERS SUPPORTED

    //call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y);

    this.leftThumb = new Thumb(this.game, bottomThumbAssets.thumbDownLeft, true, -this.offset);
    this.addChild(this.leftThumb);

    this.rightThumb = new Thumb(this.game, bottomThumbAssets.thumbDownRight, true, this.offset);
    this.addChild(this.rightThumb);

    this.anchor.setTo(0.5, 0.5);

    game.add.existing(this);

    this.addGuessButtons();
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {

};

Player.prototype.execute = function () {
    this.leftThumb.jiggleTween.start();
    this.rightThumb.jiggleTween.start();
};

Player.prototype.hasClicked = function () {
    this.addGuessButtons();
};

Player.prototype.addGuessButtons = function () {
    this.removeGuessButtons();
    var numberOfButtons = this.getNumberOfGuessButtons();

    var x = this.game.world.centerX;
    var y = this.game.world.height / 1.15;
    var spacing = 48;

    for (var i = 0; i < numberOfButtons; i++) {
        x = (this.game.world.centerX - (spacing * (this.numberOfPlayers - 1))) + (spacing * (this.guessButtons.length));
        this.guessButtons.push(new GuessButton(this.game, i + this.chinChin, x, y));
    }
};

Player.prototype.removeGuessButtons = function () {
    for (var buttonIdx in this.guessButtons) {
        if (this.guessButtons.hasOwnProperty(buttonIdx)) {
            var button = this.guessButtons[buttonIdx];
            button.removeButton();
        }
    }

    this.guessButtons = [];
};

Player.prototype.getNumberOfGuessButtons = function () {
    //((number of players * 2) - 1
    return ((this.numberOfPlayers * 2) - 1);
};

Player.prototype.reset = function () {
    this.leftThumb.resetTexture();
    this.rightThumb.resetTexture();
    this.chinChin = 0;
    this.addGuessButtons()
};