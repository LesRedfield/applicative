class Api::EventsController < ApplicationController

  def index
    # conditional logic based on params to decide which class methods
    # to call will reside in event model
    @options = {
      dashboard: {
        one: Event.dashOne,
        two: {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Other Average Conversion Rate'
          },
          subtitle: {
            text: 'AVG time through Funnel, Again'
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
                enabled: true
              },
              enableMouseTracking: true
            }
          },
          series: [{
            name: 'Customers',
            data: [21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 7.0, 6.9, 9.5, 14.5, 18.4]
          }]
        },
        three: {
          chart: {
            type: 'line'
          },
          title: {
            text: 'Yet Another Average Conversion Rate'
          },
          subtitle: {
            text: 'Would you believe it?'
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
                enabled: true
              },
              enableMouseTracking: true
            }
          },
          series: [{
            name: 'Customers',
            data: [9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 7.0, 6.9]
          }]
        },
        four: {
          chart: {
            type: 'line'
          },
          title: {
            text: 'OMG! Another Average Conversion Rate'
          },
          subtitle: {
            text: 'This is getting old'
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
                enabled: true
              },
              enableMouseTracking: true
            }
          },
          series: [{
            name: 'Customers',
            data: [23.3, 18.3, 13.9, 9.6, 7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5]
          }]
        }
      }
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


# {
#   chart: {
#     type: 'line'
#   },
#   title: {
#     text: 'Average Conversion Rate'
#   },
#   subtitle: {
#     text: 'AVG time through Funnel'
#   },
#   xAxis: {
#     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
#   },
#   yAxis: {
#     title: {
#       text: '%'
#     }
#   },
#   plotOptions: {
#     line: {
#       dataLabels: {
#         enabled: true
#       },
#       enableMouseTracking: true
#     }
#   },
#   series: [{
#     name: 'Customers',
#     data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
#   }]
# }
