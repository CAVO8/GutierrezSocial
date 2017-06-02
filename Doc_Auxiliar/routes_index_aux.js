var express = require('express');
var router = express.Router();
var userModel = require('../lib/userModel.js');

//GET / "LOGIN"
router.get('/', function(req, res, next) {
  if (req.session.logged === true) {
    res.redirect('/dash')
  } else {
    res.render('index');
  }
});

//POST LOGGEO
router.post('/login', function(req, res, next) {
  userModel.setDB(req.db);
  var username = req.body.username;
  var password = req.body.password;
  userModel.login(username, password, function(err, user) {
    if (err) {
      throw err;
      console.log(err);
    } else {
      if (user!=null){
        req.session.logged = true;
        req.session.name = user.username;
        res.redirect('/dash');
      } else {
        res.send('Error en el logeo, intenta de nuevo')
      }
    }
  })
})

router.get('/signup', function(req, res, next) {
  if (req.session.logged) {
    res.redirect('/dash')
  } else {
    res.render('signup');
  }
})

router.post('/signup', function(req, res, next) {
  userModel.setDB(req.db);
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  userModel.signup(username, password, email, function(err) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      req.session.logged = true;
      req.session.name = username;
      res.redirect('/dash');
    }
  })
})

router.get('/logout', function(req, res, next) {
  req.session.logged = false;
  res.redirect('/')
})

router.get('/dash', function(req, res, next) {
  var username = req.session.name;
  res.render('dash', { username });
})

module.exports = router;