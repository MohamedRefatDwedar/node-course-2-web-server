 const express = require('express');
 const hbs = require('hbs');
 const fs = require('fs');

 const port = process.env.PORT || 3000;

 var app = express();

 hbs.registerPartials(__dirname + '/views/partials');
 app.set('view engine', 'hbs');

 app.use((req, res, next) => {
     var now = new Date().toString();
     var log = `${now}: ${req.method}, ${req.url}`;
     console.log(log);
     fs.appendFile('server.log.txt', log + '\n', (error) => {
         if (error) {
             console.log('Unable to append to server.log file');
         }
     });
     next();
 });

 //  app.use((req, res, next) => {
 //      res.render('maintenance.hbs', {
 //          pageTitle: 'Maintenance Page',
 //          welcomeMessage: 'We are now in maintenance mode we will back soon.'
 //      });
 //  });

 hbs.registerHelper('getCurrentYear', () => {
     return new Date().getFullYear();
 });

 app.use(express.static(__dirname + '/public'));

 hbs.registerHelper('screamIt', (text) => {
     return text.toUpperCase();
 });

 app.get('/', (req, res) => {
     res.send({
         name: 'Mohamed',
         likes: [
             'Novels',
             'Gamed',
             'Latptops'
         ]
     })
 });

 app.get('/about', (req, res) => {
     res.render('about.hbs', {
         pageTitle: 'About Page'
     });
 });

 app.get('/home', (req, res) => {
     res.render('home.hbs', {
         pageTitle: 'Home Page',
         welcomeMessage: 'Welecome to home page'
     });
 });

 app.get('/contact-us', (req, res) => {
     res.render('contact-us.hbs', {
         pageTitle: 'contact-us Page',
         welcomeMessage: 'Contact Us to home page'
     });
 });

 app.get('/bad', (req, res) => {
     res.send({
         errorMessage: 'unable to handle requset.'
     });
 });

 app.listen(port, () => {
     console.log(`Server is up on port ${port}`);
 });