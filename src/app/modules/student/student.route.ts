import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { StudentValidations } from './student.validation';

const router = express.Router();

router.route('/').get(StudentControllers.getAllStudents);

router
    .route('/:studentId')
    .get(StudentControllers.getSingleStudent)
    .patch(
        validateRequest(StudentValidations.updateStudentValidationSchema),
        StudentControllers.updateStudent,
    )
    .delete(StudentControllers.deleteStudent);

export const StudentRoutes = router;
