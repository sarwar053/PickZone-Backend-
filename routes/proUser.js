
import express from 'express';
import { getUserProfile } from '../controller/proUserController/proProfile.js';
import { isAuthenticated } from '../middleware/authMiddleware/authMiddleware.js';
import { getPicks } from '../controller/proUserController/picksHistory.js';
import { getStatus } from '../controller/proUserController/pickStatus.js';
import submitPicks from '../controller/proUserController/submitPicks.js';

const Router = express.Router();


Router.get('/proUserProfile',isAuthenticated, getUserProfile)

Router.post('/submitPicks',isAuthenticated,submitPicks)

Router.get('/picksHistory',isAuthenticated,getPicks)

Router.get('/picksStatus',isAuthenticated,getStatus)


export default Router;