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


  # lots of class methods that take event params and return properly formatted data


  def self.dashOne
    {
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
        ]
      }]
    }
  end

  def self.dashTwo
    {
      chart: {
          type: 'bar'
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
              stacking: 'normal'
          }
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
      chart: {
          type: 'column'
      },
      title: {
          text: 'Average Age by Marketing Channel & A/B Group'
      },
      subtitle: {
        text: 'ActiveRecord is tha Bombdiggity'
      },
      xAxis: {
          categories: ['Search', 'Social Media', 'Affiliate', 'Organic']
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Average Age'
          }
      },
      legend: {
          reversed: true

      },
      plotOptions: {
          series: {
              stacking: 'normal'
          }
      },
      series: [{
        name: 'Group A',
        data: [
          Customer.where(ab_group: 'A', signup_channel: 'Search').average(:age).to_i,
          Customer.where(ab_group: 'A', signup_channel: 'Social Media').average(:age).to_i,
          Customer.where(ab_group: 'A', signup_channel: 'Affiliate').average(:age).to_i,
          Customer.where(ab_group: 'A', signup_channel: 'Organic').average(:age).to_i,
        ]
      }, {
        name: 'Group B',
        data: [
          Customer.where(ab_group: 'B', signup_channel: 'Search').average(:age).to_i,
          Customer.where(ab_group: 'B', signup_channel: 'Social Media').average(:age).to_i,
          Customer.where(ab_group: 'B', signup_channel: 'Affiliate').average(:age).to_i,
          Customer.where(ab_group: 'B', signup_channel: 'Organic').average(:age).to_i,
        ]
      }, {
        name: 'Neither',
        data: [
          Customer.where(ab_group: nil, signup_channel: 'Search').average(:age).to_i,
          Customer.where(ab_group: nil, signup_channel: 'Social Media').average(:age).to_i,
          Customer.where(ab_group: nil, signup_channel: 'Affiliate').average(:age).to_i,
          Customer.where(ab_group: nil, signup_channel: 'Organic').average(:age).to_i,
        ]
      }]
    }
  end

  def self.dashFour
    {
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
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
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

  def self.segment(event)
    if event

      {
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
        series: [{
          name: 'Age',
          data: [



            Event.send(event + '_between', 90.days.ago, 76.days.ago).map do |event|
              event.customer.age
            end.mean.to_i,
            Event.send(event + '_between', 76.days.ago, 62.days.ago).map do |event|
              event.customer.age
            end.mean.to_i,
            Event.send(event + '_between', 62.days.ago, 48.days.ago).map do |event|
              event.customer.age
            end.mean.to_i,
            Event.send(event + '_between', 48.days.ago, 34.days.ago).map do |event|
              event.customer.age
            end.mean.to_i,
            Event.send(event + '_between', 34.days.ago, 20.days.ago).map do |event|
              event.customer.age
            end.mean.to_i
          ]
        }]
      }

    else
      {}
    end
  end

end


# Event.send(event + '_between', 90.days.ago, 76.days.ago).map { |event| event.customer.age}.mean.to_i
