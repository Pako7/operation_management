module Api::V1
  class TrackingUserTeams::UserSerializer < ActiveModel::Serializer
    attributes :id, :name
  end
end