import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

router
    .route('/create-student')
    .post(
        validateRequest(UserValidations.createStudentValidationSchema),
        UserControllers.createStudent,
    );

export const UserRoutes = router;
