import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { FacultyValidations } from './faculty.validation';

const router = express.Router();

router.route('/').get(FacultyControllers.getAllFaculties);

router
    .route('/:facultyId')
    .get(FacultyControllers.getSingleFaculty)
    .patch(
        validateRequest(FacultyValidations.updateFacultyValidationSchema),
        FacultyControllers.updateFaculty,
    )
    .delete(FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
