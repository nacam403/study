require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:michael)
  end

  test "should get new" do
    get login_path
    assert_response :success
  end

  test "should redirect to profile page when logged in" do
    log_in_as(@user)
    assert_redirected_to @user
  end

end
