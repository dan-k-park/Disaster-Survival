class GamesController < ApplicationController
  def index
    games = Game.all
    render :json => games
  end

  def show
    game = Game.find(params[:id])
    render :json => game
  end

  def new
    game = Game.new
  end

  def create
    game = Game.new(game_params)
    render :json => game
  end

  private

  def game_params
    params.require(:game).permit(:game_name, :score, :health, :turn, :status, :user_id)
  end

end
