class GameSerializer < ActiveModel::Serializer
  attributes :id, :score, :health, :turn, :status
  has_one :user
end
