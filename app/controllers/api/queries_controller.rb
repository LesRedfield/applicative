class Api::QueriesController < ApplicationController

  def create
    @query = Query.new(query_params)

    if @query.save
      @queries = Query.find_by(user_id: query_params[:user_id])

      render json: @queries
    else
      render json: @query.errors.full_messages, status: 422
    end
  end

  def index
    @queries = Query.where(user_id: query_params[:user_id])


    render json: @queries
  end

  def show

  end

  def destroy
    @query = Query.find(params[:id])
    @query.destroy

    @queries = Query.find_by(user_id: query_params[:user_id])
    render json: @queries
  end

  private

  def query_params
    params.require(:query).permit!
  end

end

# params.require(:query).permit(:user_id, :title, :queryData)
