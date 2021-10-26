var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Acceder' });
});

router.post('/login', function(req, res, next) {
  res.render('welcome', { title: 'Bienvenido' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registro' });
});

router.post('/register', function(req, res, next) {
  res.render('success', { title: 'Felictaciones' });
});

module.exports = router;
