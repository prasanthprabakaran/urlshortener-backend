import express from 'express';
const router = express.Router();

//Controllers

import { create } from '../controllers/main.js';

router.route('/create').post(create);

export const listRouter = router;