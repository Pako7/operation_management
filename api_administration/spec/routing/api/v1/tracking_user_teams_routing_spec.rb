require "rails_helper"

RSpec.describe Api::V1::TrackingUserTeamsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "api/v1/tracking_user_teams").to route_to("api/v1/tracking_user_teams#index")
    end
  end
end
