import express from 'express';
import { SignupUser } from '../controller/authController/signup.controller.js';
import { VerifyEmail } from '../controller/authController/email_verification.js';
import { LoginUser } from '../controller/authController/login.controller.js';
import { ForgotPassword } from '../controller/authController/forgotPassword.js';
import { VerifyOtp } from '../controller/authController/verifyOtp.js';
import { ResetPassword } from '../controller/authController/resetPassword.js';
import { logoutController } from '../controller/authController/logout.js';
import { GetMe } from '../controller/authController/getMe.js';


// middleware
import { isAuthenticated } from '../middleware/authMiddleware/authMiddleware.js';


const Router = express.Router();

Router.post('/register', SignupUser);

Router.get('/verify-email',VerifyEmail)

Router.post('/login',LoginUser)

Router.post('/forgot-password',ForgotPassword)

Router.post('/verify-otp',VerifyOtp)

Router.post('/reset-password',ResetPassword)

Router.post('/logout',logoutController)

// protected route
Router.get('/me',isAuthenticated,GetMe)

export default Router;