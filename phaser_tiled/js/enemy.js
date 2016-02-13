function Skall (game, index, player, x, y) {
    this.game = game;
    
    this.player = player;
    
    this.properties = {
        startX: x,
        startY: y,
        velocity: 100,
        velocityCharge: 300,
        fov: 300,
    };
    
    this.sprite = game.add.sprite(x, y, graphicAssets.skall.name);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.name = index;
    
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}

Skall.prototype = {
    update: function () {
        // game.physics.arcade.collide(this.sprite, this.player.sprite);
        this.idle();
    },
    
    //can't access gameState.layer for some reason, TEMP FIX
    collideWithTilemapLayer: function (layer) {
        game.physics.arcade.collide(this.sprite, layer);
    },
    
    idle: function () {
        if (this.isWithin(this.properties.fov/2.5, this.player.sprite)) {
            this.follow(this.player.sprite, this.properties.velocityCharge);
        } else if (this.isWithin(this.properties.fov, this.player.sprite)) {
            this.follow(this.player.sprite, this.properties.velocity);
        } else {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
    },
    
    follow: function (destinationSprite, speed) {
        game.physics.arcade.moveToObject(this.sprite, destinationSprite, speed);
    },
    
    isWithin: function (distance, destinationSprite) {
        if (game.physics.arcade.distanceBetween(this.sprite, destinationSprite) <= distance) {
            return true;
        }
        
        return false;
    },
}