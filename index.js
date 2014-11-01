var Page = module.exports = function(controller, helpers, req, res) {
  var self = this

  if (!(this instanceof Page)) {
    return new Page(controller, helpers, req, res)
  }

  if (typeof controller !== 'function') {
    throw new Error('express-page expects first argument to be a function.')
  }

  self.req = req
  self.res = res
  self.js = []
  self.css = []
  self._controller = controller

  helpers = helpers || {}
  Object.keys(helpers).forEach(function(helper) {
    self[helper] = helpers[helper]
  })
}

Page.prototype.run = function() {
  this._controller(this)
}

Page.prototype.notFound = function() {
  this.res.status(404).send('Not found.');
}

Page.prototype.accessDenied = function() {
  this.res.status(403).send('Access denied.')
}

Page.prototype.redirect = function() {
  this.res.redirect.apply(this, arguments)
}