const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`;
const GAMES_URL = `${BASE_URL}/games`;

document.addEventListener('DOMContentLoaded', () => {
  addUser();
  getGames();
})

// const initializeSignInForm = () => {
//   let signInForm = document.getElementById('signin_form')

//   signInForm.addEventListener('submit', (ev) => {
//     ev.preventDefault();

//     let username = ev.target.username_input.value;
//   })
//   //document.getElementById('authentication').classList.add('hidden')
// }

const addUser = () => {
  let newUserForm = document.getElementById('signup_form')

  newUserForm.addEventListener('submit', (ev) => {
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
    newUserForm.reset();
  })
}

const getGames = () => {
  fetch(GAMES_URL)
  .then(res => res.json())
  .then(games => {
    displayGames(games);
  })
}

const displayGames = (games) => {
  let gameList = document.getElementById('games')
  gameList.classList.remove('hidden')
  let ul = document.createElement('ul');
  games.forEach(game => {
    let li = document.createElement('li')
    li.textContent = game.game_name
    ul.appendChild(li)

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete Game';
    li.appendChild(deleteBtn)
    deleteBtn.onclick = e => {
      deleteGame(e, game);
    };
  });
  gameList.appendChild(ul)
}

const deleteGame = (e, game) => {
  e.target.parentNode.remove();
  fetch(GAMES_URL + `/${game.id}`, {
    method: 'DELETE'
  });
}