import { response, request } from "express";
import TypeContact from "../models/type";

export const validateType = async (req = request, res = response, next) => {
  try {
    const { type_id = "" } = req.body;

    const type_contact = await TypeContact.findByPk(type_id);

    if (!type_contact) {
      return res.status(401).json({
        status: "error",
        message: `Type contact could not be found`,
      });
    }

    req.body.type_contact = type_contact?.dataValues.id;

    next();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Connection server error",
    });
  }
};
