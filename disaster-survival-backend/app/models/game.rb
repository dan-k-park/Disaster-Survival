class Game < ApplicationRecord
  has_many :protections, dependent: :destroy

end
