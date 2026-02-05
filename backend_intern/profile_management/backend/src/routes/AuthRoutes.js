import express from 'express';
import * as AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/google', AuthController.googleLogin);

export default router;
