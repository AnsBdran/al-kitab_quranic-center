import express from 'express';
import {
  dailyTask_index_get,
  dailyTask_index_post,
  dailyTask_wbw_get,
} from '../controllers/task-controller';

const router = express.Router();

router.post('/', dailyTask_index_post);
router.get('/', dailyTask_index_get);
router.get('/wbw', dailyTask_wbw_get);

export default router;
