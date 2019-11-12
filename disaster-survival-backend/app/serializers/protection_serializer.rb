class ProtectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :buff
  has_one :game
end
