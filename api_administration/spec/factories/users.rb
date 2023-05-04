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
FactoryBot.define do
  factory :user do
    name { FFaker::Name.name }
    email { FFaker::Internet.email }
    password { FFaker::Internet.password }
    start_team_at {}
    end_team_at {}

    cv_link { FFaker::Internet.http_url }
    english_level {}
    tech_knowledge {}

    trait :super_admin do
      after(:create) {|user| user.add_role(:super_admin)}
    end

    trait :admin do
      after(:create) {|user| user.add_role(:admin)}
    end

    trait :normal do
      after(:create) {|user| user.add_role(:user)}
    end
  end
end
