# == Schema Information
#
# Table name: teams
#
#  id          :bigint           not null, primary key
#  client      :string(255)
#  name        :string(255)
#  responsible :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_teams_on_name  (name) UNIQUE
#
require 'rails_helper'

RSpec.describe Team, type: :model do
  let(:record) { FactoryBot.build(:team) }  

  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    
    it 'valid record' do
      expect(record.valid?).to be_truthy
      record.save!
      expect(described_class.count).to be(1)
    end
  end

end