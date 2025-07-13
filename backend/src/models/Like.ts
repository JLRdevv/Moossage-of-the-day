import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import db from "../database/database";
import MOTD from "./MOTD";

class Like extends Model<InferAttributes<Like>, InferCreationAttributes<Like>> {
  declare id: CreationOptional<number>;
  declare user_uuid: string;
  declare motdId: number;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motdId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  
  {
    sequelize: db,
    modelName: "like",
    tableName: "likes",
  }
);

Like.belongsTo(MOTD, { foreignKey: "motdId" });
MOTD.hasMany(Like, { foreignKey: "motdId" });

export default Like;
