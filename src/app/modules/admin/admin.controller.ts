import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
    const admins = await AdminServices.getAllAdminsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Admins fetched successfully!',
        data: admins,
    });
});

const getSingleAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const admin = await AdminServices.getSingleAdminFromDB(adminId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Admin fetched successfully!',
        data: admin,
    });
});

const updateAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;

    const updatedAdmin = await AdminServices.updateAdminIntoDB(
        adminId,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Admin updated successfully!',
        data: updatedAdmin,
    });
});

const deleteAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;

    const deletedAdmin = await AdminServices.deleteAdminFromDB(adminId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Admin deleted successfully!',
        data: deletedAdmin,
    });
});

export const AdminControllers = {
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
};
