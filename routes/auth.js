import express from 'express';
import { SignupUser } from '../controller/authController/signup.controller.js';

const Router = express.Router();

Router.post('/login', (req, res) => {
    res.send('Hello World Login');
});

Router.post('/register', SignupUser);



export default Router;