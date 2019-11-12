class DisasterSerializer < ActiveModel::Serializer
  attributes :id, :name, :damage
  has_one :game
end
