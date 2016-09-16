class CreateQueries < ActiveRecord::Migration
  def change
    create_table :queries do |t|
      t.integer :user_id
      t.string :title
      t.string :query
    end

    add_index :queries, :user_id
  end
end
