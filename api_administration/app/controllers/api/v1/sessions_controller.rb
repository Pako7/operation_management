module Api::V1
  class SessionsController < ApplicationController
    before_action :authorize_request, except: :create

    def create
      user = User.find_by_email(params[:email])
      if user && user.authenticate(params[:password])
        token = jwt_encode(user_id: user.id)
        render json: { token: token, user_id: user.id}, status: :ok
      else
        render json: { error: 'Invalid email or password'}, status: :unauthorized
      end
    end
  end
end