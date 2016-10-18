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

  PROPERTIES = {
    signup_platform: [['Mac'], ['Windows'], ['iPhone'], ['Windows Phone'], ['Android']],
    signup_channel: [['Search'], ['Social Media'], ['Affiliate'], ['Organic']],
    ab_group: [['A'], ['B']],
    age: [[18, 30], [30, 45], [45, 60]],
    gender: [[true], [false]]
  }

  DATES = ['May 03', 'May 17', 'May 31', 'Jun 14', 'Jun 28']

  def self.options
    {
      colors: ['#26a8a6'],
      chart: {
        spacingTop: 30,
        spacingLeft: 20,
        spacingRight: 20,
        marginTop: 80,
        type: 'area'
      },
      title: {
        style: {
          fontSize: '12px',
          color: '#838383'
        }
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: ''
        }
      },
      credits: {
        enabled: false
      }
    }
  end


  def self.dashOne
    options = Event.options

    options[:chart][:spacingBottom] = 50
    options[:title][:text] = 'Average Purchaser Age'
    options[:xAxis][:categories] = DATES
    options[:yAxis][:title][:enabled] = false
    options[:legend] = {
      enabled: false
    }
    options[:plotOptions] = {
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
    }
    options[:series] = [{
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

    options
  end

  def self.dashTwo
    options = Event.options

    options[:colors] = ['#912520', '#26a8a6']
    options[:chart][:type] = 'column'
    options[:title][:text] = 'Signup Platform by Gender'
    options[:xAxis] = {
        categories: ['Mac', 'Windows', 'iPhone', 'Windows Phone', 'Android']
    }
    options[:yAxis][:title][:enabled] = false
    options[:legend] = {
        reversed: true
    }
    options[:plotOptions] = {
        series: {
            pointWidth: 20
        }
    }
    options[:series] = [{
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

    options
  end

  def self.dashThree
    options = Event.options

    options[:chart][:spacingBottom] = 20
    options[:chart][:type] = 'bar'
    options[:title][:text] = 'Signups by Marketing Channel'
    options[:xAxis][:categories] = ['Search', 'Social Media', 'Affiliate', 'Organic']
    options[:yAxis][:title][:text] = 'Signups'
    options[:legend] = {
      enabled: false
    }
    options[:series] = [{
      name: 'Signups',
      data: [
        Customer.where(signup_channel: 'Search').count,
        Customer.where(signup_channel: 'Social Media').count,
        Customer.where(signup_channel: 'Affiliate').count,
        Customer.where(signup_channel: 'Organic').count
      ]
    }]

    options
  end

  def self.dashFour
    options = Event.options

    options[:colors] = ['#912520', '#26a8a6', '#5C120C', '#C0FFFF', '#C76C61']
    options[:title][:text] = 'Biweekly Purchases by Session Platform'
    options[:xAxis][:categories] = DATES
    options[:yAxis][:title][:text] = 'Percent of Purchases'
    options[:tooltip] = {
      shared: true,
      valueSuffix: ' purchases'
    }
    options[:plotOptions] = {
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
    }
    options[:series] = [{
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

    options
  end

  def self.segSeriesArr(query)
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

    segments.each_with_index do |segment, idx|
      if segment[0] == "all"
        segName = ""
      else
        segName = segment.to_s
      end

      query['events'].each do |eventJawn|
        if eventJawn == 'Add to Cart'
          eventName = 'add'
        elsif eventJawn == 'Proceed to Checkout'
          eventName = 'checkout'
        else
          eventName = eventJawn.downcase
        end

        seriesArr << {
          name: eventName.capitalize + 's' + segName,
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

    seriesArr
  end

  def self.dashSeg(query)
    if query && query['events'] && query['events'].length > 0
      options = Event.options

      options[:query] = {
        events: query['events'],
        properties: if query['properties']
                      query['properties']
                    else
                      []
                    end,
        title: query['title']
      }
      options[:colors] = ['#26a8a6', '#5C120C', '#6B71D1', '#6BD198', '#D16BA4', '#D1CB6B']
      options[:chart][:type] = 'line'
      options[:title][:text] = query['title']
      options[:xAxis][:categories] = DATES
      options[:yAxis] = {
        title: {
          text: 'Quantity'
        },
        min: 0
      }
      options[:plotOptions] = {
        series: {
          marker: {
            symbol: 'circle'
          }
        }
      }
      options[:series] = Event.segSeriesArr(query)

      options
    else
      {
        credits: {
          enabled: false
        }
      }
    end
  end

  def self.segment(query)
    if query && query['events'] && query['events'].length > 0
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
        colors: ['#26a8a6', '#5C120C', '#6B71D1', '#6BD198', '#D16BA4', '#D1CB6B'],
        chart: {
          spacingRight: 40,
          marginTop: 40,
          type: 'line'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: DATES
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
              symbol: 'circle'
            }
          }
        },
        credits: {
          enabled: false
        },
        series: Event.segSeriesArr(query)
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
