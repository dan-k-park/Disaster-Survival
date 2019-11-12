class Game < ApplicationRecord
  has_many :disasters, dependent: :destroy
  has_many :protections, dependent: :destroy
  belongs_to :user


end
