class Game < ApplicationRecord
  has_many :protections, dependent: :destroy
  belongs_to :user

end
