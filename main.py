import webapp2

class SlashRedirect(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    self.redirect('//' + self.request.host + '/io/')

class Ioxkl19(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'ioxkl19'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

class Io19extended(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'io19extended'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

class Io2019(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'io2019'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

class Io19(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'io19'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

app = webapp2.WSGIApplication([
    ('/io.*', SlashRedirect),
    ('/ioxkl19.*', Ioxkl19),
    ('/io19extended.*', Io19extended),
    ('/io2019.*', Io2019),
    ('/io19.*', Io19)
], debug=True)
