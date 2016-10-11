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
    ab_group: [['A'], ['B']],
    age: [[18, 30], [30, 45], [45, 60]],
    gender: [[true], [false]]
  }


  def self.dashOne
    {
      colors: ['#26a8a6'],
      # colors: ['#C0FFFF'],
      chart: {
        spacingTop: 30,
        spacingBottom: 50,
        spacingLeft: 20,
        spacingRight: 20,
        marginTop: 80,
        type: 'area'
      },
      title: {
        text: 'Average Purchaser Age',
        style: {
          fontSize: '12px',
          color: '#838383'
        }
      },
      xAxis: {
        categories: ['May 03', 'May 08', 'May 13', 'May 18', 'May 23', 'May 28',
          'Jun 02', 'Jun 07', 'Jun 12', 'Jun 17', 'Jun 22', 'Jun 27', 'Jul 02', 'Jul 07']
      },
      yAxis: {
        title: {
          enabled: false
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
      legend: {
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
        spacingTop: 30,
        # spacingBottom: 50,
        spacingLeft: 20,
        spacingRight: 20,
        marginTop: 80,
        type: 'column'
      },
      title: {
          text: 'Signup Platform by Gender',
          style: {
            fontSize: '12px',
            color: '#838383'
          }
      },
      xAxis: {
          categories: ['Mac', 'Windows', 'iPhone', 'Windows Phone', 'Android']
      },
      yAxis: {
        min: 0,
        title: {
          enabled: false
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
        spacingTop: 30,
        spacingBottom: 20,
        spacingLeft: 20,
        spacingRight: 20,
        marginTop: 80,
        type: 'bar'
      },
      title: {
        text: 'Signup by Marketing Channel',
        style: {
          fontSize: '12px',
          color: '#838383'
        }
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
        spacingTop: 30,
        # spacingBottom: 50,
        spacingLeft: 20,
        spacingRight: 20,
        marginTop: 80,
        type: 'area'
      },
      title: {
        text: 'Biweekly Purchases by Session Platform',
        style: {
          fontSize: '12px',
          color: '#838383'
        }
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

  def self.dashSeg(query)
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

      # segments = []
      #
      # if query['properties'].empty?
      #   segments << ['all']
      # else
      #   query['properties'].each do |byProperty|
      #     if byProperty == 'AB Group'
      #       byProp = 'ab_group'
      #     elsif byProperty == 'Marketing Channel'
      #       byProp = 'signup_channel'
      #     elsif byProperty == 'Signup Platform'
      #       byProp = 'signup_platform'
      #     else
      #       byProp = byProperty.downcase
      #     end
      #
      #     segments <<

      segments.each_with_index do |segment, idx|
        query['events'].each do |eventJawn|
          if eventJawn == 'Add to Cart'
            eventName = 'add'
          elsif eventJawn == 'Proceed to Checkout'
            eventName = 'checkout'
          else
            eventName = eventJawn.downcase
          end

          seriesArr << {
            name: eventName.capitalize + 's' + segment.to_s,
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
                      end,
          title: query['title']
        },
        colors: ['#26a8a6', '#5C120C', '#C0FFFF', '#C76C61', '#912520'],
        chart: {
          spacingTop: 30,
          # spacingBottom: 50,
          spacingLeft: 20,
          spacingRight: 20,
          marginTop: 80,
          type: 'line'
        },
        title: {
          text: query['title'],
          style: {
            fontSize: '12px',
            color: '#838383'
          }
        },
        xAxis: {
          categories: ['May 03', 'May 17', 'May 31', 'Jun 14', 'Jun 28']
        },
        yAxis: {
          title: {
            text: 'Quantity'
          },
          min: 0
        },
        plotOptions: {
          series: {
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4,
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

  def self.segment(query)

    # debugger

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

      # segments = []
      #
      # if query['properties'].empty?
      #   segments << ['all']
      # else
      #   query['properties'].each do |byProperty|
      #     if byProperty == 'AB Group'
      #       byProp = 'ab_group'
      #     elsif byProperty == 'Marketing Channel'
      #       byProp = 'signup_channel'
      #     elsif byProperty == 'Signup Platform'
      #       byProp = 'signup_platform'
      #     else
      #       byProp = byProperty.downcase
      #     end
      #
      #     segments <<

      segments.each_with_index do |segment, idx|
        query['events'].each do |eventJawn|
          if eventJawn == 'Add to Cart'
            eventName = 'add'
          elsif eventJawn == 'Proceed to Checkout'
            eventName = 'checkout'
          else
            eventName = eventJawn.downcase
          end

          seriesArr << {
            name: eventName.capitalize + 's' + segment.to_s,
            data:
              if eventName == 'checkout' && byProp == 'age' && idx == 0
                [30, 42, 29, 31, 29]
              elsif eventName == 'checkout' && byProp == 'age' && idx == 1
                [28, 33, 37, 35, 40]
              elsif eventName == 'checkout' && byProp == 'age' && idx == 2
                [37, 27, 32, 12, 9]

              elsif eventName == 'checkout' && byProp == 'signup_channel' && idx == 0
                [27, 21, 25, 18, 34]
              elsif eventName == 'checkout' && byProp == 'signup_channel' && idx == 1
                [34, 20, 27, 21, 22]
              elsif eventName == 'checkout' && byProp == 'signup_channel' && idx == 2
                [24, 18, 22, 32, 24]
              elsif eventName == 'checkout' && byProp == 'signup_channel' && idx == 3
                [22, 29, 18, 25, 27]

              elsif eventName == 'checkout' && byProp == 'signup_platform' && idx == 0
                [22, 19, 25, 18, 26]
              elsif eventName == 'checkout' && byProp == 'signup_platform' && idx == 1
                [25, 23, 17, 21, 18]
              elsif eventName == 'checkout' && byProp == 'signup_platform' && idx == 2
                [18, 15, 23, 27, 20]
              elsif eventName == 'checkout' && byProp == 'signup_platform' && idx == 3
                [15, 18, 21, 25, 20]
              elsif eventName == 'checkout' && byProp == 'signup_platform' && idx == 4
                [15, 20, 22, 28, 25]

              elsif eventName == 'checkout' && byProp == 'none'
                [95, 102, 98, 65, 62]
              elsif eventName == 'purchase' && byProp == 'none'
                [85, 87, 82, 49, 43]
              elsif eventName == 'add' && byProp == 'none'
                [128, 114, 145, 152, 165]
              elsif eventName == 'session' && byProp == 'none'
                [331, 362, 351, 364, 372]
              elsif byProp == 'none'
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
                      end,
          title: query['title']
        },
        chart: {
          spacingRight: 40,
          marginTop: 40,
          type: 'line'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: ['May 03', 'May 17', 'May 31', 'Jun 14', 'Jun 28']
        },
        yAxis: {
          title: {
            text: 'Quantity'
          },
          min: 0
        },
        plotOptions: {
          series: {
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4,
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
