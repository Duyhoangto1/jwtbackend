import express from 'express';
import * as homecontroller from '../controller/homeController.js';


const router = express.Router();

/**
 * 
 * @param {*} app 
 */
const webRouter = (app) => {
    // Define the home route
    router.get('/', homecontroller.handleHome);
 router.get('/user', homecontroller.handleUser);
 router.get('/login', homecontroller.handleLogin);
router.get('/register', homecontroller.handleRegisterPage);
router.post('/register', homecontroller.handleRegister);
router.get('/user/edit/:id', homecontroller.handleEditUserPage);
router.post('/user/edit/:id', homecontroller.handleEditUser);
    // Define the about route
    router.post('/user/delete/:id', homecontroller.handleDeleteUser);
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