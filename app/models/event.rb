class Event < ActiveRecord::Base

  has_one :customer

  # lots of class methods that take event params and return properly formatted data

end
