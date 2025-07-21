import moongose from "../database/database";
const { Schema } = moongose

const Like = moongose.model(
  'Like',
  new Schema({
    user_uuid: {
      type: String,
      required: true
    },
    motdId: {
      type: String,
      required: true
    },
  })
)

export default Like;
