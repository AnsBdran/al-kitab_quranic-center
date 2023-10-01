import express from 'express';
import { auth_post_login } from '../controllers/auth-controller';

const router = express.Router();

router.post('/login', auth_post_login);

export default router;
