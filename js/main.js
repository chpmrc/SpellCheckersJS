var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('ground', 'assets/arena.jpg');
    game.load.spritesheet('mage', 'assets/mage.png');

}

var player, opponent;
var cursors;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'ground');

    // The player and its settings
    player = game.add.sprite(game.world.width / 2, game.world.height * (3 / 4), 'mage');
    player.scale.setTo(0.2, 0.2);
    player.anchor.setTo(0.5, 0.5);
    player.rotation = 0;

    opponent = game.add.sprite(game.world.width / 2, game.world.height * (1 / 4), 'mage');
    opponent.scale.setTo(0.2, -0.2);
    opponent.anchor.setTo(0.5, 0.5);

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(opponent);

    player.body.setSize(player.width, player.height);


    //  Player physics properties. Give the little guy a slight bounce.
    player.body.collideWorldBounds = true;
    opponent.body.collideWorldBounds = true;

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    console.log(player);
}

function update() {

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    player.rotation = Math.PI / 2 + game.physics.arcade.moveToObject(player, opponent, 0); // TODO understand why the default rotation is -90 degrees

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

    }
    if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

    }
    if (cursors.up.isDown)
    {
        //  Move to the left
        player.body.velocity.y = -150;

    }
    if (cursors.down.isDown)
    {
        //  Move to the right
        player.body.velocity.y = 150;

    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}
