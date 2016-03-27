var Fish = function (game, x, y, key, frame) {
    var size = game.rnd.realInRange(0.01, 0.4);
    if (key == undefined) { key = graphicAssets.fish.name; }
    if (x == undefined && y == undefined) {
        //worldSide set to either 0 or 1
        var worldSide = Math.round(Math.random());
        //gets the fishImage to calculate the padding before sprite is made
        var fishImage = game.cache.getImage(graphicAssets.fish.name);
        if (worldSide) {
            //x set to left or right of screen, random y
            var leftOrRight = Math.round(Math.random());
            var xPadding = (1/2)*(fishImage.width)*(size);
            if (!leftOrRight) {
                xPadding = -xPadding;
            }
            x = leftOrRight * gameProperties.screenWidth + xPadding;
            y = Math.random() * gameProperties.screenHeight;
        } else {
            //y set to either top or bottom of screen, random x
            var topOrBottom = Math.round(Math.random());
            var yPadding = (1/2)*(fishImage.height)*(size);
            if (!topOrBottom) {
                yPadding = -yPadding;
            }
            x = Math.random() * gameProperties.screenWidth;
            y = topOrBottom * gameProperties.screenHeight + yPadding;
        }
    }

    //call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y, key);
    this.anchor.setTo(0.5, 0.5);

    this.properties = {
        minVelocity: 25,
        maxVelocity: 300,
        size: size,
        growthInterval: 10,
    };

    this.scale.set(this.properties.size);
    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
};

Fish.prototype = Object.create(Phaser.Sprite.prototype);
Fish.prototype.constructor = Fish;

Fish.prototype.update = function () {
    this.updatePhysics();
};

Fish.prototype.updatePhysics = function () {
    this.checkBoundaries();
    if (this.body.velocity.x > 0) {
        this.flipSpriteRight()
    }
};

Fish.prototype.flipSpriteRight = function () {
    if (this.scale.x == this.properties.size) {
        this.scale.x *= -1;
    }
};

Fish.prototype.checkBoundaries = function () {
    if (this.x + this.width < 0) {
        this.kill();
    } else if (this.x - this.width > game.width) {
        this.kill();
    }
    if (this.y + this.height < 0) {
        this.kill();
    } else if (this.y - this.height > game.height) {
        this.kill();
    }
};