class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.datetime :signup, null: false
      t.string :signup_platform, null: false
      t.string :signup_channel, null: false
      t.string :ab_group
      t.integer :age, null: false
      t.boolean :gender, null: false
    end

    add_index :customers, :signup
    add_index :customers, :signup_platform
    add_index :customers, :signup_channel
    add_index :customers, :ab_group
    add_index :customers, :age
    add_index :customers, :gender
  end
end
