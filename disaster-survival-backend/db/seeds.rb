# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Disaster.create([
  {
    name: 'Hurricane',
    damage: 50,
    protection: 'Hurricane Shutters, Sandbags'
  }, {
    name: 'Tsunami',
    damage: 40,
    protection: 'Sandbags'
  }, {
    name: 'Earthquake',
    damage: 40,
    protection: 'Steel Braces, Concrete Foundation'
  },
  {
    name: 'Group of Squatters',
    damage: 10,
    protection: 'None'
  }
])


Protection.create([
  {
    name: 'Plywood',
    price: 100,
    buff: 10,
  }, {
    name: 'Hurricane Shutters',
    price: 300,
    buff: 20,
  }, {
    name: 'Sandbags',
    price: 100,
    buff: 5,
  },
  {
    name: 'Steel Braces + Bolts',
    price: 70,
    buff: 10,
  },
  {
    name: 'Concrete Foundation',
    price: 500,
    buff: 200000,
  }
])
