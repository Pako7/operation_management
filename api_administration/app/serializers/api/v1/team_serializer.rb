module Api::V1
  class TeamSerializer < ActiveModel::Serializer
    attributes :id, :name, :client, :responsible

  end
end