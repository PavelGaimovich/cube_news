require 'open-uri'

class TvNetNewsParserService
  TV_NET_URL = 'https://www.tvnet.lv/rss'

  def initialize
    @doc = Nokogiri::HTML(open(TV_NET_URL))
  end

  def exec
    items = @doc.xpath('//item').first(5)
    items.map do |item|
      {
        title: item.css('title').text,
        description: item.css('description').text,
        link: item.css('link').text,
        image_url: item.css('enclosure').attribute('url').value
      }
    end
  end
end
