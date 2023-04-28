class AddFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :english_level, :string
    add_column :users, :tech_knowledge, :string
    add_column :users, :cv_link, :string
    add_column :users, :start_team_at, :date
    add_column :users, :end_team_at, :date
  end
end
