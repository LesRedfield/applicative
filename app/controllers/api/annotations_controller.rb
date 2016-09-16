class Api::AnnotationsController < ApplicationController

  def create
    @annotation = Annotation.new(annotation_params)

    if @annotation.save
      
      render json: @annotation
    else
      render json: @annotation.errors.full_messages, status: 422
    end
  end

  def show

  end

  private

  def annotation_params
    params.require(:annotation).permit(:user_id, :title, :body, :session, :cart_add, :checkout, :purchase, :date)
  end

end
