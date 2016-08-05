class Api::EventsController < ApplicationController

  def index
    # conditional logic based on params to decide which class methods
    # to call will reside in event model
    @options = {
      dashboard: {
        one: Event.dashOne,
        two: Event.dashTwo,
        three: Event.dashThree,
        four: Event.dashFour
      }, segmentation: Event.segment(params[:event])
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
