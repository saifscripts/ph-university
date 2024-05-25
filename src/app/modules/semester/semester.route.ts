import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterControllers } from './semester.controller';
import { SemesterValidations } from './semester.validation';

const router = express.Router();

router
    .route('/create-semester')
    .post(
        validateRequest(SemesterValidations.createSemesterValidationSchema),
        SemesterControllers.createSemester,
    );

export const SemesterRoutes = router;
