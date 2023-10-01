import express from 'express';
import {
  attendance_formatted_get,
  attendance_index_get,
  attendance_index_post,
  attendance_oldDays_get,
  // attendance_singleDate_post,
} from '../controllers/attendance-controller';

const router = express.Router();

router.get('/', attendance_index_get);
router.post('/', attendance_index_post);
router.get('/formatted', attendance_formatted_get);
// router.post('/single-date', attendance_singleDate_post);
router.get('/old-days', attendance_oldDays_get);

export default router;
