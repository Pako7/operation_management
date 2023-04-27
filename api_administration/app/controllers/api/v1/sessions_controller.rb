module Api::V1
  class SessionsController < ApplicationController
    before_action :authorize_request, except: :create

    def create
      user = User.find_by_email(params[:email])
      if user && user.authenticate(params[:password])
        token = jwt_encode(user_id: user.id)
        render json: { token: token }, status: :ok
      else
        render json: { errors: {'email or password': ["is invalid"]}}, 
                      status: :unauthorized
      end
    end

    def destroy
      # TODO, check this method
      head(:ok, status: :no_content) 
    end
  end
end