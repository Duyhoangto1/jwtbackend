"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsToMany(models.User, { through: "Project_User" });
    }
  }
  Project.init(
    {
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      startDate: { type: DataTypes.STRING },
      customerId: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
