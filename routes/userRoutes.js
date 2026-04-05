import express from "express";

const Router = express.Router();

import upload from "../middleware/uploadMiddleware/ProfilePicuploadMiddleware.js";
import { isAuthenticated } from "../middleware/authMiddleware/authMiddleware.js";

import {getProfilePick,updateProfilePick,removeProfilePic} from "../controller/userController/profilepicController.js";
import {getUserinfo} from "../controller/userController/userData.js"


// get user info
Router.get("/profile", isAuthenticated, getUserinfo);

// profile pic
Router.get("/profile/pic", isAuthenticated, getProfilePick);

Router.put("/profile/pic", isAuthenticated, upload.single("profilePic"), updateProfilePick);

Router.delete("/profile/pic", isAuthenticated, removeProfilePic);

export default Router;
