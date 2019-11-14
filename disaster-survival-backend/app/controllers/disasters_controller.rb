class DisastersController < ApplicationController
    def index
      render :json => Disaster.all
    end 
    
    def show
      disaster = Disaster.find(params[:id])
      render :json => disaster
    end

    def new 
      disaster = Disaster.new
    end
  
    def create
      disaster = Disaster.new(disaster_params)
      disaster.save
      render :json => disaster
    end

    private

    def disaster_params
      params.require(:disaster).permit(:name, :damage)
    end

end
