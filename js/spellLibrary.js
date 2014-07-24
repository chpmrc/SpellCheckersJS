/**
 * This object is responsible for handling how and what spells mages cast.
 * Spells are static objects of the object while every instance has a buffer
 * used to store what the mages/players type.
 */

/**
 * SpellLibrary constructor
 * @param {Mage} mage The mage that owns this library
 */
var SpellLibrary = function(mage) {
    var game = mage.game;
    this.buffer = ''; // Let's just use a string
    this.mage = mage;
    // Let's create the structure for the spells' sprites
    this.spellSprites = {};
    // Build the spells' sprites
    for (var spell in SpellLibrary.spells) {
        this.spellSprites[spell] = game.add.group();
        this.spellSprites[spell].enableBody = true;
        this.spellSprites[spell].physicsBodyType = Phaser.Physics.ARCADE;
        this.spellSprites[spell].createMultiple(30, spell, 0, false);
        this.spellSprites[spell].setAll('anchor.x', 0.5);
        this.spellSprites[spell].setAll('anchor.y', 0.5);
        this.spellSprites[spell].setAll('outOfBoundsKill', true);
        this.spellSprites[spell].setAll('checkWorldBounds', true);
    }
};

/**
 * Add the typed character to the buffer and checks if a spell can be casted
 * @param {string} char The character typed
 */
SpellLibrary.prototype.addToBuffer = function(char) {
    var potentialSpell;
    this.buffer += char;
    potentialSpell = this.buffer;
    if (SpellLibrary.spells[potentialSpell]) {
        this.cast(potentialSpell);
        this.resetBuffer();
    }
    console.log(this.buffer);
};

/**
 * Simply reset the buffer to an empty string
 */
SpellLibrary.prototype.resetBuffer = function() {
    this.buffer = '';
    console.log('Buffer reset!');
};

/**
 * Cast the given spell
 * @param  {string} spellName The name of the spell
 */
SpellLibrary.prototype.cast = function(spellName) {
    var mage = this.mage,
        opponentMage = this.mage.opponent,
        game = mage.game,
        spellSprite;

    console.log(mage, opponentMage);
    // Pick a sprite from the spell's sprites pool and move it around
    spellSprite = this.spellSprites[spellName].getFirstExists(false);
    spellSprite.reset(mage.sprite.x, mage.sprite.y);
    spellSprite.rotation = game.physics.arcade.moveToObject(
                                spellSprite, opponentMage.sprite, 100);
    console.log(this.spellSprites);
};

/**
 * A list of spells in this library (TODO put in an external JSON file)
 * @type {Object}
 */
SpellLibrary.spells = {
    fire: {
        damage: 10,
        effects: null,
        speed: 5,
        cost: 10,

    }
};
