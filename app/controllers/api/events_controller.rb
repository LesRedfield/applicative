class Api::EventsController < ApplicationController

  def index
    @options = {
      dashboard: {
        one: Event.dashOne,
        two: Event.dashTwo,
        three: Event.dashThree,
        four: Event.dashFour
      }, segmentation: Event.segment(params[:query])
    }

    render json: @options
  end

end
