import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import db from "../database/database";

class MOTD extends Model<InferAttributes<MOTD>, InferCreationAttributes<MOTD>> {
  declare id: CreationOptional<number>;
  declare message: string;
  declare author: string;
  declare date: string;
}

MOTD.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: "motd",
    tableName: "motds",
  }
);

export default MOTD;
