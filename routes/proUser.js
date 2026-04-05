
import express from 'express';
import { getUserProfile } from '../controller/proUserController/proProfile.js';
import { isAuthenticated } from '../middleware/authMiddleware/authMiddleware.js';
import { getPicks } from '../controller/proUserController/picksHistory.js';
import { getStatus } from '../controller/proUserController/pickStatus.js';
import submitPicks from '../controller/proUserController/submitPicks.js';
import { deletePick } from '../controller/proUserController/deletePicks.js';
import Ticketupload from '../middleware/uploadMiddleware/ticketUploadMiddleware.js';

const Router = express.Router();


Router.get('/proUserProfile',isAuthenticated, getUserProfile)

Router.post('/submitPicks',isAuthenticated,Ticketupload.single("ticket"), submitPicks)

Router.get('/picksHistory',isAuthenticated,getPicks)

Router.get('/picksStatus',isAuthenticated,getStatus)

Router.delete('/deletePick/:id',isAuthenticated,deletePick)


export default Router;