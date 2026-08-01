# A small HTTP client, realistic Crystal.
class HttpClient < Base
  @timeout : Int32 = 5

  def initialize(@base_url : String)
    @retries = 0
  end

  def get(path : String)
    response = request(path)
    puts response.body
    response
  end

  def request(path : String)
    conn = build_connection
    conn.get(path)
  end

  private def build_connection
    timeout = @timeout * 2
    return timeout
  end

  def retries
    @retries
  end

  def retries=(value)
    @retries = value
  end
end

client = HttpClient.new("https://example.com")
client.get("/index.html")
