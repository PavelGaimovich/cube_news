class PagesController < ApplicationController
  def home
    @news = TvNetNewsParserService.new.exec
  end
end
