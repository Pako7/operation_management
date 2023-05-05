require 'rails_helper'

RSpec.describe "/api/v1/teams", type: :request do

  let(:valid_attributes) {
    FactoryBot.build(:team).attributes
  }

  let(:invalid_attributes) {
    { name: '' }
  }

  let!(:super_admin) { FactoryBot.create(:user, :super_admin) }

  let(:valid_headers) {
    { Authorization: "Bearer #{create_token(super_admin)}" }
  }

  describe "GET /index" do
    let!(:team) { FactoryBot.create(:team) }
    it '#index, returns HTTP status 200' do
      get '/api/v1/teams', headers: valid_headers, as: :json
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end

  describe "GET /show" do
    let!(:team) { FactoryBot.create(:team) }
    it '#show, returns HTTP status 200' do
      get "/api/v1/teams/#{team.id}", headers: valid_headers, as: :json
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['team']['name']).to eq(team.name)
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Team" do
        expect {
          post '/api/v1/teams',
               params: { team: valid_attributes }, headers: valid_headers, as: :json
        }.to change(Team, :count).by(1)
      end

      it "renders a JSON response with the new team" do
        post '/api/v1/teams',
             params: { team: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(201)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Team" do
        expect {
          post '/api/v1/teams',
               params: { team: invalid_attributes }, as: :json
        }.to change(Team, :count).by(0)
      end

      it "renders a JSON response with errors for the new team" do
        post '/api/v1/teams',
             params: { team: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "PATCH /update" do
    let!(:team) { FactoryBot.create(:team) }

    context "with valid parameters" do
      let(:new_attributes) {
        {name: 'new name'}
      }

      it "updates the requested team" do
        patch "/api/v1/teams/#{team.id}",
              params: { team: new_attributes }, headers: valid_headers, as: :json
        expect(team.reload.name).to eq(new_attributes[:name])
      end

      it "renders a JSON response with the team" do
        patch "/api/v1/teams/#{team.id}",
              params: { team: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the team" do
        patch "/api/v1/teams/#{team.id}",
              params: { team: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    let!(:team) { FactoryBot.create(:team) }
    it "destroys the requested team" do
      expect {
        delete "/api/v1/teams/#{team.id}", headers: valid_headers, as: :json
      }.to change(Team, :count).by(-1)
    end
  end
end
