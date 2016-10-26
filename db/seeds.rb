# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# days_agos = [
#   30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95
# ]

# customer_list = []


# days_agos.each do |days_ago|
#   customer_list << [
#     days_ago.days.ago,
#     ['Mac', 'Windows', 'iPhone', 'Windows Phone', 'Android'].sample,
#     ['Search', 'Social Media', 'Affiliate', 'Organic'].sample,
#     ['A', 'B', nil].sample,
#     rand(18..60),
#     [true, false].sample
#   ]
# end

# customer_list << [
#   days_ago.days.ago,
#   ['Mac', 'Windows', 'iPhone', 'Windows Phone', 'Android'].sample,
#   ['Search', 'Social Media', 'Affiliate', 'Organic'].sample,
#   ['A', 'B', nil].sample,
#   rand(18..60),
#   [true, false].sample
# ]

# 50.times do
#   customer_list.each do |signup, signup_platform, signup_channel, ab_group, age, gender|
#     Customer.create!(
#     signup: signup,
#     signup_platform: signup_platform,
#     signup_channel: signup_channel,
#     ab_group: ab_group,
#     age: age,
#     gender: gender
#     )
#   end
# end

# customer_ids = [
#   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
# ]

# 50.times do |num|
#   customer_ids.each do |id|
#     Event.create!(
#       customer_id: id * (num + 1),
#       new_user_session: false,
#       session_platform: ['Mac', 'Windows', 'iPhone', 'Windows Phone', 'Android'].sample,
#       session: (((5 * id) + 25) - (2 + (id % 3) - 1)).days.ago,
#       cart_add: (((5 * id) + 25) - (3 + (id % 3) - 1)).days.ago,
#       checkout: (((5 * id) + 25) - (4 + (id % 3) - 1)).days.ago,
#       purchase: [(((5 * id) + 25) - (5 + (id % 3) - 1)).days.ago, nil].sample
#     )
#   end
# end

customer_list = (1..2000).map do |id|
  [
    (10 + (id % 100)).days.ago,
    ['Mac', 'Windows', 'iPhone', 'Windows Phone', 'Android'].sample,
    ['Search', 'Social Media', 'Affiliate', 'Organic'].sample,
    ['A', 'B', nil].sample,
    rand(18..60),
    [true, false].sample
  ]
end

event_list = (1..2000).map do |id|
  rand1 = rand() * 100
  rand2 = rand() * 100

  if rand2 > 59
    if rand1 > 36
      purch = rand1.days.ago
    elsif customer_list[id - 1][4] < 45
      purch = rand1.days.ago
    elsif rand2 > 95
      purch = rand1.days.ago
    else
      purch = nil
    end
  else
    purch = nil
  end

  [
    id,
    false,
    ['Mac', 'Windows', 'iPhone', 'Windows Phone', 'Android'].sample,
    rand1.days.ago,
    rand2 > 41 ? rand1.days.ago : nil,
    rand2 > 48 ? rand1.days.ago : nil,
    purch
  ]
end


customer_list.each do |signup, signup_platform, signup_channel, ab_group, age, gender|
  Customer.create!(
    signup: signup,
    signup_platform: signup_platform,
    signup_channel: signup_channel,
    ab_group: ab_group,
    age: age,
    gender: gender
  )
end

event_list.each do |customer_id, new_user_session, session_platform, session, cart_add, checkout, purchase|
  Event.create!(
    customer_id: customer_id,
    new_user_session: new_user_session,
    session_platform: session_platform,
    session: session,
    cart_add: cart_add,
    checkout: checkout,
    purchase: purchase
  )
end

User.create!(
  email: "guest",
  password: "password",
  first_name: "Guest",
  last_name: "User"
)
