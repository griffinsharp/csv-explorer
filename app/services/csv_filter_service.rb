class CsvFilterService
  def initialize params, val
    @params = params # Object of all the params to filter by.
    @val = val # Value to check against (string for address).
  end

  def filter_by_address
    split_vals = @val.split()
    number = split_vals[0].to_i
    street_name = split_vals[1]

    # Use #compact to get rid of any nil values.
    num_filter = @params[:number].compact.all? do |k, v|
      if k == :contains
        number.to_s.include?(v.to_s)
      elsif k == :exact
        number == v
      elsif k == :greater_than
        number > v
      elsif k == :less_than
        number < v
      else
        handle_invalid_filter_param(k, v)
        return true
      end
    end

    # If the value fails to pass the first number filter, we can return early and forego the second filter.
    if !num_filter
      return false
    end

    # Downcase the address name. The vast majority of users will likely not make their searches case-sensitive.
    street_filter = @params[:street_name].compact.transform_values(&:downcase).all? do |k, v|
      return true if v.nil?

      if k == :contains
        street_name.include?(v)
      elsif k == :exact
        street_name == v
      elsif k == :starts_with
        substr_len = v.length
        street_name[0...substr_len] == v
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

    def remove_dash

    end

end