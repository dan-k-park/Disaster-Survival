class HintsController < ApplicationController
    def index
        render :json => Hint.all
      end 
    
      def show
        hint = Hint.find(params[:id])
        render :json => hint
      end

      def new 
        hint = Hint.new
      end
    
      def create
        hint = Hint.new(hint_params)
        hint.save
        render :json => hint
      end

      private

      def hints_params
        params.require(:hint).permit(:content, :disaster_id)
      end

end
