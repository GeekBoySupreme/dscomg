import webapp2

class SlashRedirect(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    self.redirect('//' + self.request.host + '/io/')

class Ioxkl18(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'ioxkl18'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

class Io18extended(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'io18extended'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

class Io2018(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'io2018'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

class Io18(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'io18'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

app = webapp2.WSGIApplication([
    ('/io.*', SlashRedirect),
    ('/ioxkl18.*', Ioxkl18),
    ('/io18extended.*', Io18extended),
    ('/io2018.*', Io2018),
    ('/io18.*', Io18)
], debug=True)