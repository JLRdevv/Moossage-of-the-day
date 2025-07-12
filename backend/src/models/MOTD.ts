import db from "../database/database";
import { DataTypes } from "sequelize";

const MOTD = db.define('motd', {
    message: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATEONLY,
        unique: true
    }
})

export default MOTD