import webapp2

class SlashRedirect(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    self.redirect('//' + self.request.host + '/devfest/')

class Devfest2018(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'devfest2018'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/devfest/' + '/'.join(path[2:]))

class Devfest18(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'devfest18'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/devfest/' + '/'.join(path[2:]))

app = webapp2.WSGIApplication([
    ('/devfest.*', SlashRedirect),
    ('/devfest2018.*', Devfest2018),
    ('/devfest18.*', Devfest18)
], debug=True)