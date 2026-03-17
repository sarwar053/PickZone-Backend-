import express from "express";

import { isAdminAuthenticated } from "../middleware/adminMiddleware/adminMiddleware.js";
import { getAllSports } from "../controller/AdminController/adminSportsController.js";
import { createSport } from "../controller/AdminController/adminSportsController.js";
import { addGames } from "../controller/AdminController/adminSportsController.js";
import { removeGame } from "../controller/AdminController/adminSportsController.js";
import { deleteSport } from "../controller/AdminController/adminSportsController.js";

const router = express.Router();

// Apply the middleware to all routes in this router

router.get('/sports',getAllSports)
router.post('/sports',isAdminAuthenticated,createSport)

router.delete('/sports/:id',isAdminAuthenticated,deleteSport)

router.post('/sports/:id/games',isAdminAuthenticated,addGames)

router.delete('/sports/:id/games',isAdminAuthenticated,removeGame)

export default router;