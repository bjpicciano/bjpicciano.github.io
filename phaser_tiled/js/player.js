function Player (game, x, y) {
    this.game = game;
    
    this.properties = {
        velocity: 200,
        health: 5,
    };
    
    this.sprite = game.add.sprite(x, y, graphicAssets.player.name);
    this.sprite.anchor.set(0.5, 0.5); 
    
    game.camera.follow(this.sprite);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
}

Player.prototype = {
    update: function () {
        this.checkPlayerInput();
        
        this.updatePhysics();
    },
    
    updatePhysics: function () {
        game.world.wrap(this.sprite, gameProperties.padding);
    },
    
    //can't access gameState.layer for some reason, TEMP FIX
    collideWithTilemapLayer: function (layer) {
        game.physics.arcade.collide(this.sprite, layer);
    },
    
    checkPlayerInput: function () {
        if (gameState.key_up.isDown) {
            this.sprite.body.velocity.y = -this.properties.velocity;
        } else if (gameState.key_down.isDown) {
            this.sprite.body.velocity.y = this.properties.velocity;
        } else {
           this.sprite.body.velocity.y = 0;
        }
        
        if (gameState.key_right.isDown) {
           this.sprite.body.velocity.x = this.properties.velocity;
        } else if (gameState.key_left.isDown) {
           this.sprite.body.velocity.x = -this.properties.velocity;
        } else {
            this.sprite.body.velocity.x = 0;
        }
    },
    
    
}