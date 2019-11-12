class DisastersController < ApplicationController
    def index
        render :json => Disaster.all
      end 
    
      def show
        @disaster = Disaster.find(params[:id])
        render :json => @disaster
      end
end
