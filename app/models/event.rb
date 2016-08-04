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

  def self.dashOne
    {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Average Conversion Rate'
      },
      subtitle: {
        text: 'AVG time through Funnel'
      },
      xAxis: {
        categories: ['May 03', 'May 08', 'May 13', 'May 18', 'May 23', 'May 28',
          'Jun 02', 'Jun 07', 'Jun 12', 'Jun 17', 'Jun 22', 'Jun 27', 'Jul 02', 'Jul 07']
      },
      yAxis: {
        title: {
          text: '%'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: true
        }
      },
      series: [{
        name: 'Customers',
        data: Event.all.map do |event|
                !!event.purchase ? 1 : 0
              end
      }]
    }
  end

end
