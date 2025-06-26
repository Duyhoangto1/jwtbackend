import {
  getAllRoles,
  handleassignRoleToGroup,
  handlecreateRole,
  handledeleteRole,
  handleupdateRole,
} from "../service/roleService";

export const getRoles = async (req, res) => {
  try {
    const data = await getAllRoles();
    console.log(" Role data fetched:", data.EM);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error(" Error in getRoles:", error.message);
    return res.status(500).json({
      EM: `Error fetching roles: ${error.message}`,
      EC: "-1",
      DT: [],
    });
  }
};

export const createRole = async (req, res) => {
  try {
    const { url, description } = req.body;
    const data = await handlecreateRole(url, description);
    console.log(" Role created:", data.EM);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error(" Error in createRole:", error.message);
    return res.status(500).json({
      EM: `Error creating role: ${error.message}`,
      EC: "-1",
      DT: null,
    });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { url, description } = req.body;
    const data = await handleupdateRole(id, url, description);
    console.log(" Role updated:", data.EM);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error(" Error in updateRole:", error.message);
    return res.status(500).json({
      EM: `Error updating role: ${error.message}`,
      EC: "-1",
      DT: null,
    });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await handledeleteRole(id);
    console.log(" Role deleted:", data.EM);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error(" Error in deleteRole:", error.message);
    return res.status(500).json({
      EM: `Error deleting role: ${error.message}`,
      EC: "-1",
      DT: null,
    });
  }
};

export const assignRoleToGroup = async (req, res) => {
  try {
    const { roleId, groupId } = req.body;
    const data = await handleassignRoleToGroup(roleId, groupId);
    console.log(" Role assigned to group:", data.EM);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error(" Error in assignRoleToGroup:", error.message);
    return res.status(500).json({
      EM: `Error assigning role to group: ${error.message}`,
      EC: "-1",
      DT: null,
    });
  }
};
