module Api::V1
  class TrackingUserTeamsController < ApplicationController
    before_action :set_tracking_user_team, only: %i[ show update destroy ]

    # GET /tracking_user_teams
    def index
      @tracking_user_teams = if params[:filters].present?
                                TrackingUserTeam.where(permitted_params)
                              else
                                TrackingUserTeam.all
                              end

      render json: @tracking_user_teams
    end

    def permitted_params
      params[:filters].permit(:user_id, :team_id, :start_team_at, :end_team_at)
    end

  end
end