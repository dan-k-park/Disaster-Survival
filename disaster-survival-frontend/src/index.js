const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`;
const GAMES_URL = `${BASE_URL}/games`;

document.addEventListener('DOMContentLoaded', () => {
  newUser();
})

const newUser = () => {
  let signIn = document.getElementById('signin')

  signIn.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let newUsername = ev.target.username_input.value;

    fetch(USERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        username: newUsername
      })
    })
    .then(res => res.json())
    .then(user => {
      return getGames(user);
    })
    signIn.classList.add('hidden')
  })
}

const getGames = (user) => {
  fetch(GAMES_URL)
  .then(res => res.json())
  .then(games => {
    displayGames(games);
  })
  let changeUsernameBtn = document.getElementById('edit_user')

  changeUsernameBtn.addEventListener('click', () => {
    editUsername(user);
  })
}


const editUsername = (user) => {
  let editUserForm = document.getElementById('update_username')
  editUserForm.classList.remove('hidden')

  editUserForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let newUsername = ev.target.username_input.value;

    fetch(USERS_URL + `/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        username: newUsername
      })
    })
    editUserForm.classList.add('hidden')
  })
}

const displayGames = (games) => {
  games.forEach(game => {
    let loadedGame = new Game(game);
    loadedGame.render();
  })

  let gameForm = document.getElementById("new_game_form")
  let gamename = document.getElementById("gamename_input")
  

  gameForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let newGame = {
      game_name: gamename.value,
      score: 0,
      user_id: 1,
      health: 100,
      turn: 1,
      status: true
    }

    let addedGame = new Game(newGame)
    addedGame.addGame();
    addedGame.render();
  })
}