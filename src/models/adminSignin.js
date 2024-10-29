import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { EMAIL_REGEX } from "../constants/regex.js"

const adminSigninSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v) => EMAIL_REGEX.test(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    default: "6477a73861ef6e2485430042",
    required: true,
    ref: "Role",
  },
  tokenVersion: {
    type: Number,
    default: 0
  },
},
  {
    timestamps: true,
  });
//Password Hashing

adminSigninSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const AdminSignin = mongoose.model("adminSignin", adminSigninSchema);

export default AdminSignin;
