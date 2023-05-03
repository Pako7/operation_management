Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      post 'login', to: 'sessions#create'

      resources :users
      resources :teams
      resources :tracking_user_teams, only: [:index]
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
