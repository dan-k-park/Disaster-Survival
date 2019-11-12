class DisastersController < ApplicationController
    def index
        render :json => Disaster.all
      end 
    
      def show
        @disaster = Disaster.find(params[:id])
        render :json => @disaster
      end

      def create
        @disaster = Disaster.create(disaster_params)
        end

    private

    def disaster_params
        require(:disaster).permit(:id, :name, :damage)
    end
end
