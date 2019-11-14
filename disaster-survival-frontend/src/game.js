class Game {
  constructor(game) {
    this.id = game.id
    this.user = game.user
    this.name = game.game_name
    this.turn = game.turn
    this.health = game.health
    this.score = game.score
    this.status = game.status

    this.protections = []
    this.disasters = []
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

  triggerDisasterEvent = (damage) => {
    this.health -= damage;
  }

  checkStatus = () => {
    if (this.health <= 0) {
      this.status = false;
      this.update();
    }
  }
  
}
