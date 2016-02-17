function Player (game, x, y) {
    this.game = game;
    
    this.properties = {
        velocityStart: 300,
        velocitySprint: 350,
        velocity: 300,
        health: 5,
    };
    
    this.sprite = game.add.sprite(x, y, graphicAssets.player.name);
    this.sprite.anchor.set(0.5, 0.5); 
    
    game.camera.follow(this.sprite);
    //does collide with world's bounds
    // game.camera.bounds = false;
    
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    // game.physics.p2.enable(this.sprite);
}

Player.prototype = {
    update: function () {
        this.checkPlayerInput();
        
        this.updatePhysics();
    },
    
    updatePhysics: function () {
        // game.world.wrap(this.sprite, gameProperties.padding);
        game.physics.arcade.collide(this.sprite, game.state.getCurrentState().layer[1]);
    },
    
    checkPlayerInput: function () {
        if (gameProperties.type == "PC") {
            if (game.state.getCurrentState().keys.key_up.isDown) {           //Up  W
                this.sprite.body.velocity.y = -this.properties.velocity;
            } else if (game.state.getCurrentState().keys.key_down.isDown) {  //Down  D
                this.sprite.body.velocity.y = this.properties.velocity;
            } else {
            this.sprite.body.velocity.y = 0;
            }
            
            if (game.state.getCurrentState().keys.key_right.isDown) {        //Right  D
            this.sprite.body.velocity.x = this.properties.velocity;
            } else if (game.state.getCurrentState().keys.key_left.isDown) {  //Left  A
            this.sprite.body.velocity.x = -this.properties.velocity;
            } else {
                this.sprite.body.velocity.x = 0;
            }
            
            if (game.state.getCurrentState().keys.key_sprint.isDown) {
                this.properties.velocity = this.properties.velocitySprint;
            } else {
                this.properties.velocity = this.properties.velocityStart;
            }
        } else if (gameProperties.type == "MOB") {
            if (game.state.getCurrentState().keys.key_up.isDown) {
                game.physics.arcade.moveToPointer(this.sprite, this.properties.velocity);
            } else {
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = 0;
            }
        }
    },
}