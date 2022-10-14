const express = require('express');
const app = express();
const { data } = require('../data/data.json');
const path = require('path');

app.use(express.static(path.join(__dirname, './public')))

app.use(express.urlencoded( { extended: true } ));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

//const routes = require('./routes');
//app.use('/', routes());

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});