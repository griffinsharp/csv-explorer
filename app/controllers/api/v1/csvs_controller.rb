require 'csv'

class Api::V1::CsvsController < ApplicationController
  def index
    render json: { goats: ['kendrick', 'MF DOOM'] }
  end

  def create
    file = csv_params.tempfile
    table = CSV.parse(file, headers: true).to_a
    headers = table[0]
    rows = table[1..-1]
    # do some filtering here on rows only.

    render json: { headers: headers, rows: rows }
  end

  private
    def csv_params
      params.require(:csv)
    end
end
