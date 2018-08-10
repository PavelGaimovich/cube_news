Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users
  post :check_name_and_surname, controller: 'user/check_user'
  post :check_email, controller: 'user/check_user'

  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
