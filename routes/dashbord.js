import express from 'express';

const Router = express.Router();

import { GetProUsersProfileData } from '../controller/mainPageController/gettingProUserProfileData.js';

import { getSingleProUserGames } from '../controller/mainPageController/gettingProUserProfileData.js';

import { getproUserPicksByGame } from '../controller/mainPageController/gettingProUserProfileData.js';





Router.get('/proUserPfofileData',GetProUsersProfileData)

Router.get('/proUser/:id/games',getSingleProUserGames)

Router.get('/proUser/:id/games/:game',getproUserPicksByGame)

export default Router;