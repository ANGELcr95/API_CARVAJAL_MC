import User from "../models/user";

export const existEmail = async (email = "") => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user || !user?.dataValues.state) {
    throw new Error("Error: Invalid credentials not registered");
  }
};
