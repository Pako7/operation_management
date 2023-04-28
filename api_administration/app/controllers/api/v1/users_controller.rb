module Api::V1
  class UsersController < ApplicationController
    before_action :set_user, only: %i[ show update destroy ]

    # GET /users
    def index
      authorize User
      @users = User.all

      render json: @users
    end

    # GET /users/1
    def show
      authorize @user
      render json: @user
    end

    # POST /users
    def create
      authorize User
      @user = User.new(user_params)

      if @user.save
        # TODO, add serializer and remove password
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /users/1
    def update
      authorize @user
      if @user.update(user_params)
        # TODO, add serializer and remove password
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # DELETE /users/1
    def destroy
      authorize User
      @user.destroy
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :team_id, :start_team_at, :end_team_at)
    end
  end
end