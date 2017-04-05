'use strict';
var User = require('./users/user.model');
var router = require('express').Router();

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

router.post('/login', function(req, res, next){
  User.findOne({
    where: req.body
  })
  .then(function(user){
    if (!user) {
      res.sendStatus(401)
    } else {
      req.session.userId = user.id
      res.status(204).send(user)
    }
  })
  .catch(next)
})

router.put('/logout', function(req, res, next) {
  console.log('you hit the backend api/logout!')
  req.session.userId = null;
  req.session.destroy();
  res.sendStatus(204)
})

module.exports = router;
