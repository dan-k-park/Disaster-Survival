class User {
  constructor(username) {
    this.username = username;
  }

  createUser = () => {
    fetch(USERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        username: this.username
      })
    })
  }

  update = (id) => {
    fetch(USERS_URL + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this)
    })
  }
}