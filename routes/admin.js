import express from "express";

import { isAdminAuthenticated } from "../middleware/adminMiddleware/adminMiddleware.js";
import { loginAdmin } from "../controller/AdminController/adminAuth.js";
import {logoutAdmin} from "../controller/AdminController/adminAuth.js";
import { getAdminProfile } from "../controller/AdminController/adminAuth.js";



const router = express.Router();

router.post('/login',loginAdmin)
router.post('/logout',isAdminAuthenticated,logoutAdmin)

router.get('/profile',isAdminAuthenticated,getAdminProfile);






export default router;