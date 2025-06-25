import express from "express";
import apiController from "../controller/apiController.js";
const router = express.Router();

/**
 *
 * @param {*} app
 */
const initApiRouter = (app) => {
  // Define the home route

  //rest api
  //get post  put delete
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  // Use the router in the app
  router.post("/login", apiController.handleLogin);
  return app.use("/api/v1/", router);
};
export default initApiRouter;
