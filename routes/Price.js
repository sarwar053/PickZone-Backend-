import express from 'express';

const router = express.Router();

import { getPicksPrice,updatePickPrice } from '../controller/AdminController/pickPriceController.js';

import { isAuthenticated } from '../middleware/authMiddleware/authMiddleware.js';

router.get('/getPicksPrice',isAuthenticated,getPicksPrice);
router.patch('/updatePickPrice',isAuthenticated,updatePickPrice);

export default router;