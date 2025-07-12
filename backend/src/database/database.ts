import { Sequelize } from "sequelize";

const db = new Sequelize("motd", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

db.authenticate()

export default db
