import { response } from "express"; // solo para tener el tipado
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";
import generatedJWT from "../helpers/generated-jwt";

export const usersPost = async (req, res = response) => {
  try {
    const { id, state, password, ...data } = req.body;
    const userFind = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (userFind?.email) {
      return res.status(400).json({
        error: `Error: User exist ${userFind?.email}`,
      });
    }

    let passwordUtil = password.toString();
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(passwordUtil, salt);

    let user = await User.create(data);

    const token = await generatedJWT(user.dataValues.id);

    delete user?.dataValues.password;

    res.status(201).json({ 
      message: `Success: user ${data.email} created`,
      user,
      token
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Connection server error",
    });
  }
};

export const usersPut = async (req, res = response) => {
  try {
    const id = req.userAuth_id;
    const { id: idbody, state, password, ...payload } = req.body; // saco el id para que no lo intente actualizar y estalle
    
    if (password) {
      const strPassword = password?.toString();
      const salt = bcryptjs.genSaltSync();
      payload.password = bcryptjs.hashSync(strPassword, salt);
    }

    const userFind = await User.findByPk(id);

    if (!userFind) {
      return res.status(400).json({
        message: `Error: ${id} not found`,
      });
    }

    const user = await userFind.update({
      ...userFind,
      ...payload,
    });

    delete user?.dataValues.password;

    res.json({
      message: `Success: id ${id} updated`,
      user,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      status: "error",
      message: "Connection server error",
    });
  }
};

export const usersDelete = async (req, res = response) => {
  try {
    const id = req.userAuth_id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({
        message: `Error: ${id} not found`,
      });
    }

    await user.update({ state: 0 });

    delete user?.dataValues.password;

    res.json({
      message: `Success: ${id} deleted`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Connection server error",
    });
  }
};
