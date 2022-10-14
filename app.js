const express = require('express');
const app = express();
const { data } = require('../data/data.json');
const path = require('path');

const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, './public')))

app.use(express.urlencoded( { extended: false } ));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));


//Setting Routes

const router = express.Router();
const id = req.params.id;
  res.render('project', {
    projects: data.projects[id]
  });

//const homeRoute = require('./home');
const aboutRoute = require('./about');

app.get('/', (req, res) => {
    res.render('index', { projects });
  });

app.get('/about', (req, res) => {
  res.render('About Page');
});

app.get('/projects/:id', (req, res, next) => { 
  res.send(req.params);
  next();
})

module.exports = router;

//This Middleware will be responsible for creating the error object & handing off to the error handler

app.use((err, req, res, next) => {

  const err = new Error('Not Found');

err.status = 404;

  next(err); 

});

//we can set the status of the response using the status method on the response object. The status method takes the number of the code. If there is an error in the code on the server it will throw a status 500, this is a general error. 

app.use((err, req, res, next) => {

  console.log(500);

  const err = new Error('Uh-Oh!');

err.status = 500;

  next(err); 
});

app.use((err, req, res, next) => {

  console.log("Internal Server Error");

  res.locals.error = err;

res.status(error. status);

  res.render('error'); 

});


app.listen(3000, () => {

  console.log('The app is running on the localhost:3000');

});

