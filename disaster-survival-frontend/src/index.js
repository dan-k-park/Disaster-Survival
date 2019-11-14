const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`;
const GAMES_URL = `${BASE_URL}/games`;
const DISASTERS_URL = `${BASE_URL}/disasters`

const DISASTERS = []

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
      return changeUsername(user);
    })
    mainMenu()
    signIn.classList.add('hidden')
  })
}

const changeUsername = (user) => {
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

const mainMenu = () => {
  document.getElementById('menu').classList.remove('hidden')
  let startBtn = document.getElementById('new_game')
  let logoutBtn = document.getElementById('logout')

  startBtn.addEventListener('click', () => {
    let newGame = {
      game_name: "New Game",
      score: 500,
      user_id: 1,
      health: 100,
      turn: 1,
      status: true
    }

    addGame(newGame)

    startBtn.classList.add('hidden')
  })

  logoutBtn.addEventListener('click', () => {
    document.getElementById('menu').classList.add('hidden')
    newUser();
  })
}

const addGame = (gameObj) => {
  fetch(GAMES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(gameObj)
  })
  .then(res => res.json())
  .then(game => {
    let startGame = new Game(game)
    gamePlay(startGame)
  })
}

const gamePlay = (game) => {
  let name = document.createElement('h3');
  let health = document.createElement('p');
  let score = document.createElement('p');
  let turn = document.createElement('p');

  let disasterName = document.createElement('p');
  let disasterDamage = document.createElement('p')

  let gameover = document.createElement('h1')

  getDisasters();

  name.textContent = game.name;
  health.textContent = `Health: ${game.health}`;
  score.textContent = `Score: ${game.score}`;
  turn.textContent = `Week: ${game.turn}`;


  let nextTurnBtn = document.createElement('button')
  nextTurnBtn.textContent = 'Continue to Next Week'
  
  let protectionsBtn = document.createElement('button')
  protectionsBtn.textContent = 'Purchase Protection'
  
  nextTurnBtn.addEventListener('click', () => {
    let disaster = DISASTERS[Math.floor(Math.random() * 4)]
    disasterName.textContent = `You've been hit by a ${disaster.name}!`
    disasterDamage.textContent = `You took ${disaster.damage} in damage.`
    game.health -= disaster.damage
    game.checkStatus()

    if (game.status == false) {
      gameover.textContent = `Game Over. Your house survived ${game.turn} weeks.`

    } else {
      health.textContent = `Health: ${game.health}`

      game.turn++;
      turn.textContent = `Week: ${game.turn}`;

      game.update();
    }
  })
  
  protectionsBtn.addEventListener('click', () => {
    console.log("Take me to purchase page")
  })
  
  document.getElementById('gameScreen').append(name, health, score, turn, disasterName, disasterDamage, gameover, nextTurnBtn, protectionsBtn)
}



const getDisasters = () => {
  fetch(DISASTERS_URL)
  .then(res => res.json())
  .then(disasters => {
    for (let i = 0; i < disasters.length; i++) {
      DISASTERS.push(disasters[i])
    }
  })
}