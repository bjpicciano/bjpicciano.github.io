var gameState = function(game){
    this.debug = false;
    this.player;
    this.fishGroup;

    this.properties = {
        maxFish: 15,
    };
};

gameState.prototype = {

    render: function () {
        if (this.debug) {
            game.debug.body(this.player);

            this.fishGroup.forEachAlive(function (member) {
                game.debug.body(member);
            }, this);
        }
    },

    init: function () {
        this.fishCount = this.properties.maxFish;
    },

    create: function () {
        this.snd_gulp = game.add.audio(soundAssets.gulp.name);
        this.snd_death = game.add.audio(soundAssets.death.name);

        game.stage.backgroundColor = 'rgb(68, 136, 170)';
        this.player = new Player(game);
        this.fishGroup = game.add.group();
        this.resetFish();
    },

    resetFish: function () {
        for (var i = 0; i < this.fishCount; i++ ) {
            this.createFish();
        }
    },

    createFish: function () {
        var fish = new Fish(game);
        this.fishGroup.add(fish);

        //powerup: make spin rapidly so the player can eat without size requirements
        //asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties[size].minAngularVelocity, asteroidProperties[size].maxAngularVelocity);

        var randomAngle = game.math.degToRad(game.rnd.angle());
        var randomVelocity = game.rnd.integerInRange(fish.properties.minVelocity, fish.properties.maxVelocity);

        game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, fish.body.velocity);
    },

    update: function () {
        if (this.fishGroup.total < this.fishCount) {
            this.createFish();
        }

        game.physics.arcade.overlap(this.player, this.fishGroup, this.fishCollision, null, this);
    },

    fishCollision: function (player, fish) {
        var playerSize = Math.sqrt(Math.pow(player.height, 2) + Math.pow(player.width, 2));
        var fishSize = Math.sqrt(Math.pow(fish.height, 2) + Math.pow(fish.width, 2));

        if (playerSize > fishSize) {
            fish.kill();
            this.snd_gulp.play();
            this.player.grow();
        } else if (fishSize > playerSize) {
            player.kill();
            this.snd_death.play();
            game.time.events.add(Phaser.Timer.SECOND * 2, function () {game.state.start("gameState");}, this);
        }
    },
};

game.state.add("gameState", gameState);