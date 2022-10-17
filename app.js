//Require all dependencies
const express = require('express');
const path = require('path');
const app = express();

//Express middleware for accessing the req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( { extended: false } ));

//Data Hub
const { projects } = require('./data.json');
app.use(express.json());

//Set up the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Static middleware for serving static files
app.use('/static', express.static(path.join(__dirname, 'public')));

//Set Routes
const router = express.Router();

app.get('/', (req, res) => {
    res.render('index', { projects });
  });

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/projects/:id', (req, res, next) => { 
  const { id } = req.params;
  if (projects[id]) {
    res.render('project', {projects: projects[id]})
  }
  });

//404 Error Handler to catch undefined or non-existent route requests
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//Global Error Handler
app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
  }
  if (err.status === 404) {
    err.message = err.message || `404 Page Not Found`
    console.error(err.message);
  } else {
    err.message = err.message || `Woo-Sah! Looks like something went wrong on the server.`
    console.error(err.message);
  }
  //next();
});

//Start up the server 
app.listen(3000, () => {
  console.log('The app is running on the localhost:3000');

});
