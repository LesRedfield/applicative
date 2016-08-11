class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :user_id, null: false
      t.string :title
      t.text :body
      t.boolean :session
      t.boolean :cart_add
      t.boolean :checkout
      t.boolean :purchase
      t.datetime :date, null: false
    end

    add_index :annotations, :user_id
    add_index :annotations, :date
  end
end
