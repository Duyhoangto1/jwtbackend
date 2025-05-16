const express = require('express');
const { createUser, login,getListUser, getAccount } = require('../controllers/userController');

const auth = require('../middleware/auth');
const delay = require('../middleware/delay');


const routerAPI = express.Router();
routerAPI.all("*",auth)
// Basic GET route to test API
routerAPI.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Hello world from API'
    })
});

// POST route to create user (without /v1/api since it's already defined in the main app file)
routerAPI.post('/register', createUser);
routerAPI.post('/login', login);
routerAPI.get('/user',getListUser);
routerAPI.get('/account',delay ,getAccount);
module.exports = routerAPI;
