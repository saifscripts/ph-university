import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

router.post(
    '/create-student',
    auth(USER_ROLE.admin),
    validateRequest(UserValidations.createStudentValidationSchema),
    UserControllers.createStudent,
);

router.post(
    '/create-faculty',
    auth(USER_ROLE.admin),
    validateRequest(UserValidations.createFacultyValidationSchema),
    UserControllers.createFaculty,
);

router.post(
    '/create-admin',
    auth(USER_ROLE.admin),
    validateRequest(UserValidations.createAdminValidationSchema),
    UserControllers.createAdmin,
);

export const UserRoutes = router;
