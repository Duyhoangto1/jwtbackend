import express from "express";
import apiController from "../controller/apiController.js";
import groupController from "../controller/groupController.js";
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
  router.get("/listUser", apiController.getListAllUser);
  router.get("/getDetailUser/:id", apiController.getDetailUser); // Sử dụng path parameter
  router.put("/updateUser/:id", apiController.handleUpdateUser); // Sử dụng path parameter
  router.delete("/deleteUser/:id", apiController.handleDeleteUser);
  router.get("/group", groupController.getGroup);
  router.post("/createUser", apiController.handleCreateUser); // Thêm route mới
  return app.use("/api/v1/", router);
};
export default initApiRouter;
