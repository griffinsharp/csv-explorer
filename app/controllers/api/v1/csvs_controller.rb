class Api::V1::CsvsController < ApplicationController
  def index
    render json: { goats: ['kendrick', 'MF DOOM'] }
  end

  def create
  end
end
