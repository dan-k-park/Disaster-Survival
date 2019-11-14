class RemoveGameFromDisasters < ActiveRecord::Migration[6.0]
  def change
    remove_reference :disasters, :game, null: false, foreign_key: true
  end
end
