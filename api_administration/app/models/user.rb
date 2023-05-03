# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  cv_link         :string(255)
#  email           :string(255)
#  end_team_at     :date
#  english_level   :string(255)
#  name            :string(255)
#  password_digest :string(255)
#  start_team_at   :date
#  tech_knowledge  :string(255)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  team_id         :bigint
#
# Indexes
#
#  index_users_on_email    (email) UNIQUE
#  index_users_on_team_id  (team_id)
#
# Foreign Keys
#
#  fk_rails_...  (team_id => teams.id)
#
class User < ApplicationRecord
  rolify
  has_secure_password

  validates :name, length: { maximum: 255 }, presence: true
  validates :email, length: { maximum: 255 }, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
            length: { minimum: 6, maximum: 255 },
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
