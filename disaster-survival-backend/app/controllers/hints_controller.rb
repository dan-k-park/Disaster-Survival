class HintsController < ApplicationController
    def index
        render :json => Hint.all
      end 
    
      def show
        @hint = Hint.find(params[:id])
        render :json => @hint
      end
end
