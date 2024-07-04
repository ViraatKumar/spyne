import Post from "../models/Post.js";
import Users from "../models/User.js";
const createPost = async (req, res) => {
  const { email, mobileNo } = req.query;
  const { text, hashtags } = req.body;
  const image = req.file;
  try {
    const user = await Users.findOne({
      $or: [{ email }, { mobileNo }],
    });
    const post = new Post({ text, hashtags });
    user.posts.push(post._id);
    await user.save();
    await post.save();
    console.log(user);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.query;
  const { text, hashtags } = req.body;
  try {
    const updatePost = new Post({
      text,
      hashtags,
    });
    const post = Post.findOneAndUpdate(
      {
        _id: id,
      },
      updatePost
    );

    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export { createPost };
