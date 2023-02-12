import { Router } from "express";
import { check } from "express-validator";

import validatedJWT from "../middlewares/validated-jwt";
import validatedInputs from "../middlewares/validated-inputs";
import { validateType } from "../middlewares/validated-type";
import {
  contactDelete,
  contactPost,
  contactPut,
  contactsGet,
} from "../controllers/contact";

const router = Router();

router.get("/", [validatedJWT, validatedInputs], contactsGet);

router.post(
  "/",
  [
    validatedJWT,
    check("name", "Error: name is required type string")
      .trim()
      .not()
      .isEmail()
      .not()
      .isEmpty()
      .isString()
      .isLength({ min: 3 }),
    check("last_name", "Error: last name is required type string")
      .trim()
      .not()
      .isEmail()
      .not()
      .isEmpty()
      .isString()
      .isLength({ min: 3 }),
    check("email", "Error: email is invalid")
      .optional()
      .trim()
      .isEmail()
      .not()
      .isEmpty(),
    check("country", "Error: country type string").optional().trim().isString(),
    check("cell_phone", "Error: cell phone type number min 6 max 20 characters")
      .optional()
      .trim()
      .isInt()
      .isLength({ min: 7, max: 20 }),
    validateType,
    validatedInputs,
  ],
  contactPost
);

router.put(
  "/:id",
  [
    validatedJWT,
    check("id", "Error: id is required").not().isEmpty(),
    check("name", "Error: name is required").optional().not().isEmpty(),
    check("last_name", "Error: last name is required").optional().not().isEmpty(),
    validatedInputs,
  ],
  contactPut
);

router.delete(
  "/:id",
  [
    validatedJWT,
    check("id", "Error: id is required").not().isEmpty(),
    validatedInputs,
  ],
  contactDelete
);

export default router;
