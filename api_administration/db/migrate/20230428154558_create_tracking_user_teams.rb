class CreateTrackingUserTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :tracking_user_teams do |t|
      t.references :user, null: false, foreign_key: true
      t.references :team, null: false, foreign_key: true
      t.date :start_team_at
      t.date :end_team_at

      t.timestamps
    end
  end
end
