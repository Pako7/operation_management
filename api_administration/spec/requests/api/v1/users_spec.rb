require 'rails_helper'

RSpec.describe "/api/v1/users", type: :request do

  let(:valid_attributes) {
    attrs = FactoryBot.build(:user).attributes
    attrs[:password] = '123123123'
    attrs
  }

  let(:invalid_attributes) {
    { name: '' }
  }

  let!(:super_admin) { FactoryBot.create(:user, :super_admin) }

  let(:valid_headers) {
    { Authorization: "Bearer #{create_token(super_admin)}" }
  }

  describe 'GET /index' do
    let!(:admin) { FactoryBot.create(:user, :admin) }
    it '#index, returns HTTP status 200' do
      get '/api/v1/users', headers: valid_headers, as: :json
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe 'GET /show' do
    let!(:admin) { FactoryBot.create(:user, :admin) }
    it '#show, returns HTTP status 200' do
      get "/api/v1/users/#{admin.id}", headers: valid_headers, as: :json
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['user']['email']).to eq(admin.email)
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new User" do
        expect {
          post '/api/v1/users',
               params: { user: valid_attributes }, headers: valid_headers, as: :json
        }.to change(User, :count).by(1)
      end

      it "renders a JSON response with the new user" do
        post '/api/v1/users',
             params: { user: valid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(201)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new User" do
        expect {
          post '/api/v1/users',
               params: { user: invalid_attributes }, as: :json
        }.to change(User, :count).by(0)
      end

      it "renders a JSON response with errors for the new user" do
        post '/api/v1/users',
             params: { user: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "PATCH /update" do
    let!(:user) { FactoryBot.create(:user) }

    context "with valid parameters" do
      let(:new_attributes) {
        {name: 'new name'}
      }

      it "updates the requested user" do
        patch "/api/v1/users/#{user.id}",
              params: { user: new_attributes }, headers: valid_headers, as: :json
        expect(user.reload.name).to eq(new_attributes[:name])
      end

      it "renders a JSON response with the user" do
        patch "/api/v1/users/#{user.id}",
              params: { user: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the user" do
        patch "/api/v1/users/#{user.id}",
              params: { user: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    let!(:user) { FactoryBot.create(:user) }
    it "destroys the requested user" do
      expect {
        delete "/api/v1/users/#{user.id}", headers: valid_headers, as: :json
      }.to change(User, :count).by(-1)
    end
  end

end