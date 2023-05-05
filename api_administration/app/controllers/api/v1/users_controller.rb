module Api::V1
  class UsersController < ApplicationController
    before_action :set_user, only: %i[ show update destroy ]

    # GET /users
    def index
      authorize User
      @users = User.includes(:roles).all

      render json: @users, each_serializer: Api::V1::UserSerializer
    end

    # GET /users/1
    def show
      authorize @user
      render json: {user: Api::V1::UserSerializer.new(@user)}
    end

    # POST /users
    def create
      authorize User

      @user = User.new(user_params)
      if @user.save
        @user.add_role(get_role)
        render json: {user: Api::V1::UserSerializer.new(@user)}, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /users/1
    def update
      authorize @user

      if @user.update(user_params)
        render json: {user: Api::V1::UserSerializer.new(@user)}
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
      @user = User.includes(:roles).find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      set_role
      params.require(:user).permit(:name, :email, :password, :team_id, :start_team_at, :end_team_at)
    end

    def set_role
      @role = params[:user].delete(:role)
      @role = :user if @role.blank? || current_user.is_admin? || (@role == 'super_admin')
    end

    def get_role
      @role
    end

  end
end