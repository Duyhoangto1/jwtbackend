const { getAllGroup } = require("../service/groupService");

const getGroup = async (req, res) => {
  try {
    let data = await getAllGroup();
    console.log(" Group data:", data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Error in getGroup:", error);
    return res.status(500).json({
      EM: "error from service",
      EC: "-1",
      DT: [],
    });
  }
};

module.exports = {
  getGroup,
};
