class Api::EventsController < ApplicationController

  def index
    @dashQueries = Query.where(user_id: params[:user_id]).where(dashboard: true)

    @options = {
      dashboard: {
        one: Event.dashOne,
        two: Event.dashTwo,
        three: Event.dashThree,
        four: Event.dashFour
      }, segmentation: Event.segment(params[:query])
    }

    @dashQueries.each do |dashQuery|
      query = JSON.parse(dashQuery.query.split('=>').join(': '))

      query['title'] = dashQuery.title

      @options[:dashboard][dashQuery.title] = Event.dashSeg(query)
    end

    render json: @options
  end

end
