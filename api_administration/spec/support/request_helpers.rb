module RequestHelpers
  def create_token(user, exp = 24.hours.from_now)
    payload = {user_id: user.id}
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
