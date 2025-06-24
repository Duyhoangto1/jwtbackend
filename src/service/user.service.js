import pool from "../config/database.js";
import bcrypt from "bcrypt";
import db from "../models/index.js";
import { where } from "sequelize";
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// export const registerUser = async (username, email, password) => {
//     try {
//         const hashed = await hashPassword(password);
//         const [result] = await pool.query(
//             'INSERT INTO user (email, password, username) VALUES (?, ?, ?)',
//             [email, hashed, username]
//         );
//         return result;
//     } catch (err) {
//         throw err;
//     }
// };
export const registerUser = async (username, email, password) => {
  const hashed = await hashPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashed,
    });
    return { message: "User registered successfully" };
  } catch (err) {
    throw err;
  }
};

// export const getUserList = async () => {
//     try {
//         const [rows] = await pool.query(
//             'SELECT id, username, email FROM user'
//         );
//         return rows;
//     } catch (err) {
//         throw err;
//     }
// };
export const getUserList = async () => {
  // test relationship
  //   let newuser = await db.User.findOne({
  //     where: {
  //       id: 1,
  //       raw: true,
  //     },
  //   });
  //   console.log("check new user ", newuser);
  try {
    let newuser = await db.User.findOne({
      where: { id: 1 },
      attributes: ["id", "username", "email"], // chỉ lấy trường có thật
      include: {
        model: db.Group,
        attributes: ["id", "name", "description"], // chỉ lấy trường có thật
      },
      raw: true,
      nest: true,
    });

    let role = await db.Role.findAll({
      include: {
        model: db.Group,
        where: { id: 1 },
      },
      raw: true,
      nest: true,
    });
    console.log("check new user ", newuser);
    console.log("check new role ", role);
    const users = await db.User.findAll({
      attributes: ["id", "username", "email"],
    });
    return users;
  } catch (err) {
    throw err;
  }
};

// export const getUserById = async (id) => {
//     try {
//         const [rows] = await pool.query(
//             'SELECT id, username, email FROM user WHERE id = ?',
//             [id]
//         );
//         return rows[0] || null;
//     } catch (err) {
//         throw err;
//     }
// };
export const getUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id, {
      attributes: ["id", "username", "email"],
    });
    return user || null;
  } catch (err) {
    throw err;
  }
};
// export const updateUser = async (id, username, email) => {
//     try {
//         const [result] = await pool.query(
//             'UPDATE user SET username = ?, email = ? WHERE id = ?',
//             [username, email, id]
//         );
//         return result;
//     } catch (err) {
//         throw err;
//     }
// };

// export const deleteUser = async (id) => {
//     try {
//         const [result] = await pool.query(
//             'DELETE FROM user WHERE id = ?',
//             [id]
//         );
//         return result;
//     } catch (err) {
//         throw err;
//     }
// };

export const updateUser = async (id, username, email) => {
  try {
    const result = await db.User.update({ username, email }, { where: { id } });
    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    const result = await db.User.destroy({
      where: { id },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
