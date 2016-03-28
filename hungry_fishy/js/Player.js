var Player = function (game, x, y, key, frame) {
    if (x == undefined) { x = game.world.width / 2; }
    if (y == undefined) { y = game.world.height / 2; }
    if (key == undefined) { key = graphicAssets.fish.name; }
    
    //call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y, key);
    this.anchor.setTo(0.5, 0.5);
    this.tint = 0xFF66FF;

    game.camera.follow(this);

    this.keys = {
        key_left : game.input.keyboard.addKey(Phaser.Keyboard.A),
        key_right : game.input.keyboard.addKey(Phaser.Keyboard.D),
        key_up : game.input.keyboard.addKey(Phaser.Keyboard.W),
        key_down : game.input.keyboard.addKey(Phaser.Keyboard.S),
        key_click : game.input.activePointer,
    };

    this.properties = {
        velocity: 200,
        size: 10/100,
        growthInterval: 10,
    };

    game.add.existing(this);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;

    this.body.setSize(this.body.width / 1.35, this.body.height / 1.35);
    this.scale.set(this.properties.size);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    this.updatePhysics();
    this.checkPlayerInput();
};

Player.prototype.updatePhysics = function () {
    if (this.body.velocity.x > 0) {
        this.flipSpriteRight();
    } else if (this.body.velocity.x < 0) {
        this.flipSpriteLeft();
    }
};

Player.prototype.grow = function () {
    this.properties.size += this.properties.size / this.properties.growthInterval;
    this.scale.set(this.properties.size);
};

Player.prototype.checkPlayerInput = function () {
    if (this.keys.key_click.isDown) {
        game.physics.arcade.moveToPointer(this, this.properties.velocity);
    } else {
        //up
        if (this.keys.key_up.isDown) {
            this.body.velocity.y = -this.properties.velocity;
            //down
        } else if (this.keys.key_down.isDown) {
            this.body.velocity.y = this.properties.velocity;
        } else {
            this.body.velocity.y = 0;
        }
        //right
        if (this.keys.key_right.isDown) {
            this.body.velocity.x = this.properties.velocity;
            //left
        } else if (this.keys.key_left.isDown) {
            this.body.velocity.x = -this.properties.velocity;
        } else {
            this.body.velocity.x = 0;
        }
    }
};

Player.prototype.flipSpriteLeft = function () {
    if (this.scale.x == -this.properties.size) {
        this.scale.x *= -1;
    }
};

Player.prototype.flipSpriteRight = function () {
    if (this.scale.x == this.properties.size) {
        this.scale.x *= -1;
    }
};