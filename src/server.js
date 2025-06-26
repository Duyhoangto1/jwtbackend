import express from "express";
import dotenv from "dotenv";
import configCors from "./config/cors.js";
import viewEngine from "./config/viewEngine.js";
import webRouter from "./routers/web.js";
import initApiRouter from "./routers/api.js";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
const port = process.env.PORT || 8080;
configCors(app);
// ✅ Config body parser before routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//config cookie parser
app.use(cookieParser());
// Config view engine and routes
viewEngine(app);

// Connect to database
connectDB();

webRouter(app);
initApiRouter(app);

app.use((req, res) => {
  return res.send("404 not found ");
});
app.listen(port, () => {
  console.log(`Backend Nodejs App listening on port ${port}`);
});
