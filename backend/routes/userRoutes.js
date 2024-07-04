import express from "express";
import {
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetAllUsers,
  getUser,
} from "../controller/userController.js";
const router = express.Router();

router.post("/user/create", CreateUser);
router.put("/user/update/:mobileNo?/:email?", UpdateUser);
router.delete("/user/delete/:email?/:mobileNo?", DeleteUser);
router.get("/users", GetAllUsers);
router.get("/user", getUser);
export default router;
