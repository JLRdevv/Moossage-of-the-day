import moongose from "../database/database";
const { Schema } = moongose

const MOTD = moongose.model(
  'Motd',
  new Schema({
    message: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true,
      unique: true
    },
  })
)

export default MOTD;
