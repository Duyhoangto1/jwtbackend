import db from "../models/index.js";

export const getAllRoles = async () => {
  try {
    const data = await db.Role.findAll({
      order: [["url", "ASC"]],
      include: [{ model: db.Group, through: { attributes: [] } }],
    });
    return {
      EM: "Get roles success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.error(" Error in getAllRoles:", error);
    return {
      EM: `Database error: ${error.message}`,
      EC: 1,
      DT: [],
    };
  }
};

export const handlecreateRole = async (url, description) => {
  try {
    const role = await db.Role.create({ url, description });
    return {
      EM: "Role created successfully",
      EC: 0,
      DT: role,
    };
  } catch (error) {
    console.error(" Error in createRole:", error);
    return {
      EM: `Database error: ${error.message}`,
      EC: 1,
      DT: null,
    };
  }
};

export const handleupdateRole = async (id, url, description) => {
  try {
    const [updated] = await db.Role.update(
      { url, description },
      { where: { id } }
    );
    if (updated) {
      const updatedRole = await db.Role.findByPk(id, {
        include: [{ model: db.Group, through: { attributes: [] } }],
      });
      return {
        EM: "Role updated successfully",
        EC: 0,
        DT: updatedRole,
      };
    }
    return {
      EM: "Role not found",
      EC: 1,
      DT: null,
    };
  } catch (error) {
    console.error(" Error in updateRole:", error);
    return {
      EM: `Database error: ${error.message}`,
      EC: 1,
      DT: null,
    };
  }
};

export const handledeleteRole = async (id) => {
  try {
    const deleted = await db.Role.destroy({ where: { id } });
    if (deleted) {
      return {
        EM: "Role deleted successfully",
        EC: 0,
        DT: null,
      };
    }
    return {
      EM: "Role not found",
      EC: 1,
      DT: null,
    };
  } catch (error) {
    console.error(" Error in deleteRole:", error);
    return {
      EM: `Database error: ${error.message}`,
      EC: 1,
      DT: null,
    };
  }
};

export const handleassignRoleToGroup = async (roleId, groupId) => {
  try {
    const [role, created] = await db.Group_Role.findOrCreate({
      where: { roleId, groupId },
      defaults: { roleId, groupId },
    });
    if (created || role) {
      return {
        EM: "Role assigned to group successfully",
        EC: 0,
        DT: null,
      };
    }
    return {
      EM: "Role already assigned to group",
      EC: 1,
      DT: null,
    };
  } catch (error) {
    console.error(" Error in assignRoleToGroup:", error);
    return {
      EM: `Database error: ${error.message}`,
      EC: 1,
      DT: null,
    };
  }
};
