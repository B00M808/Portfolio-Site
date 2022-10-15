//Require all dependencies
const express = require('express');
const app = express();
const { data } = require('../data/data.json');
//const path = require('path');

//Set up the template engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

//Express middleware for accessing the req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( { extended: false } ));

//Static middleware for serving static files
app.use('/static', express.static(path.join(__dirname, './public')))

//Setting Routes
const router = express.Router();
const id = req.params.id;
  res.render('project', {
    projects: data.projects[id]
  });

//Rendered the index
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

/*
  alternatively:
  app.get("/noroute", (req,res) => {
    res.send(__dirname, './noroute')
  })

  //////Temporarily throwing an intentional 500 error
  app.get("/project/noroute", (req,res) => {
    res.send(__dirname, './project/noroute')
  })

};
*/
module.exports = router;

//404 Error Handler to catch undefined or non-existent route requests
app.use((req, res, next) => {

  console.log('404 error handler called');

res.status(404).render('not-found');

});

//Global Error Handler
app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
  }
  if (err.status === 404) {
    res.status(404).render('not-found', { err });
  } else {
    err.message = err.message || `Woo-Sah! Looks like something went wrong on the server.`
    res.status(err.status || 500).render('error', { err });
  }
});

//Start up the server 
app.listen(3000, () => {
  console.log('The app is running on the localhost:3000');

});

