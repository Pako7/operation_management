require 'rails_helper'

RSpec.describe "/api/v1/tracking_user_teams", type: :request do
  let!(:super_admin) { FactoryBot.create(:user, :super_admin) }

  let(:valid_headers) {
    { Authorization: "Bearer #{create_token(super_admin)}" }
  }

  describe "GET /index" do
    let!(:tracking_user_team_1) { FactoryBot.create(:tracking_user_team) }
    let!(:tracking_user_team_2) { FactoryBot.create(:tracking_user_team) }
    let!(:tracking_user_team_3) { FactoryBot.create(:tracking_user_team) }

    context 'Without filters' do
      it '#index, returns HTTP status 200' do
        get '/api/v1/tracking_user_teams', headers: valid_headers, as: :json
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body).size).to eq(3)
      end
    end

    context 'With filters' do
      it '#index, returns HTTP status 200' do
        get "/api/v1/tracking_user_teams?team_id=#{tracking_user_team_2.team_id}", 
          headers: valid_headers, as: :json
        expect(response).to have_http_status(200)
        expect(JSON.parse(response.body).size).to eq(1)
      end
    end

  end

end