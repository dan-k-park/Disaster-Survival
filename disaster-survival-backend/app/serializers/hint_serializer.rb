class HintSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :disaster
end
