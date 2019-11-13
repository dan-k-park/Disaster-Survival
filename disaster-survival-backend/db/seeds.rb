# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create([
  {
    username: 'Admin'
  }
])

Game.create([
  {
    game_name: 'Test',
    score: 1,
    health: 100,
    turn: 1,
    status: true,
    user_id: 1
  }
])

Disaster.create([
  {
    name: 'Hurricane',
    damage: 30,
    game_id: 1
  }, {
    name: 'Tsunami',
    damage: 40,
    game_id: 1
  }, {
    name: 'Volcanoes',
    damage: 20,
    game_id: 1
  },
  {
    name: 'Squatters',
    damage: 2,
    game_id: 1
  }
])


Protection.create([
  {
    name: 'Plywood',
    price: 20,
    buff:1,
    game_id: 1
  }, {
    name: 'Hurricane Shutters',
    price: 100,
    buff:1000,
    game_id: 1
  }, {
    name: 'Sandbags',
    price: 20,
    buff:1,
    game_id: 1
  },
  {
    name: 'Steel Braces + Bolts',
    price: 1000,
    buff:10000,
    game_id: 1
  },
  {
    name: 'Concrete Foundation',
    price: 100000,
    buff:200000,
    game_id: 1
  }
])
