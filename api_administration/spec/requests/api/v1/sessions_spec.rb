require 'rails_helper'

RSpec.describe "sessions", type: :request do
  describe 'POST /api/v1/login' do
    let!(:super_admin) { FactoryBot.create(:user, :super_admin) }

    it 'returns HTTP status 200 with token' do
      post '/api/v1/login', params: {
          email: super_admin.email,
          password: super_admin.password
      }

      expect(response).to have_http_status 200
      expect(JSON.parse(response.body)['token'].present?).to be_truthy
      expect(JSON.parse(response.body)['user_id']).to eq(super_admin.id)
    end
  end
end