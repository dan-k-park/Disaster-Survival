class UsersController < ApplicationController
  def index
    render :json => User.all
  end

  def show
    user = User.find(params[:id])
    render :json => user
  end

  def new 
    user = User.new
  end

  def create
    user = User.new(user_params)
    user.save
    render :json => user
  end

  def edit
    user = User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render :json => user
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end

end
