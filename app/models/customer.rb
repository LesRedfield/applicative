# == Schema Information
#
# Table name: customers
#
#  id              :integer          not null, primary key
#  signup          :datetime         not null
#  signup_platform :string           not null
#  signup_channel  :string           not null
#  ab_group        :string
#  age             :integer          not null
#  gender          :boolean          not null
#

class Customer < ActiveRecord::Base

  has_many :events

  # scope :by_reg_platform, lambda { |platform| where(platform: platform) }
  #
  # scope :by_channel, lambda { |channel| where(channel: channel) }
  #
  # scope :by_a_b, lambda { |a_b| where(ab_group: a_b) }
  #
  # scope :by_gender, lambda { |gender| where(gender: gender) }



  scope :by_age, lambda { |age1, age2| where("age >= ? AND age < ?", age1, age2) }

end
