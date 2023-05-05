module Api::V1
  class TrackingUserTeamsController < ApplicationController
    before_action :set_tracking_user_team, only: %i[ show update destroy ]

    # GET /tracking_user_teams
    def index
      @tracking_user_teams = TrackingUserTeam.includes(:user, :team).where(permitted_params)
      render json: @tracking_user_teams, each_serializer: Api::V1::TrackingUserTeamSerializer
    end

    private

    def permitted_params
      @permitted_params ||= params.permit(:user_id, :team_id, :start_team_at, :end_team_at)
    end

  end
end