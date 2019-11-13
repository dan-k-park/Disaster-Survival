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

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete Game';
    li.appendChild(deleteBtn)
    deleteBtn.addEventListener('click', (evt) => {
      this.deleteGame(evt, this.game);
    })
    gameList.appendChild(ul);
  }

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