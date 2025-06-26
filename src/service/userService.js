import bcrypt from "bcrypt";
require("dotenv").config();
import { createJWT } from "../middleware/JWTActions.js";
import db from "../models/index.js";
import { raw } from "body-parser";
import { getGroupWithRole } from "./jwtService.js";
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const checkEmail = async (userEmail) => {
  const user = await db.User.findOne({ where: { email: userEmail } });
  return !!user;
};

export const checkPhone = async (userPhone) => {
  const user = await db.User.findOne({ where: { phone: userPhone } });
  return !!user;
};

export const registerUser = async (rawdata) => {
  const isEmailExist = await checkEmail(rawdata.email);
  if (isEmailExist) {
    return { EC: 1, EM: "User Email already exists", data: null };
  }
  const isPhoneExist = await checkPhone(rawdata.phone);
  if (isPhoneExist) {
    return { EC: 1, EM: "User Phone already exists", data: null };
  }
  const hashed = await hashPassword(rawdata.password);

  try {
    await db.User.create({
      email: rawdata.email,
      phone: rawdata.phone,
      username: rawdata.username,
      password: hashed,
      groupId: 5,
    });
    return { EM: "User registered successfully", EC: 0 };
  } catch (err) {
    console.error("[11:15 PM +07, 25/06/2025] DB error:", err);
    return { EM: "Something went wrong in service...", EC: -2 };
  }
};

export const loginUser = async (rawdata) => {
  try {
    const user = await db.User.findOne({ where: { email: rawdata.email } });
    if (!user) {
      return {
        EM: "Email or password is incorrect",
        EC: 1,
        data: null,
      };
    }
    // So sánh password
    const isMatch = await bcrypt.compare(rawdata.password, user.password);
    if (!isMatch) {
      return {
        EM: "Email or password is incorrect",
        EC: 1,
        data: null,
      };
    }
    let roles = await getGroupWithRole(user);
    let payload = {
      email: user.email,
      roles,
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
    let token = createJWT(payload);
    return {
      EM: "Login successful",
      EC: 0,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        access_token: token,
        data: roles,
      },
    };
  } catch (err) {
    console.error(" Login error:", err);
    return {
      EM: "Something went wrong in service...",
      EC: -2,
      data: null,
    };
  }
};

export const getUserList = async () => {
  try {
    const users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone"],
    });
    return users;
  } catch (err) {
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id, {
      attributes: [
        "id",
        "username",
        "email",
        "phone",
        "address",
        "sex",
        "groupId",
      ],
    });
    return user || null;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (
  id,
  username,
  email,
  phone,
  sex,
  address,
  groupId
) => {
  try {
    const result = await db.User.update(
      { username, email, phone, sex, address, groupId },
      { where: { id } }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await db.User.destroy({ where: { id } });
    return result;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (rawdata) => {
  const isEmailExist = await checkEmail(rawdata.email);
  if (isEmailExist) {
    return { EC: 1, EM: "User Email already exists", data: null };
  }
  const isPhoneExist = await checkPhone(rawdata.phone);
  if (isPhoneExist) {
    return { EC: 1, EM: "User Phone already exists", data: null };
  }
  const hashed = await hashPassword(rawdata.password);

  try {
    await db.User.create({
      email: rawdata.email,
      phone: rawdata.phone,
      username: rawdata.username,
      password: hashed,
      sex: rawdata.sex,
      address: rawdata.address,
      groupId: rawdata.groupId,
    });
    return { EM: "User registered successfully", EC: 0 };
  } catch (err) {
    console.error(" DB error:", err);
    return { EM: "Something went wrong in service...", EC: -2 };
  }
};
