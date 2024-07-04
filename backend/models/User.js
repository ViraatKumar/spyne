import mongoose from "mongoose";
import Post from "../models/Post.js";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
});
const Users = mongoose.model("Users", userSchema);
export default Users;
