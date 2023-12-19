# CR🤪ZY 8's

## Overview

![ezgif com-video-to-gif-converted](https://github.com/dj980907/CrazyEights/assets/108609222/213f3cf9-2e16-4a8b-8da0-94e55f3b09d6)


### Description
This is a demo of an interactive card game, Crazy Eights, that allows two turns to be played (one "player" turn and one computer turn).
<ul>
    <li>the game uses a standard 52-card deck of French suited playing cards
    <li>a configuration file is used to set the cards remaining the in the draw pile, the player's hand and the computer's hand
    <li>alternatively, without a configuration, the game generates a deck of cards, shuffle, and deal five cards to each player
    <li>a single card is drawn from the draw pile - it is used as the starter
    <li>the starter card dictates the suit or rank that should be played next
        <ul>
            <li>for example, if the starter is 2♦️
            <li>…then the next card to played must have either a rank of 2 or a suit of ♦️
        </ul>
    <li>the player and computer alternate turns discarding a single card from their hand that matches either the suit or rank of the starter
    <li>a card with a rank of 8 can be placed at any time regardless of the rank and suit of the starter
    <li>if an 8 is played, then the suit of the starter can be set
        <ul>
            <li>for example, if the starter is 2♦️
            <li>…and an 8 is played
        </ul>
    <li>the suit can be set to any of the four suits: ♠️ ❤️ ♣️ ♦️
    <li>if a card cannot be played, cards must be drawn from the draw pile until a card can be played (otherwise pass)
    <li>the first to discard all of the cards in their hand wins!
</ul>

### Unit Tests
You can use the supplied unit tests (in test/test-cards.mjs) to check if the game is working well.

The given unit tests use Mocha as a testing framework and Chai for assertions. 

You can run the included unit tests by using this command in your project directory:
```
npx mocha test/test-cards.mjs
```
