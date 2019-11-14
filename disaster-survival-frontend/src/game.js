class Game {
  constructor(game) {
    this.id = game.id
    this.user = game.user
    this.name = game.game_name
    this.turn = game.turn
    this.health = game.health
    this.score = game.score
    this.status = game.status

    this.resources = []
  }

  update = () => {
    fetch(GAMES_URL + `/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this)
    })
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
    }
  }
  
}
