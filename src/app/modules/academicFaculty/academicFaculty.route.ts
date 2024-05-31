import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

router
    .route('/create-academic-faculty')
    .post(
        validateRequest(
            AcademicFacultyValidations.academicFacultyValidationSchema,
        ),
        AcademicFacultyControllers.createAcademicFaculty,
    );

router.route('/').get(AcademicFacultyControllers.getAllAcademicFaculties);

router
    .route('/:facultyId')
    .get(AcademicFacultyControllers.getSingleAcademicFaculty)
    .patch(
        validateRequest(
            AcademicFacultyValidations.academicFacultyValidationSchema,
        ),
        AcademicFacultyControllers.updateAcademicFaculty,
    );

export const AcademicFacultyRoutes = router;
