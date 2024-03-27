const express = require('express');
const routesHandler = require('./routes/routesHandler');
const path = require('path')
const session = require('express-session')
const app = express();
const connection = require('./config/connection');
require('dotenv').config()


app.use((req, res, next) => {
    res.header("cache-control", "no-cache private,no-store,must-revalidate");// ,max-stale=0,post-check=0,pre--check=0 
    next();
  })
  
  
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    })   
  ); 
    
  
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
                  
  
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use('/', routesHandler);
  
  







// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));                                          