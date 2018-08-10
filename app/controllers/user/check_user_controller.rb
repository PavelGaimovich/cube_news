class User::CheckUserController < ApplicationController
  skip_before_action :authenticate_user!

  respond_to :js

  def check_name_and_surname
    if User.find_by(name: params[:name], surname: params[:surname]).present?
      render json: :im_used
    else
      render json: :ok
    end
  end

  def check_email
    if User.find_by(email: params[:email]).present?
      render json: :im_used
    else
      render json: :ok
    end
  end
end
