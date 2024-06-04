import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
    '/create-student',
    validateRequest(UserValidations.createStudentValidationSchema),
    UserControllers.createStudent,
);

router.post(
    '/create-faculty',
    validateRequest(UserValidations.createFacultyValidationSchema),
    UserControllers.createFaculty,
);

router.post(
    '/create-admin',
    validateRequest(UserValidations.createAdminValidationSchema),
    UserControllers.createAdmin,
);

export const UserRoutes = router;
