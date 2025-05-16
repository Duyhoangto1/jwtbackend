import express from 'express';

const router = express.Router();

/**
 * 
 * @param {*} app 
 */
const webRouter = (app) => {
    // Define the home route
    router.get('/', (req, res) => {
        return res.send('Hello World');
        // res.render('home');
    });

    // Define the about route
    router.get('/about', (req, res) => {
        res.render('about');
    });

    // Define the contact route
    router.get('/contact', (req, res) => {
        res.render('contact');
    });

    // Use the router in the app
    return app.use('/', router);
}
export default webRouter;