const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`;
const GAMES_URL = `${BASE_URL}/games`;
const DISASTERS_URL = `${BASE_URL}/disasters`;
const PROTECTIONS_URL = `${BASE_URL}/protections`;

const DISASTERS = [];

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
      let newUser = new User(user)
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
      score: 2000,
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
    document.getElementById('gameScreen').classList.add('hidden')
    document.getElementById('signin').classList.remove('hidden')
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
  // Game log
  let name = document.createElement('h3');
  let health = document.createElement('p');
  let score = document.createElement('p');
  let turn = document.createElement('p');
  let protections = document.createElement('p')
  let gameover = document.createElement('h1')

  name.textContent = game.name;
  health.textContent = `Health: ${game.health}`;
  score.textContent = `Money: $${game.score}`;
  turn.textContent = `Week: ${game.turn}`;

  // Disasters
  let disasterName = document.createElement('p');
  let disasterDamage = document.createElement('p')
  getDisasters();

  // Protections
  let protectionStr = ""

  if (game.protections.length == 0) {
    protections.textContent = 'Protections: None'
  }

  let protectionArray = [
    {
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
    }
  ]
  let protectionsList = document.getElementById('protections')

  for (let i = 0; i < protectionArray.length; i++) {
    let li = document.createElement('li')
    let purchaseBtn = document.createElement('button')

    purchaseBtn.textContent = 'Buy'
    li.textContent = `${protectionArray[i].name} - $${protectionArray[i].price}`
    protectionsList.append(li, purchaseBtn)
    
    purchaseBtn.addEventListener('click', () => {
      if (game.score > protectionArray[i].price) {
        game.protections.push(protectionArray[i]);
        game.score -= protectionArray[i].price;
        game.update();

        score.textContent = `Money: $${game.score}`;
        protectionStr += `${protectionArray[i].name} `
        protections.textContent = `Protection: ${protectionStr}`;
      } else {
        alert('Insufficient funds, guess you\'re just gonna have to hope for the best')
      }   
    })
  }


  // Buttons
  let nextTurnBtn = document.createElement('button')
  nextTurnBtn.textContent = 'Continue to Next Week'
  

  nextTurnBtn.addEventListener('click', () => {
    let disaster = DISASTERS[Math.floor(Math.random() * 4)]
    disasterName.textContent = `You've been hit by a ${disaster.name}!`

    let damageTaken = checkProtections(disaster, game)

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
      turn.textContent = `Week: ${game.turn}`;

      game.update();
    }
  })
  
  document.getElementById('gameScreen').append(name, health, score, protections, turn, disasterName, disasterDamage, gameover, nextTurnBtn, protectionsList)
}

const checkProtections = (disaster, game) => {
  let disasterProtectionArray = disaster.protection.split(",").map(item => item.trim());
  console.log(disasterProtectionArray)
  let damage = disaster.damage

  for (let i = 0; i < game.protections.length; i++) {
    console.log(game.protections[i].name)
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
      DISASTERS.push(disasters[i])
    }
  })
}
