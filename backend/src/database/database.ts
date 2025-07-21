import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const mongoURI = process.env.DB_URI!;

async function main() {
  await mongoose.connect(mongoURI);
}

main().catch((err) => {
  console.log(err);
});

export default mongoose;
