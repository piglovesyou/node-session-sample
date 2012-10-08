
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
    res.render('index', {
        uname: req.session && req.session.uname 
    })
});

app.post('/auth', function(req, res) {
  var uname = req.body.uname;
  if (typeof uname == 'string' && uname != '') {
      req.session.uname = uname;
      res.redirect("/");
  } else {
      res.redirect("/");
  }
});

app.get('/logout', function(req, res) {
    req.session.destroy();
    delete req.session;
    res.redirect('/')
});

app.listen(process.argv[2] || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
