# SpellCheckersJS

SpellCheckersJS is a duel between two mages in an arena. Each player can only change his mage's appearances but no numeric value determines whether a mage is "stronger" or "weaker" than another one. That is, SpellCheckersJS is a bit like chess: it's solely based on the players' skills.

Each mage has access to a potentially infinite array of spells. Each spell is linked to its own name.

## Beginning of the duel

When the duel starts the mages face one another, they have 100 HP each and 100 MP each. Health does not recover on a regular basis while mana (MP = mana points) recovers 5 MP (**<- CHANGE THE VALUE!**) every second.

## Controls

### Movement and aiming

While playing each player has complete freedom of movement through the use of arrow-keys. Both mages move at the same speed unless one of them casts a spell which modifies such behavior (e.g. makes the opponent slower or himself faster).

While moving each player constantly faces the opponent so that aiming is automatic. At any moment a player can dodge a spell by simply moving.

### Casting a spell

Here's how SpellCheckersJS is different than other similar games (e.g. Magicka). To cast a spell the player has to type the word linked to that particular spell. An example might be _fireball_ that throws a ball of fire to the opponent.

This follows the definition of "spell". From Wikipedia:

> "A spell, charm, or incantation is a set of words, spoken or unspoken (prayer). Casting a spell is considered by its user to invoke some magical effect."  

There is no need to press **Enter** (or any "end of action" button) after typing the name of the spell.

Each spell has different charateristics and a damages the player in different ways.

#### Spells

| Name | Damage | Effects | Cost
| :------------- | :------------- | :-------------
| Fireball       | 10 HP       | None | 10 MP

##### Fireball
*    **Name**: fireball
*    **Damage**: 10 HP
*    **Effects**: None

## End of the duel

The duel simply ends when one of the players loses all of his HP (health points).

# Notes
This game was originally prototyped in C++ using OpenGL. Please see _SpellCheckers_.
