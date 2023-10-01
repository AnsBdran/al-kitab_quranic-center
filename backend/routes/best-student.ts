import express from 'express';
import {
  bestStudent_index_get,
  bestStudent_index_post,
} from '../controllers/best-student-controller';

const router = express.Router();

router.post('/', bestStudent_index_post);
router.get('/', bestStudent_index_get);
export default router;
