// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = `https://fsa-puppy-bowl.herokuapp.com/api/2308-ACC-ET-WEB-PT-B`;
// Use the APIURL variable for fetch requests
const APIURL = `${cohortName}/players`;

const PLAYERFORM = document.querySelector("#new-player-form");
const NEW_PLAYER_CARD = document.querySelector("#all-players-container");

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */

PLAYERFORM.addEventListener("submit", async function (event) {
  event.preventDefault();
  const elements = PLAYERFORM.elements;
  const playerId = elements["playerID"].value;
  const playerName = elements["playerName"].value;
  const breedOfPlayer = elements["breedOfPlayer"].value;
  const ImgUrl = elements["img"].value;

  const newPlayerData = {
    id: playerId,
    name: playerName,
    breed: breedOfPlayer,
    image: ImgUrl,
  };
  console.log(newPlayerData);
  await addNewPlayer(newPlayerData);
  await fetchAllPlayers();
  //   fetchEvents();
});

const puppyPlayer = [];

const displayPlayer = (result) => {
  const PLAYER_BUILD = document.createElement("div");
  PLAYER_BUILD.classList.add("playerCard");

  const PLAYER_IMAGE = document.createElement("img");
  PLAYER_IMAGE.setAttribute("src", result.image);
  PLAYER_IMAGE.setAttribute("alt", result.name);

  const ID_OF_PLAYER = document.createElement("p");
  ID_OF_PLAYER.classList.add("id");
  ID_OF_PLAYER.textContent = `ID: ${result.id}`;

  const NAME_OF_PLAYER = document.createElement("p");
  NAME_OF_PLAYER.classList.add("Name");
  NAME_OF_PLAYER.textContent = `Name: ${result.name}`;

  const BREED_OF_PLAYER = document.createElement("p");
  BREED_OF_PLAYER.classList.add("breed");
  BREED_OF_PLAYER.textContent = `Breed: ${result.breed}`;

  const STATUS_OF_PLAYER = document.createElement("p");
  STATUS_OF_PLAYER.classList.add("status");
  STATUS_OF_PLAYER.textContent = `Status: ${result.status}`;

  const DELETE_PLAYER = document.createElement("button");
  DELETE_PLAYER.textContent = "Delete";
  DELETE_PLAYER.addEventListener("click", async () => {
    await removePlayer(result.id);
    fetchAllPlayers();
  });

  PLAYER_BUILD.append(
    PLAYER_IMAGE,
    ID_OF_PLAYER,
    NAME_OF_PLAYER,
    BREED_OF_PLAYER,
    STATUS_OF_PLAYER,
    DELETE_PLAYER
  );

  return PLAYER_BUILD;
};

function renderingPlayers(players) {
  const container = document.querySelector("#all-players-container");
  container.innerHTML = "";
  if (Array.isArray(players)) {
    for (const puppy of players) displayPlayer(puppy);
    container.appendChild(playerCard);
  } else {
    const playerCard = displayPlayer(players);
    container.appendChild(playerCard);
  }
}

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL);
    const result = await response.json();
    renderingPlayers(result);
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (players) => {
  try {
    const response = await fetch(APIURL);
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${players}!`, err);
  }
};

const addNewPlayer = async (players) => {
  try {
    const response = await fetch(APIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(players),
    });
    const result = await response.json(players);
    console.log(result);
  } catch (err) {
    console.error(
      `Oops, something went wrong with adding that #${players}!`,
      err
    );
  }
};

const removePlayer = async (players) => {
  try {
    const response = await fetch(APIURL, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${players} from the roster!`,
      err
    );
  }
};
fetchSinglePlayer();
/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
// const renderAllPlayers = (playerList) => {
//   try {
//   } catch (err) {
//     console.error("Uh oh, trouble rendering players!", err);
//   }
// };

// /**
//  * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
//  * fetches all players from the database, and renders them to the DOM.
//  */
// const renderNewPlayerForm = () => {
//   try {
//   } catch (err) {
//     console.error("Uh oh, trouble rendering the new player form!", err);
//   }
// };

// const init = async () => {
//   await PLAYER_BUILD();
//   renderAllPlayers(players);

//   renderNewPlayerForm();
// };

// init();
