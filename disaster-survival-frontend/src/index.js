const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`;
const GAMES_URL = `${BASE_URL}/games`;
const DISASTERS_URL = `${BASE_URL}/disasters`;
const PROTECTIONS_URL = `${BASE_URL}/protections`;

const DISASTERS = [];
const PROTECTIONS = [];

const NEWGAME = {
  game_name: "Survive as Long as You Can!",
  score: 2000,
  user_id: 1,
  health: 100,
  turn: 1,
  status: true
}

document.addEventListener('DOMContentLoaded', () => {
  newUser();


var btn = document.createElement("button");
btn.innerHTML = "click to change background image";
var img_holder = document.createElement("div");
document.body.appendChild(btn);
document.body.appendChild(img_holder);
/////////////////////////
function imageSelector(){

let sandbagArr = []
let plywoodArr = []
let concArr = []

  for (let i = 0; i < PROTECTIONS.length; i++) {
      if (PROTECTIONS[i].textContent == "Sandbags"){
    sandbagArr.push(PROTECTIONS[i].textContent)
  }
  }

  for (let i = 0; i < PROTECTIONS.length; i++) {
    if (PROTECTIONS[i].textContent == "plywood"){
  plywoodArr.push(PROTECTIONS[i].textContent)
}
}

for (let i = 0; i < PROTECTIONS.length; i++) {
  if (PROTECTIONS[i].textContent == "concrete"){
concArr.push(PROTECTIONS[i].textContent)
}
}

console.log(sandbagArr)
console.log(plywoodArr)
console.log(concArr)


let count = 1

if (sandbagsArr.length == 3 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 1;
} else if (sandbagsArr.length == 2 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 2;
} else if (sandbagsArr.length == 1 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 3;
} else if (sandbagsArr.length == 2 && plywoodArr.length == 1 && concArr.length == 1) {
  count = 4;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 5;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 2 && concArr.length == 0) {
  count = 6;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 1 && concArr.length == 0){
  count = 7;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 0 && concArr.length == 0) {
  count = 8;
} else if (sandbagsArr.length == 2 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 9;/////////////no image yet
} else if (sandbagsArr.length == 1 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 10;/////////////no image yet
} else if (sandbagsArr.length == 0 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 11;
} else if (sandbagsArr.length == 0 && plywoodArr.length == 0 && concArr.length == 1) {
  count = 12;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 0 && concArr.length == 1) {
  count = 13;/////////////no image yet
} else if (sandbagsArr.length == 1 && plywoodArr.length == 1 && concArr.length == 0) {
  count = 14;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 0 && concArr.length == 0) {
  count = 15;/////////////no image yet
} else if (sandbagsArr.length == 2 && plywoodArr.length == 0 && concArr.length == 0) {
  count = 16;
} else if (sandbagsArr.length == 1 && plywoodArr.length == 0 && concArr.length == 0) {
  count = 17;
} else if (sandbagsArr.length == 0 && plywoodArr.length == 2 && concArr.length == 0) {
  count = 18;
} else if (sandbagsArr.length == 0 && plywoodArr.length == 1 && concArr.length == 0) {
  count = 19;
} 
else if (sandbagsArr.length == 2 && plywoodArr.length == 1 && concArr.length == 0) {
  count = 21; ///////////no image yet
} 
else if (sandbagsArr.length == 3 && plywoodArr.length == 1 && concArr.length == 1) {
  count = 22; ///////////no image yet
} 
else {
  count = 20;
}
return count

}
////////////////////////////
function changeBackground(count){
  console.log(count)
  var img = document.getElementById('beachHouse');
  img.src = `images/Beach_House-${count}.jpg`;
  img.addEventListener("load",function(){
    img_holder.innerHTML = "";
    img_holder.appendChild(img);
  },false);
}
btn.addEventListener("click",changeBackground, false);
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
    addGame(NEWGAME)
    startBtn.classList.add('hidden')
    document.getElementById('protections').classList.remove('hidden')
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
  // let protectionStr = ""

  // if (game.protections.length == 0) {
  //   protections.textContent = 'Protections: None'
  // }

  let protectionsList = document.getElementById('protections')

  // for (let i = 0; i < PROTECTIONS.length; i++) {
  //   let li = document.createElement('li')
  //   let purchaseBtn = document.createElement('button')

  //   purchaseBtn.textContent = 'Buy'
  //   li.textContent = `${PROTECTIONS[i].name} - $${PROTECTIONS[i].price}`
  
    
  //   purchaseBtn.addEventListener('click', () => {
  //     if (game.score > PROTECTIONS[i].price) {
  //       game.protections.push(PROTECTIONS[i]);
  //       game.score -= PROTECTIONS[i].price;
  //       game.update();

  //       score.textContent = `Money: $${game.score}`;
  //       protectionStr += `${PROTECTIONS[i].name} `
  //       protections.textContent = `Protection: ${protectionStr}`;
  //     } else {
  //       alert('Insufficient funds, guess you\'re just gonna have to hope for the best')
  //     }   
  //   })
  // }
  ready();

  function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
  
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
  
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
  
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked, changeBackground)
  
    var btn = document.createElement("button");
  btn.innerHTML = "click to change background image";
  var img_holder = document.createElement("div");
  document.body.appendChild(btn);
  document.body.appendChild(img_holder);
  
  let count = 1
  
  function changeBackground(){
    var img = document.getElementById('beachHouse');
    img.src = `images/sandbags${count}.jpg`;
    img.addEventListener("load",function(){
      img_holder.innerHTML = "";
      img_holder.appendChild(img);
    },false);
  }
  btn.addEventListener("click",changeBackground, false);
  }
  function purchaseClicked() {
    let cost = document.getElementsByClassName('cart-total-price')[0].innerText.substr(1)
    /////200 is standing in for actually pulling the current game score but need a current game
    let modifiedScore = game.score - cost
    console.log(modifiedScore)
    let cartItems = document.getElementsByClassName('cart-items')[0]
        //////////////////////////  
        let li = document.createElement('li')
        li.textContent = cartItems.textContent
        protectionsList.append(li)

        let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for (let i = 0; i < cartItemNames.length; i++) {
          PROTECTIONS.splice(4,PROTECTIONS.length)
          PROTECTIONS.push(cartItemNames[i].innerText)
          console.log(PROTECTIONS)
          let sandbagsArr = []
let plywoodArr = []
let concArr = []

for (let i = 0; i < PROTECTIONS.length; i++) {
  if (PROTECTIONS[i] == "Sandbags"){
sandbagsArr.push(PROTECTIONS[i])
}
}

  for (let i = 0; i < PROTECTIONS.length; i++) {
    if (PROTECTIONS[i] == "Plywood"){
  plywoodArr.push(PROTECTIONS[i])
}
}

for (let i = 0; i < PROTECTIONS.length; i++) {
  if (PROTECTIONS[i] == "Concrete"){
concArr.push(PROTECTIONS[i])
}
}

console.log(sandbagsArr)
console.log(plywoodArr)
console.log(concArr)

///////////////////////////////////////////////////////////////////
let count = 1

if (sandbagsArr.length == 3 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 1;
} else if (sandbagsArr.length == 2 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 2;
} else if (sandbagsArr.length == 1 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 3;
} else if (sandbagsArr.length == 2 && plywoodArr.length == 1 && concArr.length == 1) {
  count = 4;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 5;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 2 && concArr.length == 0) {
  count = 6;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 1 && concArr.length == 0){
  count = 7;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 0 && concArr.length == 0) {
  count = 8;
} else if (sandbagsArr.length == 2 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 9;/////////////no image yet
} else if (sandbagsArr.length == 1 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 10;/////////////no image yet
} else if (sandbagsArr.length == 0 && plywoodArr.length == 2 && concArr.length == 1) {
  count = 11;
} else if (sandbagsArr.length == 0 && plywoodArr.length == 0 && concArr.length == 1) {
  count = 12;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 0 && concArr.length == 1) {
  count = 13;/////////////no image yet
} else if (sandbagsArr.length == 1 && plywoodArr.length == 1 && concArr.length == 0) {
  count = 14;
} else if (sandbagsArr.length == 3 && plywoodArr.length == 0 && concArr.length == 0) {
  count = 15;/////////////no image yet
} else if (sandbagsArr.length == 2 && plywoodArr.length == 0 && concArr.length == 0) {
  count = 16;
} else if (sandbagsArr.length == 1 && plywoodArr.length == 0 && concArr.length == 0) {
  count = 17;
} else if (sandbagsArr.length == 0 && plywoodArr.length == 2 && concArr.length == 0) {
  count = 18;
} else if (sandbagsArr.length == 0 && plywoodArr.length == 1 && concArr.length == 0) {
  count = 19;
} 
else if (sandbagsArr.length == 2 && plywoodArr.length == 1 && concArr.length == 0) {
  count = 21; ///////////no image yet
} 
else if (sandbagsArr.length == 3 && plywoodArr.length == 1 && concArr.length == 1) {
  count = 22; ///////////no image yet
} 
else {
  count = 20;
}
console.log(count)

  var img = document.getElementById('beachHouse');
  img.src = `images/Beach_House-${count}.jpg`;

          }
    ////////////
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    ///// hardcoded the route because again there needs to be a current game
    game.score = modifiedScore



    game.update()
    updateCartTotal()
    }
  
  function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
  }
  
  function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
  }
  
  function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
  }
  
  function addItemToCart(title, price) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
  }
  
  function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
        
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
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
      DISASTERS.push(disasters[i])
    }
  })
}

