import db from "../models/index.js";

export const getAllGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "DESC"]], // Xóa khoảng trắng thừa trong "name "
    });
    return {
      EM: "Get groups success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(" Error in getAllGroup:", error);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};
