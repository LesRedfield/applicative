class AddDashboardToQueries < ActiveRecord::Migration
  def change
    add_column :queries, :dashboard, :boolean, default: false
  end
end
