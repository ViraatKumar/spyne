import express from "express";
import Users from "../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();

//Create User
const CreateUser = async (req, res) => {
  try {
    const { name, mobileNo, email, password } = req.body;
    const userFilter = {
      $or: [{ mobileNo: mobileNo }, { email: email }],
    };
    const user = await Users.findOne(userFilter);
    console.log(user);
    if (user) throw new Error("User Exists");
    const hashedPassword = await bycrypt.hash(password, 10);

    const new_user = new Users({
      name,
      mobileNo,
      email,
      password: hashedPassword,
    });
    await new_user.save();
    res.status(201).json(new_user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
//Update User
const UpdateUser = async (req, res) => {
  try {
    const email = req.query.email;
    const mobileNo = req.query.mobileNo;
    const userFilter = {
      $or: [{ mobileNo: mobileNo }, { email: email }],
    };
    if (!email && !mobileNo)
      throw new Error("No email or mobile number provided");
    const find_user = await Users.findOne(userFilter);
    if (!find_user) throw new Error("User not found");
    // ToDo - make password hashed on update as well
    console.log(req.body);
    const {
      name,
      mobileNo: newMobileNo,
      email: newEmail,
      password: newPassword,
    } = req.body;
    console.log("mobile number = " + newMobileNo);
    const newHashedPassword = await bycrypt.hash(newPassword, 10);
    const update = {
      ...(name && { name }),
      ...(newMobileNo && { mobileNo: newMobileNo }),
      ...(newEmail && { email: newEmail }),
      ...(newPassword && { newHashedPassword }),
    };
    const updatedUser = await Users.findOneAndUpdate(userFilter, update, {
      new: true,
    });
    console.log(updatedUser);
    await updatedUser.save();
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const DeleteUser = async (req, res) => {
  try {
    const { email, mobileNo } = req.query;
    const userFilter = {
      $or: [{ mobileNo: mobileNo }, { email: email }],
    };
    if (!email && !mobileNo)
      throw new Error("No Email or Phone Number provided");
    const deletedUser = await Users.findOneAndDelete(userFilter);
    if (!deletedUser) throw new Error("User not found");
    res.status(201).send(deletedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const GetAllUsers = async (req, res) => {
  try {
    const all_users = await Users.find();
    res.status(200).send(all_users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getUser = async (req, res) => {
  try {
    const name = req.query.name;
    const users = await Users.find({
      name: name,
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export { CreateUser, UpdateUser, DeleteUser, GetAllUsers, getUser };
