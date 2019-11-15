const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`;
const GAMES_URL = `${BASE_URL}/games`;
const DISASTERS_URL = `${BASE_URL}/disasters`;
const HINTS_URL = `${BASE_URL}/hints`;

const DISASTERS = [];
const HINTS = [];
const PROTECTIONS = [{
  name: 'Hurricane Shutters',
  price: 300,
  buff: 15,
}, {
  name: 'Sandbags',
  price: 100,
  buff: 10,
},
{
  name: 'Steel Braces & Bolts',
  price: 70,
  buff: 10,
},
{
  name: 'Concrete Foundation',
  price: 500,
  buff: 15,
}];
const NEWGAME = {
  game_name: "Good luck ",
  score: 2000,
  user_id: 1,
  health: 100,
  turn: 1,
  status: true
}

document.addEventListener('DOMContentLoaded', () => {
  getDisasters();
  getHints();
  newUser();
})

const newUser = () => {
  let signIn = document.getElementById('signin')

  signIn.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let username = ev.target.username_input.value;
    let player = new User(username)
    player.createUser();
    mainMenu(player);

    signIn.classList.add('hidden')
  })
}

const editUsername = (player) => {

  let editUserForm = document.getElementById('update_username')
  editUserForm.classList.remove('hidden')

  editUserForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let newUsername = ev.target.username_input.value;
    player.username = newUsername;

    fetch(USERS_URL)
    .then(res => res.json())
    .then(players => {
      player.update(players[players.length - 1].id);
    })

    editUserForm.classList.add('hidden')
    document.getElementById('instructions').classList.remove('hidden')
  })
}

const mainMenu = (player) => {
  document.getElementById('menu').classList.remove('hidden')

  // Buttons
  let startBtn = document.getElementById('new_game')
  let logoutBtn = document.getElementById('logout')
  let changeUsernameBtn = document.getElementById('edit_user')

  changeUsernameBtn.addEventListener('click', () => {
    editUsername(player);
    document.getElementById('instructions').classList.add('hidden')
  })

  startBtn.addEventListener('click', () => {
    addGame(NEWGAME, player)
    startBtn.classList.add('hidden')
    document.getElementById('instructions').classList.add('hidden')
  })

  logoutBtn.addEventListener('click', () => {
    document.getElementById('menu').classList.add('hidden')
    document.getElementById('gameScreen').classList.add('hidden')
    document.getElementById('signin').classList.remove('hidden')

    fetch(USERS_URL)
    .then(res => res.json())
    .then(players => {
      player.delete(players[players.length - 1].id)
    })
    newUser();
  })
}

const addGame = (gameObj, player) => {
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
    startGame.disasters.push(DISASTERS[Math.floor(Math.random() * 4)])
    gamePlay(startGame, player)
  })
}

const gamePlay = (game, player) => {
  // Game log
  let name = document.createElement('h3');
  let health = document.createElement('p');
  let score = document.createElement('p');
  let turn = document.createElement('p');
  let protections = document.createElement('p');
  let hint = document.createElement('p')
  let gameover = document.createElement('h1');

  name.textContent = game.name + `${player.username}`;
  health.textContent = `Health: ${game.health}`;
  score.textContent = `Money: $${game.score}`;
  turn.textContent = `Week: ${game.turn}`;
  hint.textContent = `Hint: ${findDisasterHint(game.disasters[game.disasters.length - 1])}`;

  // Disasters
  let disasterName = document.createElement('p');
  let disasterDamage = document.createElement('p');

  // Protections
  let protectionStr = ""

  if (game.protections.length == 0) {
    protections.textContent = 'Protections: None'
  }

  let protectionsList = document.getElementById('protections')

  for (let i = 0; i < PROTECTIONS.length; i++) {
    let li = document.createElement('li')
    let purchaseBtn = document.createElement('button')

    purchaseBtn.textContent = 'Buy'
    li.textContent = `${PROTECTIONS[i].name} - $${PROTECTIONS[i].price}`
    protectionsList.append(li, purchaseBtn)
    
    purchaseBtn.addEventListener('click', () => {
      if (game.score >= PROTECTIONS[i].price) {
        game.protections.push(PROTECTIONS[i]);
        game.score -= PROTECTIONS[i].price;
        game.update();

        score.textContent = `Money: $${game.score}`;
        protectionStr += `${PROTECTIONS[i].name} `
        protections.textContent = `Protection: ${protectionStr}`;
      } else {
        alert('Insufficient funds, guess you\'re just gonna have to hope for the best')
      }   
    })
  }

  // Buttons
  let nextTurnBtn = document.createElement('button');
  nextTurnBtn.textContent = 'Continue to Next Week';

  nextTurnBtn.addEventListener('click', () => {
    disasterName.textContent = `You've been hit by a ${game.disasters[game.disasters.length - 1].name}!`

    let damageTaken = checkProtections(game.disasters[game.disasters.length - 1], game)

    disasterDamage.textContent = `You took ${damageTaken} damage.`
    game.triggerDisasterEvent(damageTaken)
    game.checkStatus()

    if (game.status == false) {
      health.textContent = `Health: 0`;;
      gameover.textContent = `Game Over. Your house survived ${game.turn} weeks.`

    } else {
      health.textContent = `Health: ${game.health}`

      // Wipe out protections each week to make it fair
      game.protections = []
      protections.textContent = 'Protection: None'
      protectionStr = ''

      game.turn++;
      
      game.disasters.push(DISASTERS[Math.floor(Math.random() * 4)]);
      turn.textContent = `Week: ${game.turn}`;
      hint.textContent = `Hint: ${findDisasterHint(game.disasters[game.disasters.length - 1])}`;

      game.update();
    }
  })
  document.getElementById('gameScreen').append(name, health, score, protections, turn, hint, disasterName, disasterDamage, gameover, nextTurnBtn, protectionsList)
}

const checkProtections = (disaster, game) => {
  let disasterProtectionArray = disaster.protection.split(",").map(item => item.trim());
  let damage = disaster.damage

  for (let i = 0; i < game.protections.length; i++) {
    if (disasterProtectionArray.includes(game.protections[i].name)) {
      damage -= game.protections[i].buff;
    }
  }
  return damage;
}

const getDisasters = () => {
  fetch(DISASTERS_URL)
  .then(res => res.json())
  .then(disasters => {
    for (let i = 0; i < disasters.length; i++) {
      DISASTERS.push(disasters[i]);
    }
  })
}

const getHints = () => {
  fetch(HINTS_URL)
  .then(res => res.json())
  .then(hints => {
    for (let i = 0; i < hints.length; i++) {
      HINTS.push(hints[i]);
    }
  })
}

const findDisasterHint = (disaster) => {
  let disasterHints = [];
  let disasterHintStr = '';

  for (let i = 0; i < HINTS.length; i++) {
    if (HINTS[i].disaster.name == disaster.name) {
      disasterHints.push(HINTS[i].content)
    }
  }
  disasterHintStr = disasterHints[Math.floor(Math.random() * disasterHints.length)];
  return disasterHintStr;
}
