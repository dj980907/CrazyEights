// cards.mjs
const suits = {SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️'};


//first function called range
function range(){

    const resultArray = [];
    let start, end, inc;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/length
    // I got the idea of arguments.length from this website

    if(arguments.length === 1){
        start = 0;
        end = arguments[0];
        inc = 1;
        for(let i = 0; i < end; i++){
            resultArray.push(i);
        }
    }
    else if(arguments.length === 2){
        start = arguments[0];
        end = arguments[1];
        inc = 1;
        for(let i = start; i < end; i++){
            resultArray.push(i);
        }
    }
    else{
        start = arguments[0];
        end = arguments[1];
        inc = arguments[2];
        for(let i = start; i < end; i+=inc){
            resultArray.push(i);
        }
    }

    return resultArray;
}

//second function called generateDeck
function generateDeck(){

    const deck = [];

    // https://www.golinuxcloud.com/javascript-print-object/#:~:text=Method%2D1%3A%20Use%20console.,-log%20to%20print&text=to%20the%20console.-,log()%20method.,the%20properties%20within%20curly%20braces.
    // I got the idea of for(const value in suits) from this website
    for (const value in suits) {

        let card;

        for(let i = 0; i < 10; i++){
            if(i === 0){
                card = {suit: suits[value], rank: 'A'};
                deck.push(card);
            }
            else{
                card = {suit: suits[value], rank: `${i+1}`};
                deck.push(card);
            }
        }

        for(let j = 0; j < 3; j++){
            if(j === 0){
                card = {suit: suits[value], rank: 'J'};
                deck.push(card);
            }
            else if(j === 1){
                card = {suit: suits[value], rank: 'Q'};
                deck.push(card);
            }
            else{
                card = {suit: suits[value], rank: 'K'};
                deck.push(card);
            }
        }
    }

    return deck;
    // console.log(deck);
    // console.log("the number of cards is", deck.length);
}

// third function called shuffle
function shuffle(deck) {

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // I got the idea of how to shuffle an array from this website
    const shuffledDeck = [...deck];

    let currentIndex = shuffledDeck.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
            shuffledDeck[randomIndex], shuffledDeck[currentIndex]];
    }

    return shuffledDeck;
}

function draw(cardsArray, n){

    const copy = [...cardsArray];
    const drawnCards = [];
    const returnArray = [];

    if(arguments.length === 1){
        drawnCards.push(copy[copy.length-1]);
        copy.pop();
    }
    else{
        for(let i = 0; i < n; i++){
            drawnCards.push(copy[copy.length-1]);
            copy.pop();
        }
    }

    returnArray[0] = copy;
    returnArray[1] = drawnCards;

    return returnArray;
    // console.log(returnArray);
}


// -----------------------------------------------
function deal(cardsArray, numHands, cardsPerHand){

    const hands = [];

    const deck = [...cardsArray];

    if(arguments.length === 1){
        numHands = 2;
        cardsPerHand = 5;
        for(let i = 0; i < numHands; i++){
            const pushHands = [];
            for(let j = 0; j < cardsPerHand; j++){
                pushHands.push(deck.pop());
            }
            hands.push(pushHands);
        }
    }
    else if(arguments.length === 2){
        numHands = arguments[1];
        cardsPerHand = 5;
        for(let i = 0; i < numHands; i++){
            const pushHands = [];
            for(let j = 0; j < cardsPerHand; j++){
                pushHands.push(deck.pop());
            }
            hands.push(pushHands);
        }
    }
    else{
        numHands = arguments[1];
        cardsPerHand = arguments[2];
        for(let i = 0; i < numHands; i++){
            const pushHands = [];
            for(let j = 0; j < cardsPerHand; j++){
                pushHands.push(deck.pop());
            }
            hands.push(pushHands);
        }
    }

    // console.log("this is new deck",newDeck);

    const obj = {deck, hands};
    // console.log(obj);

    return obj;
    
}

function handToString(hand, sep, numbers){
    let result = "";

    if(arguments.length === 1){
        sep = '  ';
        numbers = false;

        for(let i = 0; i < hand.length; i++){
            if(i !== hand.length-1){
                result += hand[i].rank + hand[i].suit + sep;
            }
            else{
                result += hand[i].rank + hand[i].suit;
            }
            
        }

        // console.log(result);
    }
    else if(arguments.length === 2){

        for(let i = 0; i < hand.length; i++){
            if(i !== hand.length-1){
                result += hand[i].rank + hand[i].suit + sep;
            }
            else{
                result += hand[i].rank + hand[i].suit;
            }
            
        }

        // console.log(result);
    }
    else if(numbers){

            for(let i = 0; i < hand.length; i++){

                if(i !== hand.length-1){
                    result += `${i+1}: `+ hand[i].rank + hand[i].suit + sep;
                }
                else{
                    result += `${i+1}: `+ hand[i].rank + hand[i].suit;
                }
                
            }
        }else{
            
            for(let i = 0; i < hand.length; i++){
                if(i !== hand.length-1){
                    result += hand[i].rank + hand[i].suit + sep;
                }
                else{
                    result += hand[i].rank + hand[i].suit;
                }
                
            }
        }
    return result;
}

function matchesAnyProperty(obj, matchObj){

    let match = false;
    const check = Object.values(matchObj);
    const values = Object.values(obj);
    for(let j = 0; j < check.length; j++){

        for(let k = 0; k < values.length; k++){
            if(check[j].includes(values[k])){
                match = true;
            }
        }
    }

    return match;
    
}

function drawUntilPlayable(deck, matchObject){

    const newDeck = [...deck];
    const drawnCards = [];
    for(let i = newDeck.length-1; i >= 0; i--){
        if(newDeck[i].suit === matchObject.suit || newDeck[i].rank === matchObject.rank || newDeck[i].rank === '8'){
            drawnCards.push(newDeck.pop());
            break;
        }
        else{
            drawnCards.push(newDeck.pop());
        }
    }

    return [newDeck, drawnCards];
}



export {
    range,
    generateDeck,
    shuffle,
    draw,
    deal,
    handToString,
    matchesAnyProperty,
    drawUntilPlayable,
};

