import express from 'express';

const Router = express.Router();

import { GetProUsersProfileData } from '../controller/mainPageController/gettingProUserProfileData.js';

import { getSingleProUserGames } from '../controller/mainPageController/gettingProUserProfileData.js';

import { getproUserPicksBySport  } from '../controller/mainPageController/gettingProUserProfileData.js';

import { getSinglePick } from '../controller/mainPageController/gettingProUserProfileData.js';

import {getGameLogos} from '../controller/mainPageController/gettingProUserProfileData.js'




Router.get('/proUserPfofileData',GetProUsersProfileData)

Router.get('/proUser/:id/games',getSingleProUserGames)

Router.get('/proUser/:id/sport/:sport',getproUserPicksBySport )

Router.get("/proUser/game-logos", getGameLogos);

Router.get('/proUser/picks/:pickId',getSinglePick)

export default Router;