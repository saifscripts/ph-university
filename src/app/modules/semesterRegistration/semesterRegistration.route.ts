import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router
    .route('/create-semester-registration')
    .post(
        validateRequest(
            SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
        ),
        SemesterRegistrationControllers.createSemesterRegistration,
    );

router
    .route('/')
    .get(SemesterRegistrationControllers.getAllSemesterRegistrations);

router
    .route('/:id')
    .get(SemesterRegistrationControllers.getSingleSemesterRegistration)
    .patch(
        validateRequest(
            SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
        ),
        SemesterRegistrationControllers.updateSemesterRegistration,
    );

export const SemesterRegistrationRoutes = router;
