import express, { application } from 'express';

/**
 * 
 * @param {*} app 
 */
const viewEngine = (app) => {
     // Set the static files directory
    app.use(express.static('./src/public'));
      
    // app.use(express.urlencoded({ extended: true }));

     // Set the view engine to ejs
    app.set('view engine', 'ejs');
    // Set the views directory
    app.set('views', './src/views');
 
    }

export default viewEngine;