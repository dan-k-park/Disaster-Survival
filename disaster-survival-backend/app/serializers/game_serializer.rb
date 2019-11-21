class GameSerializer < ActiveModel::Serializer
  attributes :id, :score, :health, :turn, :status, :game_name
end
