class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :game_name
      t.integer :score
      t.integer :health
      t.integer :turn
      t.boolean :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
