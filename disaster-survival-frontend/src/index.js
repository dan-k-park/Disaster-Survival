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
  games.forEach(game => {
    let li = document.createElement('li')
    li.textContent = game.health
    ul.appendChild(li)
  })
  gameList.appendChild(ul)
}