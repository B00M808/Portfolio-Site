const express = require('express');
const app = express();
const router = express.Router();

const homeRoute = require('./home');
const aboutRoute = require('./about');
//use and next
router.get('/', (req, res) => {
    res.send('Home Page');
  });

router.get('/about', (req, res) => {
  res.send('About Page');
});

router.get('/project/:1', (req, res) => {
    //Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  res.send(req.params);
})

//router.use(function(req, res, next) {
//  next()
//})

module.exports = router;
