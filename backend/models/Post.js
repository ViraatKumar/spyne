import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: { type: String },
  image: { type: String },
  hashtags: [{ type: String }],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
});
const Posts = mongoose.model("Posts", postSchema);
export default Posts;
