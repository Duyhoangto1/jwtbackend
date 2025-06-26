import db from "../models/index";

const getGroupWithRole = async (user) => {
  let roles = await db.Group.findOne({
    where: { id: user.groupId },
    attribute: ["id", "name", "description"],
    include: [
      {
        model: db.Role,
        attribute: ["id", "url", "description"],
        through: { attribute: [] },
      },
    ],
  });
  console.log("check role");
  console.log(roles);
  return roles ? roles : {};
};

module.exports = {
  getGroupWithRole,
};
