"use strict";
const { model } = require("mongoose");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.Group, { through: models.Group_Role });
    }
  }
  Role.init(
    {
      url: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
