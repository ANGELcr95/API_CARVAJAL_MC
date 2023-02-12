import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generatedJWT = async (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Erro: generating token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generatedJWT;
