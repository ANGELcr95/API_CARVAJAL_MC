import { response, request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";

const validatedJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization-token");

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "No token provided",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await User.findByPk(uid);
    if (!user || !user?.dataValues.state) {
      return res.status(401).json({
        status: "error",
        message: "Invalid token or user desactivated ",
      });
    }

    req.userAuth_id = user?.dataValues.id;

    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Connection server error",
    });
  }
};

export default validatedJWT;
