class User < ApplicationRecord
  rolify
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }
  
  belongs_to :team, optional: true
  
  after_save :save_tracking_team

  private

  def save_tracking_team
    return unless saved_changes.keys.include?('team_id')

    TrackingUserTeam.create(
      user: self, team_id: team_id, start_team_at: start_team_at, end_team_at: end_team_at
    )
  end

end
