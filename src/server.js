import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; // Optional if using express's built-in
import viewEngine from './config/viewEngine.js';
import webRouter from './routers/web.js';
import connectDB
 from './config/connectDB.js';
const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

// ✅ Config body parser before routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Config view engine and routes
viewEngine(app);

// Connect to database
connectDB();
webRouter(app);

app.listen(port, () => {
    console.log(`Backend Nodejs App listening on port ${port}`);
});
