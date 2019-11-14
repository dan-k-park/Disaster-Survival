class DisasterSerializer < ActiveModel::Serializer
  attributes :id, :name, :damage, :protection
end
