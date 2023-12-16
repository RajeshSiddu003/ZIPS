import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  content: { type: String, required: true },

  postOwnerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postOwnerName: {
    type: String,
    ref: "user",
    required: true,
  },
});

export const PostsModel = mongoose.model("posts", postSchema);
