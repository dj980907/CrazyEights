// game.mjs

import {
    generateDeck,
    shuffle,
    deal,
    handToString,
    drawUntilPlayable
} from '../lib/cards.mjs';
import {question} from 'readline-sync';
import clear from 'clear';
import {readFile} from 'fs';
import os from 'os';

// node "/Users/dongjoolee/Desktop/NYU/Fall2023/AIT/hw1/homework01-dj980907/bin/game.mjs" "/Users/dongjoolee/Desktop/NYU/Fall2023/AIT/hw1/homework01-dj980907/test/test-01-draw-and-find-an-8.json"

// Function to generate a deck, shuffle, and deal hands
function initializeGame() {
  const deck = shuffle(generateDeck());
  const players = deal(deck, 2, 5);
  console.log("this is the players: ", players);
  return players;
}

// Function to display a menu for choosing a suit (Crazy Eights)
function chooseSuit() {
    console.log('CRAZY EIGHTS! You played an 8 - choose a suit:');
    console.log('1: ♠️');
    console.log('2: ❤️');
    console.log('3: ♣️');
    console.log('4: ♦️');
    const userInput = question('Enter your suit choice: ') - 1;
    if (userInput >= 0 && userInput < 4) {
      return ['♠️', '❤️', '♣️', '♦️'][userInput];
    }
    return null;
}

// Function to clear the console screen
function clearScreen() {
    clear(); 
}

// Function to check if a player has won
function hasWon(playerHand) {
    return playerHand.length === 0;
}

// Function to check if a card can be played
function canPlayCard(card, topCard) {
    return (
      card.suit === topCard.suit ||
      card.rank === topCard.rank ||
      card.rank === '8'
    );
}

