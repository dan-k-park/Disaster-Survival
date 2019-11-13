class Game {
  constructor(game) {
    this.game = game
    this.id = game.id
    this.user = game.user
    this.name = game.game_name
    this.turn = game.turn
    this.health = game.health
    this.score = game.score
    this.status = game.status
  }

  displayGame = () => {

    let gameList = document.getElementById('games')
    gameList.classList.remove('hidden')
    let ul = document.createElement('ul')

    let li = document.createElement('li')
    li.textContent = this.name
    ul.appendChild(li)

    // working load game
    li.addEventListener('click', (ev) => {
      ev.preventDefault()
      let score = document.getElementById('score')
      let game_name = document.getElementById('game_name')
      let health = document.getElementById('health')
      let turn = document.getElementById('turn')
      this.clear = () => {
        score.classList.add('hidden');
        game_name.classList.add('hidden');
        health.classList.add('hidden');
        turn.classList.add('hidden')
      }
      game_name.innerHTML = `<h2>Game Name: ${this.name}</h2>`
      score.innerHTML = `<h2>Score: ${this.score}</h2>`
      health.innerHTML = `<h2>Health: ${this.health}</h2>`
      turn.innerHTML = `<h2>Turn: ${this.turn}</h2>`
    })


    // experimental loadgame
    // let loadedGame = document.getElementById('loadedgame')
    // li.addEventListener('click', (ev) => {
    //   ev.preventDefault
    //   this.loadGame(loadedGame);
    //   this.clearLoadedGame(loadedGame)
    // })

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete Game';
    li.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', (evt) => {
      this.deleteGame(evt, this.game);
    })
    gameList.appendChild(ul);
  }

  // clearLoadedGame = (game) => {
  //   game.classList.add('hidden')
  // }

  // loadGame = (game) => {
  //   game.classList.remove('hidden')
  //   let game_name = document.createElement('h3')
  //   let health = document.createElement('p')
  //   let score = document.createElement('p')
  //   let turn = document.createElement('p')
    
  //   game_name.textContent = `Game Name: ${this.name}`
  //   score.textContent = `Score: ${this.score}`
  //   health.textContent = `Health: ${this.health}`
  //   turn.textContent = `Turn: ${this.turn}`

  //   game.append(game_name, health, score, turn)
  //   console.log(game)
  // }

  addGame = () => {
    fetch(GAMES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(this.game)
    })
    this.render();
  }

  deleteGame = (e, game) => {
    e.target.parentNode.remove();
    fetch(GAMES_URL + `/${game.id}`, {
      method: 'DELETE'
    });
  }

  triggerDisasterEvent = () => {
    let disaster = new DisasterEvent();
    this.health -= disaster.damage;
  }

  checkStatus = () => {
    if (this.health <= 0) {
      this.status = false;
      console.log(`You survived ${this.turn} weeks`)
    }
  }



  // nextTurn = () => {
  //   let nextTurnButton = document.getElementById('nextTurn')
  //   nextTurnButton.addEventListener('click', () => {
  //     this.turn++;
  //   })
  // }

  render() {
    this.displayGame();
  }
}