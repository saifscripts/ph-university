import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.route('/create-student').post(UserControllers.createStudent);

export const UserRoutes = router;