// Function to display the game state
function displayGameState(computerHand, playerHand, topCard, deck) {
    clearScreen();
  
    console.log("              CR🤪ZY 8's");
    console.log('-----------------------------------------------');
    console.log(`Next suit/rank to play: ➡️  ${topCard.rank}${topCard.suit}  ⬅️`);
    console.log('-----------------------------------------------');
    console.log(`Top of discard pile: ${topCard.rank}${topCard.suit}`);
    console.log(`Number of cards left in deck: ${deck.length}`);
    console.log('-----------------------------------------------');
    console.log(`🤖✋ (computer hand): ${handToString(computerHand)}`);
    console.log(`😊✋ (player hand): ${handToString(playerHand)}`);
    console.log('-----------------------------------------------');
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function noJSONVer() {

    // initialize the game
    // players will have array of cards each 
    // {deck:[],hands[[computer hand],[player hand]]}
    const players = initializeGame();

    // current player identifier (1 is a player, 2 is computer)
    let currentPlayer = 1;

    // boolean for 
    let gameOver = false;

    let flag = true;

    // players.deck = deck;

    // discard pile array
    const discardPile = [players.deck.pop()];

    // check for the starter card to be 8
    // if it is then keep drawing from the deck
    while(flag){
        if(discardPile[discardPile.length - 1].rank === '8'){
            discardPile.push(players.deck.pop());
        }
        else{
            flag = false;
        }
    }


    // while the game is not over
    while (!gameOver) {

        // current hand
        const currentPlayerHand = players.hands[currentPlayer];

        // top card (to make it easier for me to read the code)
        const topCard = discardPile[discardPile.length - 1];

        // display the game state
        displayGameState(players.hands[0], players.hands[1], topCard, players.deck);

        // if the current player is "the player"
        if (currentPlayer === 1) {
            // Player's turn
            console.log('😊 Player\'s turn...');

            // Check if the player has playable cards
            const playableCards = currentPlayerHand.filter(card => canPlayCard(card, topCard));
            // const playableCards = currentPlayerHand;

            // if the player has card
            if (playableCards.length > 0) {

                console.log('Enter the number of the card you would like to play:');
                console.log(handToString(currentPlayerHand, os.EOL, true));

                // user input
                const userInput = question('Enter your choice: ') - 1;

                if (userInput >= 0 && userInput < currentPlayerHand.length) {

                    const cardToPlay = currentPlayerHand[userInput];

                    // Handle Crazy Eights
                    if (cardToPlay.rank === '8') {
                        const chosenSuit = chooseSuit();
                        if (chosenSuit === null) {
                            console.log('Invalid suit choice. Please try again.');
                            continue; // Loop back to suit selection
                        }
                        cardToPlay.suit = chosenSuit;
                    }

                    // Remove the played card from the player's hand and add it to the discard pile
                    const cardIndex = currentPlayerHand.indexOf(cardToPlay);
                    currentPlayerHand.splice(cardIndex, 1);
                    discardPile.push(cardToPlay);

                    // check if the current won
                    if (hasWon(currentPlayerHand)) {
                        displayGameState(players.hands[0], players.hands[1], topCard, players.deck);
                        console.log("Player Won!!!!");
                        gameOver = true;
                        break;
                    }
                }
            } 
            else {
                // Player cannot play a card, so they must draw until they can play
                console.log('😔 You have no playable cards');
                console.log(`Press ENTER to draw cards until matching: ${topCard.rank}, ${topCard.suit}, 8`);
                // wait for the enter key
                question(); 

                // draw card until there is something to play
                const [newDeck, drawnCards] = drawUntilPlayable(players.deck, topCard);
                // update the deck
                players.deck = newDeck;
                currentPlayerHand.push(...drawnCards);

                console.log('Cards drawn:', handToString(drawnCards));
                console.log('Card played:', handToString([drawnCards[drawnCards.length - 1]]));
                question('Press ENTER to continue');
            }
        } 
        else {
            // Computer's turn 
            console.log('🤖 Computer\'s turn...');

            // Check if the computer has playable cards
            const playableCards = currentPlayerHand.filter(card => canPlayCard(card, topCard));

            // if the computer has card
            if (playableCards.length > 0) {

                // create a random number for computer to choose the options
                const randomCardIndex = randomNumber(1,playableCards.length) - 1;

                if (randomCardIndex >= 0 && randomCardIndex < playableCards.length) {

                    const cardToPlay = playableCards[randomCardIndex];

                    // Handle Crazy Eights
                    if (cardToPlay.rank === '8') {

                        // create a random number for computer to choose suit
                        const randomSuitIndex = randomNumber(1,4) - 1;

                        // get the random suit
                        const chosenSuit = ['♠️', '❤️', '♣️', '♦️'][randomSuitIndex];


                        if (chosenSuit === null) {
                            console.log('Invalid suit choice. Please try again.');
                            continue;
                        }

                        // update the cardToPlay
                        cardToPlay.suit = chosenSuit;
                    }

                    // Remove the played card from the player's hand and add it to the discard pile
                    const cardIndex = currentPlayerHand.indexOf(cardToPlay);
                    currentPlayerHand.splice(cardIndex, 1);
                    discardPile.push(cardToPlay);

                    // check if the computer won
                    if (hasWon(currentPlayerHand)) {
                        displayGameState(players.hands[0], players.hands[1], topCard, players.deck);
                        console.log("Computer Won... Shame...");
                        gameOver = true;
                        break;
                    }
                }
            } 
            else {
                // computer cannot play a card, so it must draw until it can play
                const [newDeck, drawnCards] = drawUntilPlayable(players.deck, topCard);

                // update the deck
                players.deck = newDeck;
                currentPlayerHand.push(...drawnCards);

                // console.log('Cards drawn:', handToString(drawnCards));
                // console.log('Card played:', handToString([drawnCards[drawnCards.length - 1]]));
            }

        }

        // Switch to the next player
        currentPlayer = (currentPlayer + 1) % 2;
    }

}

function JSONgame(a,b,c,d,e){

    let deck = a;
    const playerHand = b;
    const computerHand = c;
    const discardPile = d;
    let nextPlay = e;

    // current player identifier (1 is a player, 2 is computer)
    let currentPlayer = 1;

    // boolean for 
    let gameOver = false;

    while(!gameOver || deck.length > 0){
        // top card (to make it easier for me to read the code)
        nextPlay = discardPile[discardPile.length - 1];

        // display the game state
        displayGameState(computerHand, playerHand, nextPlay, deck);

        // if the current player is "the player"
        if (currentPlayer === 1) {
            // Player's turn
            console.log('😊 Player\'s turn...');

            // if the player has card
            // matchesAnyProperty(playerHand,nextPlay)
            const playableCards = playerHand.filter(card => canPlayCard(card, nextPlay));
            // const playableCards = currentPlayerHand;

            // if the player has card
            if (playableCards.length > 0) {

                console.log('Enter the number of the card you would like to play:');
                console.log(handToString(playerHand, os.EOL, true));

                // user input
                const userInput = question('Enter your choice: ') - 1;

                if (userInput >= 0 && userInput < playerHand.length) {

                    const cardToPlay = playerHand[userInput];

                    // Handle Crazy Eights
                    if (cardToPlay.rank === '8') {
                        const chosenSuit = chooseSuit();
                        if (chosenSuit === null) {
                            console.log('Invalid suit choice. Please try again.');
                            continue; // Loop back to suit selection
                        }
                        cardToPlay.suit = chosenSuit;
                    }

                    // Remove the played card from the player's hand and add it to the discard pile
                    const cardIndex = playerHand.indexOf(cardToPlay);
                    playerHand.splice(cardIndex, 1);
                    discardPile.push(cardToPlay);

                    // check if the current won
                    if (hasWon(playerHand)) {
                        displayGameState(computerHand, playerHand, nextPlay, deck);
                        console.log("Player Won!!!!");
                        gameOver = true;
                        break;
                    }
                }
            } 
            else {
                // Player cannot play a card, so they must draw until they can play
                console.log('😔 You have no playable cards');
                console.log(`Press ENTER to draw cards until matching: ${nextPlay.rank}, ${nextPlay.suit}, 8`);
                // wait for the enter key
                question(); 

                // draw card until there is something to play
                const [newDeck, drawnCards] = drawUntilPlayable(deck, nextPlay);
                // update the deck
                deck = newDeck;
                playerHand.push(...drawnCards);

                console.log('Cards drawn:', handToString(drawnCards));
                console.log('Card played:', handToString([drawnCards[drawnCards.length - 1]]));
                question('Press ENTER to continue');
            }
        } 
        else {
            // Computer's turn 
            console.log('🤖 Computer\'s turn...');

            // Check if the computer has playable cards
            const playableCards = computerHand.filter(card => canPlayCard(card, nextPlay));

            // if the computer has card
            if (playableCards.length > 0) {

                // create a random number for computer to choose the options
                const randomCardIndex = randomNumber(1,playableCards.length) - 1;

                if (randomCardIndex >= 0 && randomCardIndex < playableCards.length) {

                    const cardToPlay = playableCards[randomCardIndex];

                    // Handle Crazy Eights
                    if (cardToPlay.rank === '8') {

                        // create a random number for computer to choose suit
                        const randomSuitIndex = randomNumber(1,4) - 1;

                        // get the random suit
                        const chosenSuit = ['♠️', '❤️', '♣️', '♦️'][randomSuitIndex];


                        if (chosenSuit === null) {
                            console.log('Invalid suit choice. Please try again.');
                            continue;
                        }

                        // update the cardToPlay
                        cardToPlay.suit = chosenSuit;
                    }

                    // Remove the played card from the player's hand and add it to the discard pile
                    const cardIndex = computerHand.indexOf(cardToPlay);
                    computerHand.splice(cardIndex, 1);
                    discardPile.push(cardToPlay);

                    // check if the computer won
                    if (hasWon(computerHand)) {
                        displayGameState(computerHand, playerHand, nextPlay, deck);
                        console.log("Computer Won... Shame...");
                        gameOver = true;
                        break;
                    }
                }
            } 
            else {
                // computer cannot play a card, so it must draw until it can play
                const [newDeck, drawnCards] = drawUntilPlayable(deck, nextPlay);

                // update the deck
                deck = newDeck;
                computerHand.push(...drawnCards);

            }

        }
        currentPlayer = (currentPlayer + 1) % 2;
    }
}

// version that takes in JSON as input
function JSONVer(){

    // read json
    readFile(process.argv[2], 'utf8', (err, data) => {

        // parse the data
        const test = JSON.parse(data);
        // put it on appropriate variable
        const deck = test["deck"];
        const playerHand = test["playerHand"];
        const computerHand = test["computerHand"];
        const discardPile = test["discardPile"];
        const nextPlay = test["nextPlay"];

        JSONgame(deck,playerHand,computerHand,discardPile,nextPlay);
        
    });

}

// main function
function main(){
    if(process.argv.length === 3){
        JSONVer();
    }
    else if(process.argv.length === 2){
        noJSONVer();
    }
    else{
        noJSONVer();
    }
}

// main function call
main();