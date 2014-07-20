/**
 * Mage wraps Phaser's sprites into a more usable abstraction layer.
 * Each mage has a hp (health points) and mp (mana points) that are consumed
 * when certain events happen in game.
 * Phaser sprite's prototype has not been extended to allow the usage of
 * game.add.sprite(...). Maybe there is a better solution (TODO).
 */

/**
 * Mage constructor.
 * @param {number} hp
 * @param {number} mp
 * @param {Phaser.sprite} [sprite]
 */
var Mage = function(hp, mp, sprite, cursors, initialRotation) {
    this.hp = hp;
    this.mp = mp;
    this.sprite = sprite;
    this.cursors = cursors;
    this.initialRotation = initialRotation || 0;
}

/**
 * Simply set the sprite.
 * @param {Phaser.sprite} sprite The sprite
 */
Mage.prototype.setSprite = function(sprite) {
    this.sprite = sprite;
}

/**
 * Update function for the mage. We need to know the position
 * of the other mage to enable autoaiming.
 * @param  {Mage} otherMage
 */
Mage.prototype.update = function(otherMage) {
    this.checkInput(otherMage);
}

Mage.prototype.checkInput = function(otherMage) {
    var mageSprite = this.sprite,
        otherMageSprite = otherMage.sprite,
        cursors = this.cursors;

    //  Reset the mageSprites velocity (movement)
    mageSprite.body.velocity.x = 0;
    mageSprite.body.velocity.y = 0;
    mageSprite.rotation = this.initialRotation + game.physics.arcade.moveToObject(mageSprite, otherMageSprite, 0); // TODO understand why the default rotation is -90 degrees

    if (cursors) {
        if (cursors.left.isDown)
        {
            //  Move to the left
            mageSprite.body.velocity.x = -150;

        }
        if (cursors.right.isDown)
        {
            //  Move to the right
            mageSprite.body.velocity.x = 150;

        }
        if (cursors.up.isDown)
        {
            //  Move to the left
            mageSprite.body.velocity.y = -150;

        }
        if (cursors.down.isDown)
        {
            //  Move to the right
            mageSprite.body.velocity.y = 150;

        }
    }

}
