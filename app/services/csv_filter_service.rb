class CsvFilterService
  def initialize params, val
    @params = params # Object of all the params to filter by.
    @val = val # Value to check against (string for address).
  end

  def filter_by_address
    split_vals = @val.split()
    number = split_vals[0].to_i
    street_name = split_vals[1]

    # Use #compact to get rid of any potential nil values that get through.
    num_filter = @params[:number].compact.all? do |k, v|
      if k == :contains
        number.to_s.include?(v)
      elsif k == :exact
        number == v.to_i
      elsif k == :greater_than
        number > v.to_i
      elsif k == :less_than
        number < v.to_i
      else
        handle_invalid_filter_param(k, v)
        return true
      end
    end

    # If the value fails to pass the first number filter, we can return early and forego the second filter.
    if !num_filter
      return false
    end

    # Downcase the address name (val and params). The majority of users will likely not make their searches case-sensitive.
    dc_street_name = street_name.downcase
    street_filter = @params[:street_name].compact.transform_values(&:downcase).all? do |k, v|
      if k == :contains
        dc_street_name.include?(v)
      elsif k == :exact
        dc_street_name == v
      elsif k == :starts_with
        substr_len = v.length
        dc_street_name[0...substr_len] == v
      else
        handle_invalid_filter_param(k, v)
        return true
      end
    end

    # Final filter. If its true, everything passed.
    street_filter
  end

  private
    def handle_invalid_filter_param(k, val)
      puts "ERROR: Invalid address number filter param specified (#{k}) with value of (#{v})."
    end
end