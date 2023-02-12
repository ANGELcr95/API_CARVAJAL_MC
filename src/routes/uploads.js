import { Router } from "express";

import { updateImageUser } from "../controllers/uploads";
import { validateFile } from "../middlewares/validated-file";
import validatedInputs from "../middlewares/validated-inputs";
import validatedJWT from "../middlewares/validated-jwt";

const router = Router();

router.put(
  "/users",
  [validatedJWT, validateFile, validatedInputs],
  updateImageUser
);

export default router;
