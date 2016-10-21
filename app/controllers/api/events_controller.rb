class Api::EventsController < ApplicationController

  def index
    if params[:query]
      @options = {
        dashboard: {
          one: {},
          two: {},
          three: {},
          four: {}
        }, segmentation: Event.segment(params[:query])
      }
    else
      @options = {
        dashboard: {
          one: Event.dashOne,
          two: Event.dashTwo,
          three: Event.dashThree,
          four: Event.dashFour
        }, segmentation: {
          query: {
            events: [],
            properties: [],
            title: "Untitled"
          }
        }
      }

      @dashQueries = Query.where(user_id: params[:user_id]).where(dashboard: true)

      @dashQueries.each do |dashQuery|
        query = JSON.parse(dashQuery.query.split('=>').join(': '))

        query['title'] = dashQuery.title

        @options[:dashboard][dashQuery.title] = Event.dashSeg(query)
      end
    end

    render json: @options
  end

end
