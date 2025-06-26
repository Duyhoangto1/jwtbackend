import express from "express";
import apiController from "../controller/apiController.js";
import JWTActions from "../middleware/JWTActions.js";
import groupController from "../controller/groupController.js";
import roleController, {
  createRole,
  deleteRole,
  getRoles,
  updateRole,
} from "../controller/roleController.js";
const router = express.Router();

/**
 *
 * @param {*} app
 */

const initApiRouter = (app) => {
  //router.use(JWTActions.checkUserJWT, JWTActions.checkUserPerMission);
  //router.use(JWTActions.checkUserJWT);
  router.post("/login", apiController.handleLogin);
  router.get("/listUser", apiController.getListAllUser);
  router.get("/getDetailUser/:id", apiController.getDetailUser);
  router.put("/updateUser/:id", apiController.handleUpdateUser);
  router.delete("/deleteUser/:id", apiController.handleDeleteUser);
  router.get("/group", groupController.getGroup);
  router.post("/createUser", apiController.handleCreateUser);

  router.get("/roles", getRoles); // Giả định có hàm getRoles
  router.post("/roles", createRole); // Giả định có hàm createRole
  router.put("/roles/:id", updateRole); // Giả định có hàm updateRole
  router.delete("/roles/:id", deleteRole); // Giả định có hàm deleteRole
  return app.use("/api/v1/", router);
};

export default initApiRouter;
