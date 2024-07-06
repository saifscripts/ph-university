import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { SemesterControllers } from './semester.controller';
import { SemesterValidations } from './semester.validation';

const router = express.Router();

router
    .route('/create-semester')
    .post(
        auth(USER_ROLE.admin),
        validateRequest(SemesterValidations.semesterValidationSchema),
        SemesterControllers.createSemester,
    );

router
    .route('/')
    .get(auth(USER_ROLE.admin), SemesterControllers.getAllSemesters);

router
    .route('/:semesterId')
    .get(auth(USER_ROLE.admin), SemesterControllers.getSingleSemester)
    .patch(
        auth(USER_ROLE.admin),
        validateRequest(
            SemesterValidations.semesterValidationSchema.deepPartial(),
        ),
        SemesterControllers.updateSemester,
    );

export const SemesterRoutes = router;
