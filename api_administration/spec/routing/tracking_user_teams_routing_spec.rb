require "rails_helper"

RSpec.describe TrackingUserTeamsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/tracking_user_teams").to route_to("tracking_user_teams#index")
    end

    it "routes to #show" do
      expect(get: "/tracking_user_teams/1").to route_to("tracking_user_teams#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/tracking_user_teams").to route_to("tracking_user_teams#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/tracking_user_teams/1").to route_to("tracking_user_teams#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/tracking_user_teams/1").to route_to("tracking_user_teams#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/tracking_user_teams/1").to route_to("tracking_user_teams#destroy", id: "1")
    end
  end
end
