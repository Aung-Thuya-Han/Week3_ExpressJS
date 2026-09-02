import express from 'express';
import catRouter from './routes/cat_router.js';
import userRouter from './routes/user_router.js';

const api = express.Router();

api.use('/cats', catRouter);
api.use('/users', userRouter);

export default api;