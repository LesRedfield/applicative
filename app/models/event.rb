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
class Array
  def sum
    inject(0.0) { |result, el| result + el }
  end

  def mean
    sum / size
  end
end

class Event < ActiveRecord::Base

  belongs_to :customer

  scope :purchase_between, lambda {|start_date, end_date| where("purchase >= ? AND purchase <= ?", start_date, end_date )}

  scope :session_between, lambda {|start_date, end_date| where("session >= ? AND session <= ?", start_date, end_date )}

  scope :add_between, lambda {|start_date, end_date| where("cart_add >= ? AND cart_add <= ?", start_date, end_date )}

  scope :checkout_between, lambda {|start_date, end_date| where("checkout >= ? AND checkout <= ?", start_date, end_date )}

  # lots of class methods that take event params and return properly formatted data

  PROPERTIES = {
    signup_platform: [['Mac'], ['Windows'], ['iPhone'], ['Windows Phone'], ['Android']],
    signup_channel: [['Search'], ['Social Media'], ['Affiliate'], ['Organic']],
    ab_group: [['A'], ['B'], [nil]],
    age: [[18, 30], [30, 45], [45, 60]],
    gender: [[true], [false]]
  }


  def self.dashOne
    {
      colors: ['#26a8a6'],
      # colors: ['#C0FFFF'],
      chart: {
        type: 'area'
      },
      title: {
        text: 'Average Purchaser Age'
      },
      subtitle: {
        text: 'Actually in the database!'
      },
      xAxis: {
        categories: ['May 03', 'May 08', 'May 13', 'May 18', 'May 23', 'May 28',
          'Jun 02', 'Jun 07', 'Jun 12', 'Jun 17', 'Jun 22', 'Jun 27', 'Jul 02', 'Jul 07']
      },
      yAxis: {
        title: {
          text: 'Age'
        }
      },
      plotOptions: {
        series: {
          fillColor: {
              linearGradient: [0, 0, 0, 300],
              stops: [
                [0, '#C0FFFF']
              ]
            }
        },
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Age',
        data: [
          Event.purchase_between(90.days.ago, 76.days.ago).map do |event|
            event.customer.age
          end.mean.to_i,
          Event.purchase_between(76.days.ago, 62.days.ago).map do |event|
            event.customer.age
          end.mean.to_i,
          Event.purchase_between(62.days.ago, 48.days.ago).map do |event|
            event.customer.age
          end.mean.to_i,
          Event.purchase_between(48.days.ago, 34.days.ago).map do |event|
            event.customer.age
          end.mean.to_i,
          Event.purchase_between(34.days.ago, 20.days.ago).map do |event|
            event.customer.age
          end.mean.to_i
        ],
        lineWidth: 1
      }]
    }
  end

  def self.dashTwo
    {
      colors: ['#912520', '#26a8a6'],
      chart: {
          type: 'column'
      },
      title: {
          text: 'Signup Platform by Gender'
      },
      xAxis: {
          categories: ['Mac', 'Windows', 'iPhone', 'Windows Phone', 'Android']
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Total Signups'
          }
      },
      legend: {
          reversed: true

      },
      plotOptions: {
          series: {
              stacking: 'normal',
              pointWidth: 20
          }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Male',
        data: [
          Customer.where(gender: true, signup_platform: 'Mac').count,
          Customer.where(gender: true, signup_platform: 'Windows').count,
          Customer.where(gender: true, signup_platform: 'iPhone').count,
          Customer.where(gender: true, signup_platform: 'Windows Phone').count,
          Customer.where(gender: true, signup_platform: 'Android').count
        ]
      }, {
        name: 'Female',
        data: [
          Customer.where(gender: false, signup_platform: 'Mac').count,
          Customer.where(gender: false, signup_platform: 'Windows').count,
          Customer.where(gender: false, signup_platform: 'iPhone').count,
          Customer.where(gender: false, signup_platform: 'Windows Phone').count,
          Customer.where(gender: false, signup_platform: 'Android').count
        ]
      }]
    }
  end

  def self.dashThree
    {
      colors: ['#26a8a6'],
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Signup by Marketing Channel'
      },
      # subtitle: {
      #   enabled: false,
      #   text: 'ActiveRecord is tha Bombdiggity'
      # },
      xAxis: {
          categories: ['Search', 'Social Media', 'Affiliate', 'Organic']
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Signups'
          }
      },
      legend: {
        enabled: false,
        reversed: true

      },
      plotOptions: {
          series: {
              stacking: 'normal'
          }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Signups',
        data: [
          Customer.where(signup_channel: 'Search').count,
          Customer.where(signup_channel: 'Social Media').count,
          Customer.where(signup_channel: 'Affiliate').count,
          Customer.where(signup_channel: 'Organic').count
        ]
      }

      # , {
      #   name: 'Group B',
      #   data: [
      #     Customer.where(ab_group: 'B', signup_channel: 'Search').average(:age).to_i,
      #     Customer.where(ab_group: 'B', signup_channel: 'Social Media').average(:age).to_i,
      #     Customer.where(ab_group: 'B', signup_channel: 'Affiliate').average(:age).to_i,
      #     Customer.where(ab_group: 'B', signup_channel: 'Organic').average(:age).to_i,
      #   ]
      # }

      # , {
      #   name: 'Neither',
      #   data: [
      #     Customer.where(ab_group: nil, signup_channel: 'Search').average(:age).to_i,
      #     Customer.where(ab_group: nil, signup_channel: 'Social Media').average(:age).to_i,
      #     Customer.where(ab_group: nil, signup_channel: 'Affiliate').average(:age).to_i,
      #     Customer.where(ab_group: nil, signup_channel: 'Organic').average(:age).to_i,
      #   ]
      # }

      ]
    }
  end

  def self.dashFour
    {
      colors: ['#912520', '#26a8a6', '#5C120C', '#C0FFFF', '#C76C61'],
      chart: {
        type: 'area'
      },
      title: {
        text: 'Biweekly Purchases by Session Platform'
      },
      subtitle: {
        text: 'Source: appacademy.io'
      },
      xAxis: {
        categories: ['May 03', 'May 17', 'May 31', 'Jun 14', 'Jun 28'],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: 'Percent of Purchases'
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' purchases'
      },
      plotOptions: {
        area: {
          stacking: 'percent',
          lineColor: ['#912520', '#26a8a6', '#5C120C', '#C0FFFF', '#C76C61'],
          lineWidth: 2,
          marker: {
            lineColor: ['#912520', '#26a8a6', '#5C120C', '#C0FFFF', '#C76C61'],
            symbol: 'circle',
            radius: 2,
            enabled: false,
            states: {
              hover: {
                halo: {
                  size: 1
                }
              }
            }
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Mac',
        data: [
          Event.purchase_between(90.days.ago, 76.days.ago).where(session_platform: 'Mac').count,
          Event.purchase_between(76.days.ago, 62.days.ago).where(session_platform: 'Mac').count,
          Event.purchase_between(62.days.ago, 48.days.ago).where(session_platform: 'Mac').count,
          Event.purchase_between(48.days.ago, 34.days.ago).where(session_platform: 'Mac').count,
          Event.purchase_between(34.days.ago, 20.days.ago).where(session_platform: 'Mac').count
        ]
      }, {
        name: 'Windows',
        data: [
          Event.purchase_between(90.days.ago, 76.days.ago).where(session_platform: 'Windows').count,
          Event.purchase_between(76.days.ago, 62.days.ago).where(session_platform: 'Windows').count,
          Event.purchase_between(62.days.ago, 48.days.ago).where(session_platform: 'Windows').count,
          Event.purchase_between(48.days.ago, 34.days.ago).where(session_platform: 'Windows').count,
          Event.purchase_between(34.days.ago, 20.days.ago).where(session_platform: 'Windows').count
        ]
      }, {
        name: 'iPhone',
        data: [
          Event.purchase_between(90.days.ago, 76.days.ago).where(session_platform: 'iPhone').count,
          Event.purchase_between(76.days.ago, 62.days.ago).where(session_platform: 'iPhone').count,
          Event.purchase_between(62.days.ago, 48.days.ago).where(session_platform: 'iPhone').count,
          Event.purchase_between(48.days.ago, 34.days.ago).where(session_platform: 'iPhone').count,
          Event.purchase_between(34.days.ago, 20.days.ago).where(session_platform: 'iPhone').count
        ]
      }, {
        name: 'Windows Phone',
        data: [
          Event.purchase_between(90.days.ago, 76.days.ago).where(session_platform: 'Windows Phone').count,
          Event.purchase_between(76.days.ago, 62.days.ago).where(session_platform: 'Windows Phone').count,
          Event.purchase_between(62.days.ago, 48.days.ago).where(session_platform: 'Windows Phone').count,
          Event.purchase_between(48.days.ago, 34.days.ago).where(session_platform: 'Windows Phone').count,
          Event.purchase_between(34.days.ago, 20.days.ago).where(session_platform: 'Windows Phone').count
        ]
      }, {
        name: 'Android',
        data: [
          Event.purchase_between(90.days.ago, 76.days.ago).where(session_platform: 'Android').count,
          Event.purchase_between(76.days.ago, 62.days.ago).where(session_platform: 'Android').count,
          Event.purchase_between(62.days.ago, 48.days.ago).where(session_platform: 'Android').count,
          Event.purchase_between(48.days.ago, 34.days.ago).where(session_platform: 'Android').count,
          Event.purchase_between(34.days.ago, 20.days.ago).where(session_platform: 'Android').count
        ]
      }]
    }
  end

  def self.segment(query)
    if query && query['events'] && query['events'].length > 0
      if query['events'][0] == 'Purchase'
        event = 'purchase'
        name = 'Purchases'
      elsif query['events'][0] == 'Session'
        event = 'session'
        name = 'Sessions'
      elsif query['events'][0] == 'Add to Cart'
        event = 'add'
        name = 'Cart Adds'
      elsif query['events'][0] == 'Proceed to Checkout'
        event = 'checkout'
        name = 'Checkouts'
      end

      if query['properties'] && query['properties'][0] == 'AB Group'
        byProp = 'ab_group'
        segments = PROPERTIES[byProp.to_sym]
        nameP = ' by ' + query['properties'][0]
      elsif query['properties'] && query['properties'][0] == 'Marketing Channel'
        byProp = 'signup_channel'
        segments = PROPERTIES[byProp.to_sym]
        nameP = ' by ' + query['properties'][0]
      elsif query['properties'] && query['properties'][0] == 'Signup Platform'
        byProp = 'signup_platform'
        segments = PROPERTIES[byProp.to_sym]
        nameP = ' by ' + query['properties'][0]
      elsif query['properties']
        byProp = query['properties'][0].downcase
        segments = PROPERTIES[query['properties'][0].downcase.to_sym]
        nameP = ' by ' + query['properties'][0]
      else
        byProp = 'none'
        segments = [['all']]
        nameP = ''
      end

      seriesArr = []

      segments.each do |segment|
        query['events'].each do |eventJawn|
          if eventJawn == 'Add to Cart'
            eventName = 'add'
          elsif eventJawn == 'Proceed to Checkout'
            eventName = 'checkout'
          else
            eventName = eventJawn
          end

          seriesArr << {
            name: name + segment.to_s,
            data:
              if byProp == 'none'
                [
                  Event.send(eventName.downcase + '_between', 90.days.ago, 76.days.ago)
                  .count,

                  Event.send(eventName.downcase + '_between', 76.days.ago, 62.days.ago)
                  .count,

                  Event.send(eventName.downcase + '_between', 62.days.ago, 48.days.ago)
                  .count,

                  Event.send(eventName.downcase + '_between', 48.days.ago, 34.days.ago)
                  .count,

                  Event.send(eventName.downcase + '_between', 34.days.ago, 20.days.ago)
                  .count
                ]
              elsif segment.length < 2
                [
                  Event.send(eventName.downcase + '_between', 90.days.ago, 76.days.ago)
                  .select{|event| event.customer.send(byProp) == segment[0]}
                  .count,

                  Event.send(eventName.downcase + '_between', 76.days.ago, 62.days.ago)
                  .select{|event| event.customer.send(byProp) == segment[0]}
                  .count,

                  Event.send(eventName.downcase + '_between', 62.days.ago, 48.days.ago)
                  .select{|event| event.customer.send(byProp) == segment[0]}
                  .count,

                  Event.send(eventName.downcase + '_between', 48.days.ago, 34.days.ago)
                  .select{|event| event.customer.send(byProp) == segment[0]}
                  .count,

                  Event.send(eventName.downcase + '_between', 34.days.ago, 20.days.ago)
                  .select{|event| event.customer.send(byProp) == segment[0]}
                  .count
                ]
              else
                [
                  Event.send(eventName.downcase + '_between', 90.days.ago, 76.days.ago)
                  .select{|event| event.customer.send(byProp) >= segment[0] && event.customer.send(byProp) < segment[1]}
                  .count,

                  Event.send(eventName.downcase + '_between', 76.days.ago, 62.days.ago)
                  .select{|event| event.customer.send(byProp) >= segment[0] && event.customer.send(byProp) < segment[1]}
                  .count,

                  Event.send(eventName.downcase + '_between', 62.days.ago, 48.days.ago)
                  .select{|event| event.customer.send(byProp) >= segment[0] && event.customer.send(byProp) < segment[1]}
                  .count,

                  Event.send(eventName.downcase + '_between', 48.days.ago, 34.days.ago)
                  .select{|event| event.customer.send(byProp) >= segment[0] && event.customer.send(byProp) < segment[1]}
                  .count,

                  Event.send(eventName.downcase + '_between', 34.days.ago, 20.days.ago)
                  .select{|event| event.customer.send(byProp) >= segment[0] && event.customer.send(byProp) < segment[1]}
                  .count
                ]
              end
          }
        end
      end

      {
        query: {
          events: query['events'],
          properties: if query['properties']
                        query['properties']
                      else
                        []
                      end
        },
        chart: {
          type: 'line'
        },
        title: {
          text: name + nameP
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: ['May 03', 'May 08', 'May 13', 'May 18', 'May 23', 'May 28',
            'Jun 02', 'Jun 07', 'Jun 12', 'Jun 17', 'Jun 22', 'Jun 27', 'Jul 02', 'Jul 07']
        },
        yAxis: {
          title: {
            text: 'Quantity'
          }
        },
        plotOptions: {
          area: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        credits: {
          enabled: false
        },
        series: seriesArr

      }

    else
      {
        credits: {
          enabled: false
        }
      }
    end

  end

end


# Event.send(event + '_between', 90.days.ago, 76.days.ago).map { |event| event.customer.age}.mean.to_i
