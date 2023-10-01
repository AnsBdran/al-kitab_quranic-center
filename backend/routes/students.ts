import express from 'express';
import {
  students_basic_get,
  students_full_get,
  students_index_post,
} from '../controllers/students-controller';

const router = express.Router();

router.get('/basic', students_basic_get);
router.get('/full', students_full_get);
router.post('/', students_index_post);

export default router;
