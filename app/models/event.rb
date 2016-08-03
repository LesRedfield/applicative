# == Schema Information
#
# Table name: events
#
#  id               :integer          not null, primary key
#  customer_id      :integer          not null
#  new_user_session :boolean          not null
#  session_platform :string           not null
#  session          :datetime         not null
#  cart_add         :datetime
#  checkout         :datetime
#  purchase         :datetime
#

class Event < ActiveRecord::Base

  has_one :customer

  # lots of class methods that take event params and return properly formatted data

end
