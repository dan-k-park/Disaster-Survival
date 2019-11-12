class CreateProtections < ActiveRecord::Migration[6.0]
  def change
    create_table :protections do |t|
      t.string :name
      t.integer :price
      t.integer :buff
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
