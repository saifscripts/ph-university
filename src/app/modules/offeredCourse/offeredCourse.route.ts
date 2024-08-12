import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseControllers } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router
    .route('/create-offered-course')
    .post(
        validateRequest(
            OfferedCourseValidations.createOfferedCourseValidationSchema,
        ),
        OfferedCourseControllers.createOfferedCourse,
    );

export const OfferedCourseRoutes = router;
