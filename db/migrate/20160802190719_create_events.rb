class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :customer_id, null: false
      t.boolean :new_user_session, null: false
      t.string :session_platform, null: false
      t.datetime :session, null: false
      t.datetime :cart_add
      t.datetime :checkout
      t.datetime :purchase
    end

    add_index :events, :customer_id
    add_index :events, :new_user_session
    add_index :events, :session_platform
    add_index :events, :session
    add_index :events, :cart_add
    add_index :events, :checkout
    add_index :events, :purchase
  end
end
