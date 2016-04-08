var gameState = function(game){
    this.game = game;
    this.debug = false;
    this.player;
    this.opponent;
    this.wins = 0;
    this.losses = 0;
    this.chinChin = 0;
    this.resetTime = 850;
    this.ready = true;

    this.properties = {
        maxFish: 15,
    };
};

gameState.prototype = {

    render: function () {

    },

    init: function () {
        this.fishCount = this.properties.maxFish;
    },

    create: function () {
        this.snd_gulp = this.game.add.audio(soundAssets.gulp.name);
        this.snd_death = this.game.add.audio(soundAssets.death.name);
        this.game.stage.backgroundColor = 'rgb(230, 230, 255)';

        this.player = new Player(this.game, undefined, this.game.world.height * (2/3));
        this.player.addGuessButtons();
        this.opponent = new AI(this.game, undefined, this.game.world.height * (1/3));

        var style = { font: "16px Arial", align: "left"};
        this.tf_wins = game.add.text(64, 128, "Wins: " + this.wins, style);
        this.tf_wins.anchor.set(0.5);

        this.tf_losses = game.add.text(64, 192, "Defeats: " + this.losses, style);
        this.tf_losses.anchor.set(0.5);
    },

    hasGuessed: function (guess) {
        if (this.ready) {
            this.ready = false;

            this.player.execute();
            this.opponent.execute();

            var finalProduct = this.player.chinChin + this.opponent.chinChin;

            this.game.time.events.add(this.resetTime, function () {
                if (guess == finalProduct) {
                    this.wins++;
                    this.tf_wins.text = "Wins: " + this.wins;
                } else {
                    this.losses++;
                    this.tf_losses.text = "Defeats: " + this.losses;
                }

                this.player.reset();
                this.opponent.reset();
                this.ready = true;
            }, this);
        }
    },

    //resetFish: function () {
    //    for (var i = 0; i < this.fishCount; i++ ) {
    //        this.createFish();
    //    }
    //},

    //createFish: function () {
    //    var fish = new Fish(game);
    //    this.fishGroup.add(fish);
    //
    //    //powerup: make spin rapidly so the player can eat without size requirements
    //    //asteroid.body.angularVelocity = game.rnd.integerInRange(asteroidProperties[size].minAngularVelocity, asteroidProperties[size].maxAngularVelocity);
    //
    //    var randomAngle = game.math.degToRad(game.rnd.angle());
    //    var randomVelocity = game.rnd.integerInRange(fish.properties.minVelocity, fish.properties.maxVelocity);
    //
    //    game.physics.arcade.velocityFromRotation(randomAngle, randomVelocity, fish.body.velocity);
    //},

    update: function () {
        //this.textDisplay = "" + chinChin;
        //if (this.fishGroup.total < this.fishCount) {
        //    this.createFish();
        //}

        //game.physics.arcade.overlap(this.player, this.fishGroup, this.fishCollision, null, this);
    },

    //fishCollision: function (player, fish) {
    //    var playerSize = Math.sqrt(Math.pow(player.height, 2) + Math.pow(player.width, 2));
    //    var fishSize = Math.sqrt(Math.pow(fish.height, 2) + Math.pow(fish.width, 2));
    //
    //    if (playerSize > fishSize) {
    //        fish.kill();
    //        this.snd_gulp.play();
    //        this.player.grow();
    //    } else if (fishSize > playerSize) {
    //        player.kill();
    //        this.snd_death.play();
    //        game.time.events.add(Phaser.Timer.SECOND * 2, function () {game.state.start("gameState");}, this);
    //    }
    //},
};

game.state.add("gameState", gameState);