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
    game.save
    render :json => game
  end

  def edit
    game = Game.find(params[:id])
  end

  def update
    game = Game.find(params[:id])

    puts game_params
    game.update(game_params)
    puts game.turn
    # byebug
    render :json => game
  end

  def destroy
    game = Game.find(params[:id])
    game.destroy
  end

  private

  def game_params
    params.require(:game).permit(:game_name, :score, :health, :turn, :status)
  end

end
