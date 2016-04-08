var AI = function (game, x, y) {
    if (x == undefined) { x = game.world.width / 2; }
    if (y == undefined) { y = game.world.height / 2; }
    this.offset = 80;
    this.chinChin = 0;

    //call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y);

    this.leftThumb = new Thumb(this.game, topThumbAssets.thumbDownLeft, false, this.offset);
    this.addChild(this.leftThumb);

    this.rightThumb = new Thumb(this.game, topThumbAssets.thumbDownRight, false, -this.offset);
    this.addChild(this.rightThumb);

    this.anchor.setTo(0.5, 0.5);

    game.add.existing(this);
};

AI.prototype = Object.create(Phaser.Sprite.prototype);
AI.prototype.constructor = AI;

AI.prototype.execute = function () {
    this.leftThumb.jiggleTween.start();
    this.rightThumb.jiggleTween.start();

    this.chinChin = game.rnd.integerInRange(0, 2);
    var time = 500;

    switch (this.chinChin) {
        case 0:
            break;
        case 1:
            if (game.rnd.integerInRange(0, 1)) {
                this.leftThumb.toggleTexture();
            } else {
                this.rightThumb.toggleTexture();
            }
            break;
        case 2:
            this.leftThumb.toggleTexture();
            this.rightThumb.toggleTexture();
            break;
    }
};

AI.prototype.hasClicked = function (thumb) {
    //thumb.putDown();
};

AI.prototype.reset = function () {
    this.leftThumb.resetTexture();
    this.rightThumb.resetTexture();
    this.chinChin = 0;
};