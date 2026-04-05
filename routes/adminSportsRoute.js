import express from "express";

import { isAdminAuthenticated } from "../middleware/adminMiddleware/adminMiddleware.js";
import { getAllSports } from "../controller/AdminController/adminSportsController.js";
import { createSport } from "../controller/AdminController/adminSportsController.js";
import { addGames } from "../controller/AdminController/adminSportsController.js";
import { removeGame } from "../controller/AdminController/adminSportsController.js";
import { deleteSport } from "../controller/AdminController/adminSportsController.js";
import { addTeams } from "../controller/AdminController/adminSportsController.js";
import { removeTeam } from "../controller/AdminController/adminSportsController.js";
import Logoupload from "../middleware/uploadMiddleware/logoUploadmulterMiddleware.js";

const router = express.Router();

// Apply the middleware to all routes in this router

router.get('/sports',getAllSports)

router.post('/sports',isAdminAuthenticated,Logoupload.any(),createSport)

router.delete('/sports/:id',isAdminAuthenticated,deleteSport)

router.post('/sports/:id/games',isAdminAuthenticated,addGames)

router.delete('/sports/:id/games',isAdminAuthenticated,removeGame)

router.post('/sports/:id/teams',isAdminAuthenticated,addTeams)

router.delete('/sports/:id/teams',isAdminAuthenticated,removeTeam)

export default router;