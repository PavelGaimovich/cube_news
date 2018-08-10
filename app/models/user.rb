class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :name, :surname, presence: true
  validates :name, uniqueness: { scope: :surname, message: 'with given Surname already been taken' }
end
