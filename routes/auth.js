import express from 'express';
import { SignupUser } from '../controller/authController/signup.controller.js';
import { VerifyEmail } from '../controller/authController/email_verification.js';
const Router = express.Router();

Router.post('/login', (req, res) => {
    res.send('Hello World Login');
});

Router.post('/register', SignupUser);

Router.get('/verify-email',VerifyEmail)


export default Router;