import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router
    .route('/create-course')
    .post(
        validateRequest(CourseValidations.createCourseValidationSchema),
        CourseControllers.createCourse,
    );

router.route('/').get(CourseControllers.getAllCourses);

router
    .route('/:id')
    .get(CourseControllers.getSingleCourse)
    .patch(
        validateRequest(CourseValidations.updateCourseValidationSchema),
        CourseControllers.updateCourse,
    )
    .delete(CourseControllers.deleteCourse);

export const CourseRoutes = router;
