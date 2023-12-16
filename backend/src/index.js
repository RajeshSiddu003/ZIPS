import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { userRouter } from "./routes/user_.js";
import { postsRouter } from "./routes/post_.js";

const app = express();
app.use(express.json());
app.use(cors());

// mongoose.connect("mongodb://0.0.0.0:27017/db");
mongoose.connect(
  "mongodb+srv://rajeshsiddu003:SeA7ApKchzUAlcga@cluster0.izszcjn.mongodb.net/DB"
);

/// write here ///
app.use("/auth", userRouter);
app.use("/post", postsRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[RUNNING AT PORT ${PORT}]`);
});
