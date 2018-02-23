import webapp2

class SlashRedirect(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    self.redirect('//' + self.request.host + '/ioxkl18/')

class Io18Extended(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'io18extended'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/ioxkl18/' + '/'.join(path[2:]))

class IoExtended(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'ioextended'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/ioxkl18/' + '/'.join(path[2:]))

class Io18(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'io18'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/ioxkl18/' + '/'.join(path[2:]))

class Io(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'io'):
        self.redirect('https://www.gdgkl.org')
    else:
        self.redirect('//' + self.request.host + '/ioxkl18/' + '/'.join(path[2:]))

app = webapp2.WSGIApplication([
    ('/ioxkl18.*', SlashRedirect),
    ('/io18extended.*', Io18Extended),
    ('/ioextended.*', IoExtended),
    ('/io18.*', Io18),
    ('/io.*', Io)
], debug=True)