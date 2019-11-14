class AddProtectionToDisasters < ActiveRecord::Migration[6.0]
  def change
    add_column :disasters, :protection, :string
  end
end
