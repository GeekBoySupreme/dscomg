import webapp2

class SlashRedirect(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    self.redirect('//' + self.request.host + '/iostaging/')

app = webapp2.WSGIApplication([
    ('/iostaging.*', SlashRedirect)
], debug=True)