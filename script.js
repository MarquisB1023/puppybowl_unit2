// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = `https://fsa-puppy-bowl.herokuapp.com/api/"2308-ACC-ET-WEB-PT-B"`;
// Use the APIURL variable for fetch requests
const APIURL = `${cohortName}/players`;

const PLAYERFORM = document.querySelector("form");
const NEW_PLAYER_CARD = document.querySelector("#all-players-container");

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */

PLAYERFORM.addEventListener("submit", async function (event) {
  event.preventDefault();
  const elements = PLAYERFORM.elements;
  const playerId = elements["playerID"];
  const playerName = elements["playerName"];
  const breedOfPlayer = elements["breedOfPlayer"];
  const ImgUrl = elements["img"];

  const newPlayerData = {
    id: playerId,
    name: playerName,
    breed: breedOfPlayer,
    image: ImgUrl,
  };
  console.log(newPlayerData);
  await addNewPlayer(newPlayerData);
  //   fetchEvents();
});

const puppyPlayer = [];

const displayPlayer = () => {
  const plArray = puppyPlayer.map((result) => {
    const PLAYER_BUILD = document.createElement("div");
    PLAYER_BUILD.classList.add("playercard");
    const PLAYER_IMAGE = document.createElement("img");
    PLAYER_IMAGE.setAttribute("src", result.image_url);
    PLAYER_IMAGE.setAttribute("alt", result.title);
    const ID_OF_PLAYER = document.createElement("div");
    ID_OF_PLAYER.classList.add("id");
    const NAME_OF_PLAYER = document.createElement("p");
    NAME_OF_PLAYER.classList.add("name");
    const BREED_OF_PLAYER = document.createElement("p");
    BREED_OF_PLAYER.classList.add("breed");
    const STATUS_OF_PLAYER = document.createElement("p");
    STATUS_OF_PLAYER.classList.add("status");

    const DELETE_PLAYER = document.createElement("button");
    DELETE_PLAYER.textContent = "Delete";
    DELETE_PLAYER.addEventListener("click", async () => {
      await removePlayer(result.id);
      fetchSinglePlayer();
    });

    PLAYER_BUILD.append(
      ID_OF_PLAYER,
      NAME_OF_PLAYER,
      PLAYER_IMAGE,
      BREED_OF_PLAYER,
      STATUS_OF_PLAYER,
      DELETE_PLAYER
    );
    return PLAYER_BUILD;
  });
  NEW_PLAYER_CARD.PLAYER_BUILD(...plArray);
};
function renderingPlayers(players) {
  PLAYER_BUILD.innerHTML = "";
  for (const puppy of players) {
    displayPlayer(puppy);
  }
}

const fetchAllPlayers = async () => {
  try {
    const response = await fetch(APIURL);
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(APIURL);
    const result = await response.json();
    console.log(result);
    const jsonResponse = await response.json();
    const players = jsonResponse.data;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(APIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Rufus",
        breed: "Irish Setter",
        body: JSON.stringify(playerObj),
      }),
    });
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(
      `Oops, something went wrong with adding that #${playerObj}`,
      err
    );
  }
};

const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIUR}/${playerId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

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
//   const players = await fetchAllPlayers();
//   renderAllPlayers(players);

//   renderNewPlayerForm();
// };

// init();
