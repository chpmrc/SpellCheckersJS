/**
 * Phaser's game instance.
 * @type {Phaser}
 */
var game = new Phaser.Game(600, 600, Phaser.AUTO, '', {
                preload: preload, create: create, update: update });

var localMage,
    remoteMage;

function preload() {
    Mage.loadSpritesheet('mage', game);
    game.load.image('ground', 'assets/arena.jpg');
    game.load.image('fire', 'assets/fire.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'ground');

    // Create mages
    localMage = new Mage(100, 100, game, true);
    remoteMage = new Mage(100, 100, game, false);
    localMage.setOpponent(remoteMage);
    remoteMage.setOpponent(localMage);

}

function update() {
    localMage.update(remoteMage);
    remoteMage.update(localMage);
}
