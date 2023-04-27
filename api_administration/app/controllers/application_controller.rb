class ApplicationController < ActionController::API
  include JsonWebToken
  include JsonErrors

  before_action :authorize_request

  def authorize_request
    if request.headers['Authorization'].present?
      token = request.headers['Authorization']
      token = token.split(" ")[1]
      begin 
        decoded = jwt_decode(token)
        @current_user = User.find(decoded[:user_id])
      rescue => exception
        head :unauthorized
      end
    else 
      head :unauthorized
    end
  end

  def current_user
    @current_user
  end

end
