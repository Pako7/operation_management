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
class Team < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :name, length: { maximum: 255 }

  has_many :users
end
