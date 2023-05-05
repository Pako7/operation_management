module Api::V1
  class TrackingUserTeams::TeamSerializer < ActiveModel::Serializer
    attributes :id, :name
  end
end