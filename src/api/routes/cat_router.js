import express from 'express';
import multer from 'multer';

import {createThumbnail} from '../../middlewares/upload.js';

import {
  getCat,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat_controller.js';

const catRouter = express.Router();
const upload = multer({dest: 'uploads/'});

catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('cat'), createThumbnail, postCat);

catRouter.get('/user/:id', getCatsByUserId);

catRouter
  .route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;