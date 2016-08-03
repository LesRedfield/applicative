class Api::EventsController < ApplicationController

  def index
    # conditional logic based on params to decide which class methods
    # to call will reside in event model
    @options = {
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
        title: {
          text: '%'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: false
        }
      },
      series: [{
        name: 'Customers',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }]
    }
    
    render json: @options
  end

  private

  # def event_params
  #   params.require(:event).permit(
  #
  #     YUP
  #
  #   )
  # end

end
