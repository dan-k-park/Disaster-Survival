
const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`;
const GAMES_URL = `${BASE_URL}/games`;

document.addEventListener('DOMContentLoaded', () => {
  getGames();
})

const getGames = () => {
  fetch(GAMES_URL)
  .then(res => res.json())
  .then(games => {
    displayGames(games);
  })
}

const displayGames = (games) => {
  let gameList = document.getElementById('games')
  let ul = document.createElement('ul');
  
  let gameForm = document.getElementById("new_game_form")
let game_input = document.getElementById("game_input")



  games.forEach(game => {
    let li = document.createElement('li')
    li.textContent = game.game_name
    ul.appendChild(li)
  })
  gameList.appendChild(ul)

  gameForm.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let addGame = document.getElementsByName('submit').value
    console.log(game_input.value)
  console.log('submitted!')
  

    fetch(GAMES_URL, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        Accept: 'application/json',
          },
        body: JSON.stringify({
        game_name: game_input.value,
        score: 1,
        user_id: 1,
        health: 100,
        turn: 1,
        status: true
          })
      })
    })
  }