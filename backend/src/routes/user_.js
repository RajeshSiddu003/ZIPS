import express from "express";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import { UserModel } from "../models/user.js";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (user) {
    return res.json({ message: "User already Registered" });
  }

  const newUser = new UserModel({ username: username, password: password });
  await newUser.save();
  return res.json({ status: "pass", message: "User Saved. Please Login" });
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ message: "User dosent Registered" });
  }

  if (user.password === password) {
    const token = jwt.sign({ id: user._id }, "secret");
    return res.json({
      loggedIn: true,
      token: token,
      message: "User logged in",
      userID: user._id,
      username: user.username,
    });
  }
  return res.json({ message: "Incorrect password" });
});

export const verifyUser = (req, res, next) => {
  // console.log(req.headers.auth);
  const authHeader = req.headers.auth;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.json({
          message: "user verification failed (invalid token)",
        });
      }
      next();
    });
  } else {
    return res.json({
      message: "user verification failed (user dosent logged in)",
    });
  }
};

export { router as userRouter };
