import { Router } from "express";
import { check } from "express-validator";

import { usersPut, usersPost, usersDelete } from "../controllers/user";
import { existEmail } from "../helpers/db-validators";
import validatedInputs from "../middlewares/validated-inputs";
import validatedJWT from "../middlewares/validated-jwt";

const router = Router();

// create user
/**
 * @swagger
 * components:
 *    schemas:
 *      user:
 *        type: object
 *        properties:
 *          name: 
 *            type: string
 *          last_name: 
 *            type: string
 *          email: 
 *            type: string
 *          country: 
 *            type: string
 *          cell_phone: 
 *            type: int
 *          address:  
 *            type: string
 *          password:  
 *            type: string
 *          state:  
 *            type: boolean
 *          image: 
 *            type: string
 *        required:
 *          - name
 *          - last_name
 *          - email
 *          - password
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: create a new user
 *    tags: [user]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/user'
 */

router.post(
  "/",
  [
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
    check("email", "Error: email is required").trim().isEmail().not().isEmpty(),
    check("password", "Error: password requires min 6 characters").isLength({
      min: 6,
    }),
    check("country", "Error: country type string").optional().trim().isString(),
    check("cell_phone", "Error: cell phone type number min 6 max 20 characters")
      .optional()
      .trim()
      .isInt()
      .isLength({ min: 7, max: 20 }),
    check("image", "Error: image type string").optional().trim().isString(),
    check("state", "Error: state value true").optional().trim().isBoolean(true),
    validatedInputs,
  ],
  usersPost
);

router.put(
  "/",
  [
    validatedJWT,
    check("name", "Error: name is required type string")
      .optional()
      .trim()
      .not()
      .isEmail()
      .not()
      .isEmpty()
      .isString()
      .isLength({ min: 3 }),
    check("last_name", "Error: last name is required type string")
      .optional()
      .trim()
      .not()
      .isEmail()
      .not()
      .isEmpty()
      .isString()
      .isLength({ min: 3 }),
    check("password", "Error: password required min 6 characters")
      .optional()
      .isLength({ min: 6 }),
    check("country", "Error: country type string").optional().trim().isString(),
    check("cell_phone", "Error: cell phone type number min 6 max 20 characters")
      .optional()
      .trim()
      .isInt()
      .isLength({ min: 7, max: 20 }),
    check("image", "Error: image type string").optional().trim().isString(),
    check("email").optional().custom(existEmail),
    validatedInputs,
  ],
  usersPut
);

router.delete("/", [validatedJWT, validatedInputs], usersDelete);

export default router;
