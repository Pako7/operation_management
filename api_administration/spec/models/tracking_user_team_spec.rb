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
require 'rails_helper'

RSpec.describe TrackingUserTeam, type: :model do
  let(:record) { FactoryBot.build(:tracking_user_team) }  

  describe 'validations' do

    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:team) }

    it 'valid record' do
      expect(record.valid?).to be_truthy
      record.save!
      expect(described_class.count).to be(1)
    end
  end
end