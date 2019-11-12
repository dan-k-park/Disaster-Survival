class ProtectionsController < ApplicationController
    def index
        render :json => Protection.all
      end 
    
      def show
        @protection = Protection.find(params[:id])
        render :json => @protection
      end
end
