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
FactoryBot.define do
  factory :team do
    name { FFaker::Name.name }
    client { FFaker::Name.name }
    responsible { FFaker::Name.name }
  end
end