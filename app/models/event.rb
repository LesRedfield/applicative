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

  EVENTS = {
    'Purchase' => ['purchase', 'Purchases'],
    'Session' => ['session', 'Sessions'],
    'Add to Cart' => ['add', 'Cart Adds'],
    'Proceed to Checkout' => ['checkout', 'Checkouts']
  }

  PROP_NAMES = {
    'AB Group' => 'ab_group',
    'Marketing Channel' => 'signup_channel',
    'Signup Platform' => 'signup_platform',
    'Age' => 'age',
    'Gender' => 'gender'
  }

  PROPERTIES = {
    signup_platform: [['Mac'], ['Windows'], ['iPhone'], ['Windows Phone'], ['Android']],
    signup_channel: [['Search'], ['Social Media'], ['Affiliate'], ['Organic']],
    ab_group: [['A'], ['B']],
    age: [[18, 30], [30, 45], [45, 60]],
    gender: [[false], [true]]
  }

  DATES = ['May 03', 'May 17', 'May 31', 'Jun 14', 'Jun 28']

  INTERVALS = [
    [90.days.ago, 76.days.ago],
    [76.days.ago, 62.days.ago],
    [62.days.ago, 48.days.ago],
    [48.days.ago, 34.days.ago],
    [34.days.ago, 20.days.ago]
  ]

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
      data: INTERVALS.map do |interval|
        Event.purchase_between(interval[0], interval[1]).map do |event|
          event.customer.age
        end.mean.to_i
      end,
      lineWidth: 1
    }]

    options
  end

  def self.dashTwo
    options = Event.options

    options[:colors] = ['#26a8a6', '#912520']
    options[:chart][:type] = 'column'
    options[:title][:text] = 'Signup Platform by Gender'
    options[:xAxis] = {
        categories: ['Mac', 'Windows', 'iPhone', 'Windows Phone', 'Android']
    }
    options[:yAxis][:title][:enabled] = false
    options[:plotOptions] = {
        series: {
            pointWidth: 20
        }
    }
    options[:series] = PROPERTIES[:gender].map do |gender|
      {
        name: gender[0] ? 'Female' : 'Male',
        data: PROPERTIES[:signup_platform].map do |platform|
            Customer.where(gender: gender[0], signup_platform: platform[0]).count
        end
      }
    end

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
      data: PROPERTIES[:signup_channel].map do |channel|
          Customer.where(signup_channel: channel[0]).count
      end
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
    options[:series] = PROPERTIES[:signup_platform].map do |platform|
      {
        name: platform[0],
        data: INTERVALS.map do |interval|
          Event.purchase_between(interval[0], interval[1]).where(session_platform: platform[0]).count
        end
      }
    end

    options
  end

  def self.segSeriesArr(query)
    queryEvents = query['events'].map do |queryEvent|
      EVENTS[queryEvent]
    end

    if query['properties']
      byProp = PROP_NAMES[query['properties'][0]]
      segments = PROPERTIES[byProp.to_sym]
    else
      byProp = 'none'
      segments = [['all']]
    end

    seriesArr = []

    queryEvents.each do |queryEvent|
      eventName = queryEvent[0]

      segments.each do |segment|
        if segment[0] == "all"
          segName = ""
        else
          segName = segment.to_s
        end

        seriesArr << {
          name: queryEvent[1] + segName,
          data: if byProp == 'none'
            INTERVALS.map do |interval|
              Event.send(eventName.downcase + '_between', interval[0], interval[1]).count
            end
          elsif segment.length < 2
            INTERVALS.map do |interval|
              Event.send(eventName.downcase + '_between', interval[0], interval[1])
              .select do |event|
                event.customer.send(byProp) == segment[0]
              end.count
            end
          else
            INTERVALS.map do |interval|
              Event.send(eventName.downcase + '_between', interval[0], interval[1])
              .select do |event|
                event.customer.send(byProp) >= segment[0] &&
                event.customer.send(byProp) < segment[1]
              end.count
            end
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
