import express from 'express';
import { userController } from '../controllers';
import initPassportLocal from '../services/auth/passport-config';
import logger from '../utils/logger';

const router = express.Router();

logger(initPassportLocal);
initPassportLocal();

router.get('/', (req, res) => res.redirect('/auth/login'));
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/signup', userController.getSignUp);
router.post('/signup', userController.postSignUp);

export default router;
