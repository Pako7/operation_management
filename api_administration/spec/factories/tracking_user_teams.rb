# == Schema Information
#
# Table name: tracking_user_teams
#
#  id            :bigint           not null, primary key
#  end_team_at   :date
#  start_team_at :date
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  team_id       :bigint           not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_tracking_user_teams_on_team_id  (team_id)
#  index_tracking_user_teams_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (team_id => teams.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :tracking_user_team do
    user { create(:user) }
    team { create(:team) }
  end
end