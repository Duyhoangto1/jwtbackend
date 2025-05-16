import express from 'express';
import dotenv from 'dotenv';

import viewEngine from './configs/viewEngine.js';
import webRouter from './routers/web.js';

const PORT = process.env.PORT || 8080;
const app = express();
dotenv.config();
//config view engine
viewEngine(app);
//init web router
webRouter(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});