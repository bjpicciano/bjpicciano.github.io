var Thumb = function (game, asset, input, x, y) {
    this.game = game;
    this.asset = asset;
    if (x == undefined) { x = 0; }
    if (y == undefined) { y = 0; }

    //call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y, asset.key);
    if (input) { this.inputEnabled = input; }

    this.tint = "0x" + "ffffcc";

    this.jiggleTween = game.add.tween(this).to({
            y: this.y - 16,
        }, game.rnd.realInRange(155, 245), undefined, false, game.rnd.realInRange(0, 10), 0, true);

    this.anchor.setTo(0.5, 0.5);

    if (this.inputEnabled) {
        this.events.onInputDown.add(this.onClick, this);
    }

    this.game.add.existing(this);
};

Thumb.prototype = Object.create(Phaser.Sprite.prototype);
Thumb.prototype.constructor = Thumb;

Thumb.prototype.onClick = function () {
    if (this.key == this.asset.key) {
        this.toggleTexture();
        ++this.parent.chinChin;

        this.parent.hasClicked(this);
    } else if (this.key == this.asset.next) {
        this.toggleTexture();
        --this.parent.chinChin;

        this.parent.hasClicked(this);
    }
};

Thumb.prototype.toggleTexture = function () {
    if (this.key == this.asset.key) {
        this.loadTexture(this.asset.next);
    } else if (this.key == this.asset.next) {
        this.loadTexture(this.asset.key);
    }
};

Thumb.prototype.resetTexture = function () {
    if (this.key == this.asset.next) {
        this.loadTexture(this.asset.key);
    }
};

Thumb.prototype.myTurn = function () {
};