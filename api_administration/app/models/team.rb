class Team < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :name, length: { maximum: 255 }

  has_many :users
end
