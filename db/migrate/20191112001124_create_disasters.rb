class CreateDisasters < ActiveRecord::Migration[6.0]
  def change
    create_table :disasters do |t|
      t.string :name
      t.integer :damage
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
