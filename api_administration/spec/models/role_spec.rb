# == Schema Information
#
# Table name: roles
#
#  id            :bigint           not null, primary key
#  name          :string(255)
#  resource_type :string(255)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resource_id   :bigint
#
# Indexes
#
#  index_roles_on_name                                    (name)
#  index_roles_on_name_and_resource_type_and_resource_id  (name,resource_type,resource_id)
#  index_roles_on_resource                                (resource_type,resource_id)
#
require 'rails_helper'

RSpec.describe Role, type: :model do
  let(:record) { FactoryBot.build(:role) }  

  describe 'validations' do

    it { is_expected.to belong_to(:resource).optional }
    it { is_expected.to have_and_belong_to_many(:users) }

    it 'valid record' do
      expect(record.valid?).to be_truthy
      record.save!
      expect(described_class.count).to be(1)
    end
  end
end
