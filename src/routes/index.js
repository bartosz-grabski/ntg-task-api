import express from 'express';
import apiRouter from './api/index';

const router = express.Router();

/* GET home page. */
router.use('/api', apiRouter);

export default router;
