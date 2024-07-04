import express from "express";
import multer from "multer";
import { createPost } from "../controller/postController.js";
const upload = multer({ dest: `uploads/` });
const router = express.Router();

router.post("/post/create/:email?/:mobileNo?", upload.single(), createPost);
export default router;
