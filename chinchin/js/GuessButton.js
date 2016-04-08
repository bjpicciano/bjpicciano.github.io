var GuessButton = function (game, text, x, y) {
    this.game = game;
    if (x == undefined) { x = 0; }
    if (y == undefined) { y = 0; }

    //call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, this.game, x, y, imageAssets.circle.key);
    this.anchor.setTo(0.5, 0.5);
    this.tint = "0x" + "eeffff";

    this.inputEnabled = true;
    this.events.onInputDown.add(this.onClick, this);

    this.game.add.existing(this);

    var style = { font: "16px Arial", align: "center"};
    this.txt = game.add.text(x, y+2, this.text = text, style);
    this.txt.anchor.set(0.5);

    this.scale.set(1.15);
};

GuessButton.prototype = Object.create(Phaser.Sprite.prototype);
GuessButton.prototype.constructor = GuessButton;

GuessButton.prototype.onClick = function () {
    this.game.state.getCurrentState().hasGuessed(this.text);
};

GuessButton.prototype.removeButton = function () {
    this.destroy();
    this.txt.kill();
};