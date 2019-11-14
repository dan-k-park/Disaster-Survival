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
    protection: 'Steel Braces & Bolts, Concrete Foundation'
  },
  {
    name: 'Group of Squatters',
    damage: 10,
    protection: 'None'
  }
])

Hint.create([
  {
    content: 'Sea levels are starting to rise...',
    disaster_id: 1
  },
  {
    content: 'There\'s a roaring sound in the distance...',
    disaster_id: 2
  },
  {
    content: 'There\'s a roaring sound in the distance...',
    disaster_id: 4
  },
  {
    content: 'It\'s started to rain...',
    disaster_id: 1
  },
  {
    content: 'Waves have been getting bigger lately...',
    disaster_id: 1
  },
  {
    content: 'There have been reports of a large earthquake far away...',
    disaster_id: 3
  },
  {
    content: 'There have been reports of a large earthquake far away...',
    disaster_id: 2
  },
  {
    content: 'Animals have been disappearing lately...',
    disaster_id: 4
  },
  {
    content: 'Animals have been disappearing lately...',
    disaster_id: 3
  }
])
