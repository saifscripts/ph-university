import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = express.Router();

router.route('/').get(AdminControllers.getAllAdmins);

router
    .route('/:adminId')
    .get(AdminControllers.getSingleAdmin)
    .patch(
        validateRequest(AdminValidations.updateAdminValidationSchema),
        AdminControllers.updateAdmin,
    )
    .delete(AdminControllers.deleteAdmin);

export const AdminRoutes = router;
