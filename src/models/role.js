import mongoose from "mongoose";
import connectToDatabaseECC from "../config/db.js"

const dbConnection = connectToDatabaseECC();

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Permissions",
  }],
});

const Role = dbConnection.model("Role", roleSchema);

export default Role;
