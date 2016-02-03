var thumbStates = {
	down: false,
	up: true,
};

var thumbsUpCount = 0;
var playerThumbsUpCount = 0;
var textDisplay = '';

//AI's thumbs
var topThumbProperties = {
	leftPos: {x: gameProperties.screenWidth / 2 + gameProperties.screenWidth / 6, y: gameProperties.screenHeight / 6},
	rightPos: {x: gameProperties.screenWidth / 2 - gameProperties.screenWidth / 6, y: gameProperties.screenHeight / 6},
	
	leftState: thumbStates.down,
	rightState: thumbStates.down,
};


//player's thumbs
var bottomThumbProperties = {
	leftPos: {x: gameProperties.screenWidth / 2 - gameProperties.screenWidth / 6, y: gameProperties.screenHeight / 2},
	rightPos: {x: gameProperties.screenWidth / 2 + gameProperties.screenWidth / 6, y: gameProperties.screenHeight / 2},
	
	leftState: thumbStates.down,
	rightState: thumbStates.down,
};

function initThumbGraphics(self, game) {
	initTopThumbGraphics(self, game);
	initBottomThumbGraphics(self, game);
	initButtonGraphics(self, game);
	
	this.textDisplay = game.add.text(gameProperties.screenWidth / 2, gameProperties.screenHeight / 2, 'Chin Chin ' + this.thumbsUpCount, { fill: '#000000' });
	this.textDisplay.align = 'center';
	this.textDisplay.anchor.set(0.5, 0.5);
}

function initTopThumbGraphics(self, game) {
	self.topThumbLeft = game.add.sprite(topThumbProperties.leftPos.x, topThumbProperties.leftPos.y, graphicAssets.topThumbDownLeft.name);
	self.topThumbLeft.anchor.set(0.5, 0.5);
	self.topThumbLeft.inputEnabled = true;
	self.topThumbLeft.events.onInputDown.add(topLeftClicked, this);
	
	self.topThumbRight = game.add.sprite(topThumbProperties.rightPos.x, topThumbProperties.rightPos.y, graphicAssets.topThumbDownRight.name);
	self.topThumbRight.anchor.set(0.5, 0.5);
	self.topThumbRight.inputEnabled = true;
	self.topThumbRight.events.onInputDown.add(topRightClicked, this);
};

function initBottomThumbGraphics(self, game) {
	self.bottomThumbLeft = game.add.sprite(bottomThumbProperties.leftPos.x, bottomThumbProperties.leftPos.y, graphicAssets.bottomThumbDownLeft.name);
	self.bottomThumbLeft.anchor.set(0.5, 0.5);
	self.bottomThumbLeft.inputEnabled = true;
	self.bottomThumbLeft.events.onInputDown.add(bottomLeftClicked, this);
	
	self.bottomThumbRight = game.add.sprite(bottomThumbProperties.rightPos.x, bottomThumbProperties.rightPos.y, graphicAssets.bottomThumbDownRight.name);
	self.bottomThumbRight.anchor.set(0.5, 0.5);
	self.bottomThumbRight.inputEnabled = true;
	self.bottomThumbRight.events.onInputDown.add(bottomRightClicked, this);
};

function initButtonGraphics(self, game) {
	self.button1 = game.add.sprite(bottomThumbProperties.leftPos.x, bottomThumbProperties.leftPos.y + 200, graphicAssets.button.name);
	self.button1.anchor.set(0.5, 0.5);
};

function topLeftClicked(topThumbLeft) {
	if (topThumbProperties.leftState) {
		topThumbLeft.loadTexture(graphicAssets.topThumbDownLeft.name);
		topThumbProperties.leftState = thumbStates.down;
		this.thumbsUpCount--;
		this.textDisplay.text = "Chin Chin " + this.playerThumbsUpCount;
	} else {
		topThumbLeft.loadTexture(graphicAssets.topThumbUpLeft.name);
		topThumbProperties.leftState = thumbStates.up;
		this.thumbsUpCount++;
		this.textDisplay.text = "Chin Chin " + this.playerThumbsUpCount;
	}
};

function topRightClicked(topThumbRight) {
	if (topThumbProperties.RightState) {
		topThumbRight.loadTexture(graphicAssets.topThumbDownRight.name);
		topThumbProperties.RightState = thumbStates.down;
		this.thumbsUpCount--;
		this.textDisplay.text = "Chin Chin " + this.playerThumbsUpCount;
	} else {
		topThumbRight.loadTexture(graphicAssets.topThumbUpRight.name);
		topThumbProperties.RightState = thumbStates.up;
		this.thumbsUpCount++;
		this.textDisplay.text = "Chin Chin " + this.playerThumbsUpCount;
	};
};

function bottomLeftClicked(bottomThumbLeft) {
	if (bottomThumbProperties.leftState) {
		bottomThumbLeft.loadTexture(graphicAssets.bottomThumbDownLeft.name);
		bottomThumbProperties.leftState = thumbStates.down;
		this.thumbsUpCount--;
		this.playerThumbsUpCount--;
		this.textDisplay.text = "Chin Chin " + this.playerThumbsUpCount;
	} else {
		bottomThumbLeft.loadTexture(graphicAssets.bottomThumbUpLeft.name);
		bottomThumbProperties.leftState = thumbStates.up;
		this.thumbsUpCount++;
		this.playerThumbsUpCount++;
		this.textDisplay.text = "Chin Chin " + this.playerThumbsUpCount;
	}
};

function bottomRightClicked(bottomThumbRight) {
	if (bottomThumbProperties.RightState) {
		bottomThumbRight.loadTexture(graphicAssets.bottomThumbDownRight.name);
		bottomThumbProperties.RightState = thumbStates.down;
		this.thumbsUpCount--;
		this.playerThumbsUpCount--;
		this.textDisplay.text = "Chin Chin " + this.playerThumbsUpCount;
	} else {
		bottomThumbRight.loadTexture(graphicAssets.bottomThumbUpRight.name);
		bottomThumbProperties.RightState = thumbStates.up;
		this.thumbsUpCount++;
		this.playerThumbsUpCount++;
		this.textDisplay.text = "Chin Chin " + this.playerThumbsUpCount;
	}
};

function jiggleThumbs() {
	
};

