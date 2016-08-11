# == Schema Information
#
# Table name: annotations
#
#  id       :integer          not null, primary key
#  user_id  :integer          not null
#  title    :string
#  body     :text
#  session  :boolean
#  cart_add :boolean
#  checkout :boolean
#  purchase :boolean
#  date     :datetime         not null
#

class Annotation < ActiveRecord::Base

  belongs_to :user

end
