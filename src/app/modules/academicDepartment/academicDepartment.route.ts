import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidations } from './academicDepartment.validation';

const router = express.Router();

router
    .route('/create-academic-department')
    .post(
        validateRequest(
            AcademicDepartmentValidations.academicDepartmentValidationSchema,
        ),
        AcademicDepartmentControllers.createAcademicDepartment,
    );

router.route('/').get(AcademicDepartmentControllers.getAllAcademicDepartments);

router
    .route('/:departmentId')
    .get(AcademicDepartmentControllers.getSingleAcademicDepartment)
    .patch(
        validateRequest(
            AcademicDepartmentValidations.academicDepartmentValidationSchema.partial(),
        ),
        AcademicDepartmentControllers.updateAcademicDepartment,
    );

export const AcademicDepartmentRoutes = router;
