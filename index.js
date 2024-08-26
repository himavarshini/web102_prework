/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container

// create a function that adds all data from the games array to the page

function addGamesToPage(games) {
    const gamesContainer = document.getElementById("games-container");
    gamesContainer.innerHTML = '';
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        // create a new div element, which will become the game card
        
        const gameElement = document.createElement('div');
        

        // add the class game-card to the list
        gameElement.classList.add('game-card');
        

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameElement.innerHTML = `
            <h2>${game.name}</h2>
            <img class="game-img" src="${game.img}" alt="${game.name} ">
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameElement);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

const totalPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
raisedCard.innerHTML = `${totalPledged.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly(games) {
    const gamesContainer = document.getElementById("games-container");
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    return games.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    // console.log(unfundedGames.length);
}

// show only games that are fully funded
function filterFundedOnly(games) {
    const gamesContainer = document.getElementById("games-container");
    deleteChildElements(gamesContainer);


    // use filter() to get a list of games that have met or exceeded their goal
    return games.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add unfunded games to the DOM

}


// show all games
function showAllGames() {
    const gamesContainer = document.getElementById("games-container");
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}
document.getElementById('unfunded-btn').addEventListener('click', () => {
    const unfundedGames = filterUnfundedOnly(GAMES_JSON);
    addGamesToPage(unfundedGames);
});

document.getElementById('funded-btn').addEventListener('click', () => {
    const fundedGames = filterFundedOnly(GAMES_JSON);
    addGamesToPage(fundedGames);
});

document.getElementById('all-btn').addEventListener('click', () => {
    showAllGames();
});

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
console.log(`Number of unfunded games: ${unfundedGamesCount}`);
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const totalGames = GAMES_JSON.length;


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames !== 1 ? 's' : ''}. Currently, ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? 's' : ''} remain unfunded. We need your help to fund these amazing game${unfundedGamesCount !== 1 ? 's' : ''}!`;
console.log(displayStr);


// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('p');
paragraph.innerHTML = displayStr;
descriptionContainer.appendChild(paragraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;
console.log('Top funded game:', firstGame);
console.log('Second top funded game:', secondGame);


// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement('p');
firstGameElement.textContent = firstGame.name;


firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement('p');
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);