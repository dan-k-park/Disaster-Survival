class UsersController < ApplicationController
  def index
    render :json => User.all
  end

  def show
    user = User.find(params[:id])
    render :json => user
  end

  def new 
    @user = User.new
  end

  def create
    @user = User.(user_params)
    render :json => @user
  end

  # def edit
  #   @user = User.find(params[:id])
  # end

  # def update
  # end

  private

  def user_params
    params.require(:user).permit(:username)
  end

end
