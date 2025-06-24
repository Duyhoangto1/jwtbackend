const user = require("../models/user");
const {
  createUserService,
  Login,
  getListAllUser,
} = require("../services/user.Service");

const createUser = async (req, res) => {
  const user = await user.findOne({ email });
  if (user) {
    console.log("User already exists");
    return res.status(400).json({
      EC: 1,
      EM: "User already exists",
      data: null,
    });
  }
  const { name, email, password } = req.body;
  const data = await createUserService(name, email, password);
  return res.status(200).json(data);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await Login(email, password);
  return res.status(200).json(data);
};

const getListUser = async (req, res) => {
  try {
    const users = await getListAllUser(); // Properly invoke the function
    return res.status(200).json({
      EC: 0,
      EM: "Success",
      data: users.data, // Access the `data` property from the service response
    });
  } catch (error) {
    console.error("Error in getListUser:", error);
    return res.status(500).json({
      EC: 1,
      EM: "Failed to fetch users",
      data: null,
    });
  }
};
const getAccount = async (req, res) => {
  return res.status(200).json(req.user);
};
module.exports = {
  login,
  createUser,
  getListUser,
  getAccount,
};
