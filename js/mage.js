/**
 * Mage wraps Phaser's sprites into a more usable abstraction layer.
 * Each mage has a hp (health points) and mp (mana points) that are consumed
 * when certain events happen in game.
 * Phaser sprite's prototype has not been extended to allow the usage of
 * game.add.sprite(...). Maybe there is a better solution.
 */

/**
 * Mage constructor.
 * For obvious reasons you can't mutually define an opponent for two mages
 * before they are created so you MUST use the method setOpponent.
 * @param {number} hp          Health points
 * @param {number} mp          Mana points
 * @param {Phaser.Game} game   An instance of the current game
 * @param {boolean} localPlayer Whether this mage is the local player or the remote one
 */
var Mage = function(hp, mp, game, localPlayer) {
    var localPlayerSprite, remotePlayerSprite,
        yPosSection = (localPlayer)? (3 / 4) : (1 / 4);
    // Initialization of the mage
    this.hp = hp;
    this.mp = mp;
    this.game = game;
    this.sprite = game.add.sprite(
                    game.world.width / 2,
                    0,
                    'mage');
    this.spellLibrary = new SpellLibrary(this, game);
    game.physics.arcade.enable(this.sprite);
    // TODO Pack the common settings together
    if (localPlayer) { // This mage is the local player controlled by the keyboard
        localPlayerSprite = this.sprite;
        localPlayerSprite.y = game.world.height * (3 / 4);
        localPlayerSprite.scale.setTo(0.2, 0.2);
        localPlayerSprite.anchor.setTo(0.5, 0.5);
        localPlayerSprite.rotation = 0; // Face the other mage
        localPlayerSprite.body.setSize(
            localPlayerSprite.width, localPlayerSprite.height);
        localPlayerSprite.body.collideWorldBounds = true;
        this.cursors = game.input.keyboard.createCursorKeys();
        this.initialRotation = Math.PI / 2;
        // Set the callback for when the user tries to cast a spell
        game.input.keyboard.onDownCallback = this.chargeSpell.bind(this);
    } else {
        remotePlayerSprite = this.sprite;
        remotePlayerSprite.y = game.world.height * (1 / 4);
        remotePlayerSprite.scale.setTo(0.2, -0.2);
        remotePlayerSprite.anchor.setTo(0.5, 0.5);
        remotePlayerSprite.rotation = 0; // Face the other mage
        remotePlayerSprite.body.collideWorldBounds = true;
        this.initialRotation = - Math.PI / 2;
    }
}

/**
 * Simply an abstraction for the spell library
 * @param {string} char The character pressed
 */
Mage.prototype.chargeSpell = function(evt) {
    var keyCode = evt.keyCode;
    var char;
    switch(keyCode) {
        case keyCodes.CTRL:
            this.spellLibrary.resetBuffer();
            break;
        default:
            if (keyCode >= 65 && keyCode <= 90) {
                char = String.fromCharCode(keyCode).toLowerCase();
                this.spellLibrary.addToBuffer(char);
            }
    }
}

/**
 * Update function for the mage. We need to know the position
 * of the other mage to enable autoaiming.
 * @param  {Mage} otherMage
 */
Mage.prototype.update = function() {
    this.move();
    this.spellLibrary.checkCollisions();
}


/**
 * Check what input events have been triggered
 * and execute the corresponding action.
 * @param {Mage} otherMage
 */
Mage.prototype.move = function() {
    var mageSprite = this.sprite,
        otherMage = this.opponent,
        otherMageSprite = otherMage.sprite,
        cursors = this.cursors,
        game = this.game,
        movingSpeed = 200;
    //  Reset the mageSprites velocity (movement)
    mageSprite.body.velocity.x = 0;
    mageSprite.body.velocity.y = 0;
    mageSprite.rotation = this.initialRotation + game.physics.arcade.moveToObject
                                                (mageSprite, otherMageSprite, 0);
    // TODO understand why the default rotation is -90 degrees
    if (cursors) {
        if (cursors.left.isDown) {
            //  Move to the left
            mageSprite.body.velocity.x = -movingSpeed;
        }
        if (cursors.right.isDown) {
            //  Move to the right
            mageSprite.body.velocity.x = movingSpeed;
        }
        if (cursors.up.isDown) {
            //  Move to the left
            mageSprite.body.velocity.y = -movingSpeed;
        }
        if (cursors.down.isDown) {
            //  Move to the right
            mageSprite.body.velocity.y = movingSpeed;
        }
    }

}

/**
 * Set the opponent mage for this mage.
 * MUST be called in the initialization phase.
 * @param {Mage} opponent The opponent mage
 */
Mage.prototype.setOpponent = function(opponent) {
    this.opponent = opponent;
}

/**
 * Static method to load the spritesheet in the game
 * @param {string} name Name of the spritesheet
 * @param {Phaser.Game} game An instance of the game
 */
Mage.loadSpritesheet = function(name, game) {
    game.load.spritesheet(name, 'assets/mage.png');
}
