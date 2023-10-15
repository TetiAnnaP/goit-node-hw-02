import express from 'express';
import authController from '../../controllers/auth-controller.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { userSignupSchema, userSigninSchema } from '../../models/Users.js';

const userSignUpValidate = validateBody(userSignupSchema);
const userSignInValidate = validateBody(userSigninSchema);

const authRouter = express.Router();

authRouter.post(
  '/signup',
  isEmptyBody,
  userSignUpValidate,
  authController.signup
);

authRouter.post(
  '/signin',
  isEmptyBody,
  userSignInValidate,
  authController.signin
);

export default authRouter;
