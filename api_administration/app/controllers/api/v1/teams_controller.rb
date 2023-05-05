module Api::V1
  class TeamsController < ApplicationController
    before_action :set_team, only: %i[ show update destroy ]

    # GET /teams
    def index
      authorize Team
      @teams = Team.all

      render json: @teams, each_serializer: Api::V1::TeamSerializer
    end

    # GET /teams/1
    def show
      authorize Team
      render json: {team: Api::V1::TeamSerializer.new(@team)}
    end

    # POST /teams
    def create
      authorize Team
      @team = Team.new(team_params)

      if @team.save
        render json: {team: Api::V1::TeamSerializer.new(@team)}, status: :created
      else
        render json: @team.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /teams/1
    def update
      authorize Team
      if @team.update(team_params)
        render json: {team: Api::V1::TeamSerializer.new(@team)}
      else
        render json: @team.errors, status: :unprocessable_entity
      end
    end

    # DELETE /teams/1
    def destroy
      authorize Team
      @team.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_team
        @team = Team.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def team_params
        params.require(:team).permit(:name, :client, :responsible)
      end
  end
end