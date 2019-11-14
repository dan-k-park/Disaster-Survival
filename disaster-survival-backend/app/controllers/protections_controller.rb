class ProtectionsController < ApplicationController
    def index
        render :json => Protection.all
    end 
    
    def show
      protection = Protection.find(params[:id])
      render :json => protection
    end

    def new 
      protection = Protection.new
    end
  
    def create
      protection = Protection.new(protection_params)
      protection.save
      render :json => protection
    end

    private

    def protection_params
      params.require(:protection).permit(:name, :price, :buff, :game_id)
    end
end
