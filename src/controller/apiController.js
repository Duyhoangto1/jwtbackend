require("dotenv").config();

const {
  registerUser,
  loginUser,
  getUserList,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require("../service/userService");

const testApi = (req, res) => {
  return res.status(200).json({
    message: "oke",
    data: "test api",
  });
};

const handleRegister = async (req, res) => {
  try {
    const { email, phone, username, password } = req.body;
    if (!email || !username || !phone || !password) {
      return res.status(400).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }
    if (password && password.length < 4) {
      return res.status(400).json({
        EM: "Your password must have more than 3 letters",
        EC: "1",
        DT: "",
      });
    }
    const data = await registerUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    console.error(" Server error:", e);
    return res.status(500).json({
      EC: "-1",
      EM: "Error from server",
      data: null,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }
    if (password && password.length < 4) {
      return res.status(400).json({
        EM: "Your password must have more than 3 letters",
        EC: "1",
        DT: "",
      });
    }
    const data = await loginUser({ email, password }); // Đúng cú pháp
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.data.access_token, { httpOnly: true });
    }

    if (!data || data.EC !== 0) {
      return res.status(401).json({
        EC: 1,
        EM: data?.EM || "Invalid email or password",
        data: null,
      });
    }
    return res.status(200).json(data);
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({
      EC: 1,
      EM: "Internal server error",
      data: null,
    });
  }
};
const getListAllUser = async (req, res) => {
  try {
    const users = await getUserList();
    return res.status(200).json({
      EM: "Get user list successfully",
      EC: "0",
      DT: users, // Trả về danh sách người dùng
    });
  } catch (err) {
    console.error("Error fetching user list:", err);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: [],
    });
  }
};
const getDetailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    console.log("user", user);
    if (!user) {
      return res.status(404).json({
        EM: "User not found",
        EC: "1",
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Get user detail successfully",
      EC: "0",
      DT: user,
    });
  } catch (err) {
    console.error("Error fetching user detail:", err);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: null,
    });
  }
};
const handleUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(" Updating user with id:", id);
    if (!id) {
      return res.status(400).json({
        EM: "Missing user ID",
        EC: "1",
        DT: null,
      });
    }
    const { username, email, phone, sex, address, groupId } = req.body;
    console.log(" Request body:", req.body);

    if (!username || !email || !phone) {
      return res.status(400).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: null,
      });
    }

    const result = await updateUser(
      id,
      username,
      email,
      phone,
      address,
      sex,
      groupId
    );
    if (result[0] === 0) {
      return res.status(404).json({
        EM: "User not found or no changes made",
        EC: "1",
        DT: null,
      });
    }

    return res.status(200).json({
      EM: "User updated successfully",
      EC: "0",
      DT: { id, username, email, phone, sex, address, groupId },
    });
  } catch (err) {
    console.error(" Error updating user:", err);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: null,
    });
  }
};
const handleDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    console.log("check delete be", result);
    if (result === 0) {
      return res.status(404).json({
        EM: "User not found",
        EC: "1",
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "User deleted successfully",
      EC: "0",
      DT: null,
    });
  } catch (err) {
    console.error(" Error deleting user:", err);
    return res.status(500).json({
      EM: "Error from server",
      EC: "-1",
      DT: null,
    });
  }
};
const handleCreateUser = async (req, res) => {
  try {
    const { email, phone, username, password, sex, address, groupId } =
      req.body;
    if (
      !email ||
      !username ||
      !phone ||
      !password ||
      !sex ||
      !address ||
      !groupId
    ) {
      return res.status(400).json({
        EM: "Missing required parameters",
        EC: "1",
        DT: "",
      });
    }
    if (password.length < 4) {
      return res.status(400).json({
        EM: "Your password must have more than 3 letters",
        EC: "1",
        DT: "",
      });
    }
    const data = await createUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: { email, username, phone, sex, address, groupId },
    });
  } catch (e) {
    console.error(" Server error:", e);
    return res.status(500).json({
      EC: "-1",
      EM: "Error from server",
      data: null,
    });
  }
};

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
  getListAllUser,
  getDetailUser,
  handleUpdateUser,
  handleCreateUser,
  handleDeleteUser,
};
