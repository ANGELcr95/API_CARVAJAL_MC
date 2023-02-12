import { response, request } from "express";
import bcryptjs from "bcryptjs";

import generatedJWT from "../helpers/generated-jwt";
import User from "../models/user";

export const userLogin = async (req = request, res = response) => {
  try {
    const { password, email } = req.body;

    const {
      dataValues: user,
      dataValues: { password: passawordFind, id },
    } = await User.findOne({
      where: {
        email,
      },
    });

    const strPassword = password.toString();

    const validPassword = bcryptjs.compareSync(strPassword, passawordFind);
    if (!validPassword) {
      return res.status(400).json({
        message: "Error: Invalid credentials",
      });
    }

    const token = await generatedJWT(id);
    delete user.password;
    res.json({
      message: `Success: id ${id} logged successfully`,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Connection server error",
    });
  }
};
