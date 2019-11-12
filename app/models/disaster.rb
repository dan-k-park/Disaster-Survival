class Disaster < ApplicationRecord
  has_many :hints
  belongs_to :game
end
