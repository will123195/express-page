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
  self.templates = {}
  self._controller = controller
  self._view = null
  self._layout = null

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

Page.prototype.render = function() {
  if (!this.templates[this._view]) {
    var msg = 'No template for ' + this._view
    throw new Error(msg)
  }
  var html = this.templates[this._view](this)
  if (this._layout) {
    this.main = html
    html = this.templates[this._layout](this)
  }
  this.res.send(html)
}

Page.prototype.setLayout = function(template) {
  this._layout = template
}

Page.prototype.setView = function(template) {
  this._view = template
}