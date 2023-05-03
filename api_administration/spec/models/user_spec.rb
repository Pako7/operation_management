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
require 'rails_helper'
# bundle exec rspec spec/models/user_spec.rb
RSpec.describe User, type: :model do
  let(:record) { FactoryBot.build(:user) }  

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:password) }

    it { is_expected.to belong_to(:team).optional }

    it 'valid record' do
      expect(record.valid?).to be_truthy
    end
  end

  describe 'methods' do
    let!(:team) { FactoryBot.create(:team) }
    it '#save_tracking_team' do
      record.team = team
      record.save!
      expect(record.team).to eq(team)
      expect(TrackingUserTeam.count).to eq(1)
      expect(TrackingUserTeam.first.user).to eq(record)
    end
  end

end
