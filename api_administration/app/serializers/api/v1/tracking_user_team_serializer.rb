module Api::V1
  class TrackingUserTeamSerializer < ActiveModel::Serializer
    attributes :id, :start_team_at, :end_team_at, :created_at

    belongs_to :user, serializer: Api::V1::TrackingUserTeams::UserSerializer
    belongs_to :team, serializer: Api::V1::TrackingUserTeams::TeamSerializer
  end
end
