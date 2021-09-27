require 'csv'

class Api::V1::CsvsController < ApplicationController
  COLS = %w(
    SALE\ TYPE
    SOLD\ DATE
    TYPE
    ADDRESS
    CITY
    STATE\ OR\ PROVINCE
    ZIP
    PRICE
    BD
    BA
    LOC
    SQFT
    LOT\ SIZE
    YEAR\ BUILT
    DAYS\ ON\ MARKET
    $/SQFT
    HOA/MONTH
    STATUS
    NEXT\ OPEN\ HOUSE\ START\ TIME
    NEXT\ OPEN\ HOUSE\ END\ TIME
    URL
    SOURCE
    MLS#
    FAV
    INTERESTED
    LAT
    LONG
  ).freeze

  ADDRESS = 'ADDRESS'.freeze
  BATHS = 'BATHS'.freeze
  BEDS = 'BEDS'.freeze
  FAV = 'FAVORITE'.freeze
  LAT = 'LATITUDE'.freeze
  LOC = 'LOCATION'.freeze
  LONG = 'LONGITUDE'.freeze
  PRICE_SQ_FT = '$/SQUARE FEET'.freeze
  PROP_TYPE = 'PROPERTY TYPE'.freeze
  SQ_FT = 'SQUARE FEET'.freeze
  URL = 'URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)'.freeze
  ZIP = 'ZIP OR POSTAL CODE'.freeze

  HEADERS_MAP = {
    BATHS => 'BA',
    BEDS => 'BD',
    FAV => 'FAV',
    LAT => 'LAT',
    LOC => 'LOC',
    LONG => 'LONG',
    PRICE_SQ_FT => '$/SQFT',
    PROP_TYPE => 'TYPE',
    SQ_FT => 'SQFT',
    URL => 'URL',
    ZIP => 'ZIP'
  }.freeze

  # Maps column name => component => filter type
  FILTERS_MAP = {
    ADDRESS => {
      number: ['contains', 'exact', 'greater_than', 'less_than'],
      street_name: ['contains', 'exact', 'starts_with']
    },
    BEDS => {
      amount: ['exact', 'greater_than', 'less_than']
    },
    BATHS => {
      amount: ['exact', 'greater_than', 'less_than']
    }
  }

  def index
    render json: { goats: ['kendrick', 'MF DOOM'] }
  end

  def create
    table_arr = CSV.parse(csv_params.tempfile, headers: true).to_a
    headers = format_headers(table_arr[0])
    rows = table_arr[1..-1]

    # Filter rows, if any filters are sent in the request.
    # TODO: Make it so it checks for nested being empty, not top level keys.
    rows = filter_rows(rows) if !filter_params.empty?

    render json: { headers: headers, rows: rows }
  end

  private
    def csv_params
      permitted_params['csv']
    end

    def filter_params
      JSON.parse(permitted_params['filters'], { symbolize_names: true })
    end

    def permitted_params
      params.permit('csv', 'filters')
    end

    def filter_rows(rows)
      filter_names = filter_params.keys

      rows.select do |row|
        filter_names.all? do |filter|
          if valid_filter?(filter)
            index = find_filter_column(filter)
            val = row[index]

            # If we are filtering by an attribute, and the attr's value is nil, skip/return early.
            # While this isn't required, it will help reduce the number of calls to the filter helper.
            return false if val.nil?
            filter_service = CsvFilterService.new(filter_params[filter], val)
            filter_service.send(:"filter_by_#{filter}") if filter_service.respond_to?(:"filter_by_#{filter}")
          else
            puts "ERROR: Filter (#{filter}) not allowed or not recognized."
            return true
          end
        end
      end
    end

    def format_headers(headers)
      # Some of the headers are unnecessarily long for the UI.
      headers.map { |h| h.in?(HEADERS_MAP.keys) ? HEADERS_MAP[h] : h }
    end

    def find_filter_column(filter)
      COLS.find_index(filter.to_s.upcase)
    end

    def valid_filter?(filter)
      (filter.to_s.upcase).in?(FILTERS_MAP.keys)
    end
end
