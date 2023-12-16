import express from "express";
import { PostsModel } from "../models/post.js";
import { UserModel } from "../models/user.js";
import { verifyUser } from "./user_.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const allPosts = await PostsModel.find({});
  return res.json(allPosts);
});

router.post("/newpost", verifyUser, async (req, res) => {
  //   if (!(req.body.length == 1)) return res.json("body empty !!");

  const { imageUrl, content, postOwnerID, postOwnerName, title } = req.body;

  try {
    const newPost = new PostsModel({
      title: title,
      imageUrl: imageUrl,
      content: content,
      postOwnerID: postOwnerID,
      postOwnerName: postOwnerName,
    });
    await newPost.save();
    return res.json({ message: "New post posted" });
  } catch (err) {
    console.log(err);
    return res.json({ message: "ERROR" });
  }
});

router.put("/likepost", verifyUser, async (req, res) => {
  const { userId, postId } = req.body;
  const user = await UserModel.findById(userId);
  try {
    user.likedPosts.push(postId);
    await user.save();
    return res.json({ message: "like success", postId: postId });
  } catch (err) {
    return res.json(err);
  }
});

router.put("/dislikepost", verifyUser, async (req, res) => {
  const { userId, postId } = req.body;
  const user = await UserModel.findById(userId);
  const likedIndex = user.likedPosts.indexOf(postId);
  try {
    if (likedIndex !== -1) {
      user.likedPosts.splice(likedIndex, 1);
    }
    await user.save();
    return res.json({ message: "dislike success", postId: postId });
  } catch (err) {
    return res.json(err);
  }
});

router.post("/likedposts/:userId", verifyUser, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    const likedPosts = await PostsModel.find({
      _id: { $in: user.likedPosts },
    });

    res.json({ likedPosts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as postsRouter };
