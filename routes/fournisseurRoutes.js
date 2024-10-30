import express from 'express';
import { body } from 'express-validator';

import multer from '../middlewares/multer-config.js';

import {
  getAll,
  addOnce,
  getOnce,
  putOnce,
} from '../controllers/fournisseurController.js';

const router = express.Router();

router.route('/').get(getAll).post(
  body('role').isLength({ min: 5 }),
  body('workHours').isLength({ min: 4 }),
  multer,
  addOnce
);

router.route('/:id').get(getOnce).put(
  body('role').isLength({ min: 5 }),
  body('workHours').isLength({ min: 4 }),
  multer,
  putOnce
);

export default router;
