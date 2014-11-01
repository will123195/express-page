# express-page

Simple webpage controllers for Express.

Provides a `Page` object context for your controller with the
following properties:

- `this.req`
- `this.res`
- `this.accessDenied()`
- `this.css[]`
- `this.js[]`
- `this.notFound()`
- `this.params`
- `this.redirect()`
- `this.render()`
- `this.setView()`
- `this.setLayout()`
- `this.templates`


### Install

```
npm install express-page
```

### Basic example
```js
var express = require('express')
var Page = require('express-page')
var app = express()
var db = {
  count: 0
}
var controller = function() {
  this.db.count++
  this.res.send('Count is ' + this.db.count)
}

app.get('/example', function(req, res) {
  var page = Page(controller, {
    db: db
  }, req, res)
  page.run()
})
```

### Dynamic routing based on file scan
```js
var express = require('express')
var scan = require('sugar-glob')
var Page = require('express-page')
var app = express()

scan({
  dir: './pages'
})
.file('*index.js', function(file) {
  var uri = '/' + file.dir
  app.get(uri, function(req, res) {
    var controller = require(file.filename)
    var page = Page(controller, {}, req, res)
    page.run()
  })
})

```



