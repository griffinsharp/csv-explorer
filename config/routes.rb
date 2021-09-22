Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'csvs' => 'csvs#index'
      post 'csvs' => 'csvs#create'
    end
  end
end