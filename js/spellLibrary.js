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
    this.buffer = ''; // Let's just use a string
    this.mage = mage;
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
    // TODO
    console.log('Casting ' + spellName);
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
