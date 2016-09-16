# == Schema Information
#
# Table name: queries
#
#  id      :integer          not null, primary key
#  user_id :integer
#  title   :string
#  query   :string
#



class Query < ActiveRecord::Base

  belongs_to :user

  validates :title, presence: true, uniqueness: {scope: :user_id}
  validates :user_id, presence: true
  validates :query, presence: true

end
