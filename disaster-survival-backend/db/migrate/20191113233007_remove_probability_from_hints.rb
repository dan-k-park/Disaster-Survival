class RemoveProbabilityFromHints < ActiveRecord::Migration[6.0]
  def change

    remove_column :hints, :probability, :integer
  end
end
