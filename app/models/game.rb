class Game < ApplicationRecord
  has_many :disasters
  has_many :protections
  belongs_to :user
end
