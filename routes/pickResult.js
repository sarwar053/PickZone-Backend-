import express from "express";

const router = express.Router();

import { getAllUserPicks } from "../controller/resultController/resultController.js";
import {isAdminAuthenticated} from "../middleware/adminMiddleware/adminMiddleware.js"
router.use(isAdminAuthenticated)

router.get('/getAllUserPicks',getAllUserPicks)

export default router