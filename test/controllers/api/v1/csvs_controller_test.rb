require "test_helper"

class Api::V1::CsvsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_v1_csvs_create_url
    assert_response :success
  end
end
