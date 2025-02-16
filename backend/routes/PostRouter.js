const express = require("express");
const upload = require("../helpers/ImageUpload");




const { createPost, getAllPosts, getSinglePost,postEdite,postDelete ,getAllPostsByUser} = require("../controllers/PostController");

const postRouter = express.Router();
const AuthCheck = require("../middlewares/AuthCheck");

postRouter.post("/create", [AuthCheck, upload.single("image")] , createPost);
postRouter.get("/all", getAllPosts);
postRouter.get("/get/:id", getSinglePost)
postRouter.get("/put/:user", AuthCheck, postEdite)
postRouter.delete("/delete/:id", AuthCheck, postDelete);
postRouter.get("/all/user", AuthCheck, getAllPostsByUser);

module.exports = postRouter