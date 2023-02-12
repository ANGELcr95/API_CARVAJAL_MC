import { Router } from "express";
import { check } from "express-validator";

import { userLogin } from "../controllers/auth";
import { existEmail } from "../helpers/db-validators";
import validatedInputs from "../middlewares/validated-inputs";

const router = Router();

router.post(
  "/login",
  [
    check("email", "Error: email is required").trim().isEmail().not().isEmpty(),
    check("password", "Error: password required").not().isEmpty(),
    check("email").custom(existEmail),
    validatedInputs,
  ],
  userLogin
);

export default router;
