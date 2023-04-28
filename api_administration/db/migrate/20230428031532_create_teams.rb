class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.string :name
      t.string :client
      t.string :responsible

      t.timestamps
      t.index :name, unique: true
    end
  end
end
