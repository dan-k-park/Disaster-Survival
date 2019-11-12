class CreateHints < ActiveRecord::Migration[6.0]
  def change
    create_table :hints do |t|
      t.string :content
      t.string :probability
      t.references :disaster, null: false, foreign_key: true

      t.timestamps
    end
  end
end
