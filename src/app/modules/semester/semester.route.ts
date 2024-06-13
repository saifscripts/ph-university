import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterControllers } from './semester.controller';
import { SemesterValidations } from './semester.validation';

const router = express.Router();

router
    .route('/create-semester')
    .post(
        validateRequest(SemesterValidations.semesterValidationSchema),
        SemesterControllers.createSemester,
    );

router.route('/').get(SemesterControllers.getAllSemesters);

router
    .route('/:semesterId')
    .get(SemesterControllers.getSingleSemester)
    .patch(
        validateRequest(
            SemesterValidations.semesterValidationSchema.deepPartial(),
        ),
        SemesterControllers.updateSemester,
    );

export const SemesterRoutes = router;
