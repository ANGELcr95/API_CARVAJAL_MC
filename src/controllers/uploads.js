import { response, request } from "express";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/user";

export const updateImageUser = async (req = request, res = response) => {
  const id = req.userAuth_id;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: `User id ${id} does not exist`,
    });
  }

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    if (user.image) {
      const nameImgEnd = user.img.split("/").pop();
      const idPublic = nameImgEnd.split(".").shift();
      cloudinary.uploader.destroy(idPublic);
    }
    const { tempFilePath } = req.files.file;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    const userUpdate = await user.update({ image: secure_url });
    res.json({
      url: secure_url,
      user: userUpdate,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Connection server error with cloudninary",
    });
  }
};
