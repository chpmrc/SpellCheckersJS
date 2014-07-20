/**
 * Phaser's game instance.
 * @type {Phaser}
 */
var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var localMage,
    remoteMage,
    localPlayerSprite,
    remotePlayerSprite,
    cursors;

function preload() {

    game.load.image('ground', 'assets/arena.jpg');
    game.load.spritesheet('mage', 'assets/mage.png');

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'ground');

    localPlayerSprite = game.add.sprite(game.world.width / 2, game.world.height * (3 / 4), 'mage');
    remotePlayerSprite = game.add.sprite(game.world.width / 2, game.world.height * (1 / 4), 'mage');

    game.physics.arcade.enable(localPlayerSprite);
    game.physics.arcade.enable(remotePlayerSprite);

    localPlayerSprite.scale.setTo(0.2, 0.2);
    localPlayerSprite.anchor.setTo(0.5, 0.5);
    localPlayerSprite.rotation = 0; // Face the other mage
    localPlayerSprite.body.setSize(localPlayerSprite.width, localPlayerSprite.height);
    localPlayerSprite.body.collideWorldBounds = true;

    remotePlayerSprite.scale.setTo(0.2, -0.2);
    remotePlayerSprite.anchor.setTo(0.5, 0.5);
    remotePlayerSprite.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();

    // Create mages
    localMage = new Mage(100, 100, localPlayerSprite, cursors, Math.PI/2.0);
    remoteMage = new Mage(100, 100, remotePlayerSprite, null, -Math.PI/2.0); // Controlled by net (TODO)
}

function update() {

    localMage.update(remoteMage);
    remoteMage.update(localMage);
}
