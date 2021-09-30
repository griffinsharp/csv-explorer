Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'csvs' => 'csvs#create'
    end
  end
end
