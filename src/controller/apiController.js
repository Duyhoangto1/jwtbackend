require("dotenv").config();

const { registerUser, loginUser } = require("../service/userService");

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

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
