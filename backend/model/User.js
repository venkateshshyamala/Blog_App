import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: [true, "Email is already exist"],
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
});

export default mongoose.model("User", userSchema);
