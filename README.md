# CR🤪ZY 8's

## Overview

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

### Assumptions
The functions make some assumptions about how I represent a deck of cards.

<ol>
    <li>each card should be represented by an object containing two properties, a rank and a suit
    <ul>the suit can be one of the following String values:
        <ul>
            <li>['♠️', '❤️', '♣️', '♦️']
            <li>(note that these emoji will be in the source code for cards.mjs)
        </ul>
        <li>the rank can be any of the following String values:
            <ul>
                <li>2 through 10 (as strings)
                <li>['J', 'Q', 'K', 'A']
            </ul>
        <li>an example of a card:
        ```
        {suit: '❤️', rank: '3'}
        ```
    </ul>
<li>a deck of cards, the player's hand or the computer's hand… can all be represented by an Array of card objects:
```
[
 {suit: '❤️', rank: '3'}
 {suit: '❤️', rank: 'A'}
 {suit: '♣️', rank: '7'}
]
```
<li>all of the functions treat a deck of cards as an Array
    <ul>
        <li>the end of an Array of cards is the "top" of the deck
        <li>when a card is "drawn" from a deck, it's taken from the end of the Array
    </ul>
</ol>