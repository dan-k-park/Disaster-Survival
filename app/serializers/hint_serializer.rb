class HintSerializer < ActiveModel::Serializer
  attributes :id, :content, :probability
  has_one :disaster
end
