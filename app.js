//Require all dependencies
const express = require('express');
const path = require('path');
const app = express();

//Express middleware for accessing the req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( { extended: false } ));

//Data Hub
const { data } = require('./data.json');
app.use(express.json());

//Set up the template engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

//Static middleware for serving static files
app.use('/static', express.static(path.join(__dirname, './public')));

//Set Routes
const router = express.Router();

app.get('/', (req, res) => {
    res.render('index', { projects });
  });

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/projects/:id', (req, res) => { 
  const { id } = req.params;
  res.render('project', { 
    projects: data.projects[id] });

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
//next();
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
  //next();
});

//Start up the server 
app.listen(3000, () => {
  console.log('The app is running on the localhost:3000');

});
